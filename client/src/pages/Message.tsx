import { Link, useParams } from "react-router-dom";
import { FormEvent, ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import DataFetcher from "@components/DataFetcher";
import Button from "@components/Button";

import { axiosInstance } from "@services/index";

import { IMessageResponse } from "@customTypes/message";

interface IPageProps extends IMessageResponse {
  id: string;
}

interface IPostMessage {
  conversation: string;
  content: string;
}

const MessagePage = () => {
  const { id } = useParams();

  if (!id) return null;

  return (
    <DataFetcher<IMessageResponse>
      url={`/messages/${id}`}
      buildUI={(data) => <MessageDisplay {...data} id={id} />}
    />
  );
};

const MessageDisplay = ({ id, buyer, seller, messages }: IPageProps) => {
  const [formData, setFormData] = useState({
    content: "",
    error: "",
  });

  const currentUser = JSON.parse(localStorage.getItem("currentUser")!)?.user;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (message: IPostMessage) =>
      axiosInstance.post("/messages", message),
    onSuccess: () => {
      queryClient.invalidateQueries([`/messages/${id}`]);
      setFormData({
        content: "",
        error: "",
      });
    },
    onError: (err: any) =>
      setFormData((prev) => ({
        ...prev,
        error: err?.response?.data?.errorMessage,
      })),
  });

  const { content, error } = formData;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({ conversation: id, content });
  };

  return (
    <section className="message">
      <div className="message__container">
        <span className="message__breadcrumbs">
          <Link to="/messages">Messages</Link> &gt;&nbsp;
          {currentUser.isSeller ? buyer.username : seller.username} &gt;
        </span>
        <div className="message__messages">
          {messages.map(({ _id, content, user }, i) => (
            <div
              className={user._id === currentUser._id ? "owner item" : "item"}
              key={_id}
            >
              <img src={user.avatar} alt={user.username} />
              <p>{content}</p>
            </div>
          ))}
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="write a message"
            name="content"
            value={content}
            onChange={handleChange}
          />
          <Button isLoading={mutation.isLoading} disabled={mutation.isLoading}>
            Send
          </Button>
          {mutation.isError && <pre>{error}</pre>}
        </form>
      </div>
    </section>
  );
};

export default MessagePage;
