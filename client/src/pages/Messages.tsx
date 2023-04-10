import { useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import relativeTime from "dayjs/plugin/relativeTime";

import DataFetcher from "@components/DataFetcher";

import { IConversation } from "@customTypes/message";
import { axiosInstance } from "@services/index";

dayjs.extend(relativeTime);

const MessagesPage = () => {
  return (
    <DataFetcher<IConversation[]>
      url={`/conversations`}
      buildUI={(data) => <MessagesDisplay data={data} />}
    />
  );
};

const MessagesDisplay = ({ data }: { data: IConversation[] }) => {
  const [formData, setFormData] = useState({
    error: "",
  });

  const { error } = formData;

  const currentUser = JSON.parse(localStorage.getItem("currentUser")!)?.user;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => axiosInstance.patch(`/conversations/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries([`/conversations`]);
    },
    onError: (err: any) =>
      setFormData((prev) => ({
        ...prev,
        error: err?.response?.data?.errorMessage,
      })),
  });

  const handleRead = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <section className="messages">
      <div className="messages__container">
        <div className="messages__title">
          <h1>Messages</h1>
        </div>
        {mutation.isError && <pre>{error}</pre>}

        {data.length === 0 ? (
          <>There is currently no messages</>
        ) : (
          <table>
            <thead>
              <tr>
                <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(
                ({
                  _id,
                  readByBuyer,
                  readBySeller,
                  buyer,
                  seller,
                  id,
                  lastMessage,
                  updatedAt,
                }) => (
                  <tr
                    className={
                      (currentUser.isSeller && !readBySeller) ||
                      (!currentUser.isSeller && !readByBuyer)
                        ? `messages__active`
                        : ""
                    }
                    key={_id}
                  >
                    <td>
                      {currentUser.isSeller ? buyer.username : seller.username}
                    </td>
                    <td
                      onClick={
                        (currentUser.isSeller && !readBySeller) ||
                        (!currentUser.isSeller && !readByBuyer)
                          ? () => handleRead(id)
                          : undefined
                      }
                    >
                      <Link to={`/message/${id}`}>
                        {lastMessage?.length > 100 ? (
                          <>{lastMessage?.substring(0, 100)}...</>
                        ) : (
                          lastMessage
                        )}
                      </Link>
                    </td>
                    <td>{dayjs(updatedAt).fromNow()}</td>
                    <td>
                      {(currentUser.isSeller && !readBySeller) ||
                      (!currentUser.isSeller && !readByBuyer) ? (
                        <button onClick={() => handleRead(id)}>
                          Mark as Read
                        </button>
                      ) : (
                        <button>
                          <Link to={`/message/${id}`}>Send Message</Link>
                        </button>
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default MessagesPage;
