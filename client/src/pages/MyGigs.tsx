import { useState } from "react";
import { Link } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import DataFetcher from "@components/DataFetcher";

import { IGig } from "@customTypes/gig";

import { axiosInstance } from "@services/index";

const MyGigsPage = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")!)?.user;

  return (
    <DataFetcher<IGig[]>
      url={`/gigs?user=${currentUser._id}`}
      buildUI={(data) => <MyGigsDisplay data={data} />}
    />
  );
};

const MyGigsDisplay = ({ data }: { data: IGig[] }) => {
  const [formData, setFormData] = useState({
    error: "",
  });

  const { error } = formData;

  const currentUser = JSON.parse(localStorage.getItem("currentUser")!)?.user;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => axiosInstance.delete(`/gigs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries([`/gigs?user=${currentUser.id}`]);
    },
    onError: (err: any) =>
      setFormData((prev) => ({
        ...prev,
        error: err?.response?.data?.errorMessage,
      })),
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <section className="myGigs">
      <div className="myGigs__container">
        <div className="myGigs__title">
          <h1>Gigs</h1>
          {currentUser.isSeller && (
            <Link to="/add">
              <button>Add New Gig</button>
            </Link>
          )}
        </div>
        {mutation.isError && <pre>{error}</pre>}

        {data.length === 0 ? (
          <>You currently have no gigs</>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Sales</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ _id, coverImage, title, price, sales }) => (
                <tr key={_id}>
                  <td>
                    <img
                      className="myGigs__image"
                      src={coverImage}
                      alt={title}
                    />
                  </td>
                  <td>
                    <Link to={`/gig/${_id}`}>{title}</Link>
                  </td>
                  <td>{price}</td>
                  <td>{sales}</td>
                  <td>
                    <img
                      className="myGigs__delete"
                      src="./img/delete.webp"
                      alt=""
                      onClick={() => handleDelete(_id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default MyGigsPage;
