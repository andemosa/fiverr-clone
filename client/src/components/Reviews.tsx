import { FormEvent, ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import DataFetcher from "./DataFetcher";
import Review from "./Review";
import Button from "./Button";

import { axiosInstance } from "@services/index";

import { IReview } from "@customTypes/review";

interface IPageProps {
  gigId: string;
}

interface IDisplayProps extends IPageProps {
  data: IReview[];
}

interface IPostReview {
  gig: string;
  description: string;
  star: number;
}

const ReviewsComponent = ({ gigId }: IPageProps) => {
  return (
    <DataFetcher<IReview[]>
      url={`/reviews/${gigId}`}
      buildUI={(data) => <ReviewsDisplay data={data} gigId={gigId} />}
    />
  );
};

const ReviewsDisplay = ({ data, gigId }: IDisplayProps) => {
  const [formData, setFormData] = useState({
    star: "",
    description: "",
    error: "",
  });

  const queryClient = useQueryClient();

  const currentUser = JSON.parse(localStorage.getItem("currentUser")!)?.user;

  const mutation = useMutation({
    mutationFn: (review: IPostReview) => axiosInstance.post("/reviews", review),
    onSuccess: () => {
      queryClient.invalidateQueries([`/reviews/${gigId}`]);
      setFormData({
        star: "",
        description: "",
        error: "",
      });
    },
    onError: (err: any) =>
      setFormData((prev) => ({
        ...prev,
        error: err?.response?.data?.errorMessage,
      })),
  });

  const { star, description, error } = formData;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({ gig: gigId, description, star: +star });
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {data.length === 0
        ? null
        : data.map((review, i) => <Review key={i} {...review} />)}

      {currentUser && (
        <div className="reviews__add">
          <h3>Add a review</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="write your opinion"
              name="description"
              value={description}
              onChange={handleChange}
            />
            <select onChange={handleChange} value={star} name="star">
              {Array.from({ length: 5 }).map((_, i) => (
                <option value={i + 1} key={i}>
                  {i + 1}
                </option>
              ))}
            </select>
            <Button
              isLoading={mutation.isLoading}
              disabled={mutation.isLoading}
            >
              Send
            </Button>
            {mutation.isError && <pre>{error}</pre>}
          </form>
        </div>
      )}
    </div>
  );
};

export default ReviewsComponent;
