import { useNavigate } from "react-router-dom";

import DataFetcher from "@components/DataFetcher";

import { axiosInstance } from "@services/index";
import { IOrder } from "@customTypes/order";

const OrdersPage = () => {
  return (
    <DataFetcher<IOrder[]>
      url={`/orders`}
      buildUI={(data) => <OrdersDisplay data={data} />}
    />
  );
};

const OrdersDisplay = ({ data }: { data: IOrder[] }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")!)?.user;

  const navigate = useNavigate();

  const handleContact = async (buyer: string, seller: string) => {
    const id = `${seller}-${buyer}`;

    try {
      const res = await axiosInstance.get(`/conversations/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err: any) {
      if (err.response.status === 404) {
        const res = await axiosInstance.post(`/conversations`, {
          to: currentUser.isSeller ? buyer : seller,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className="orders">
      <div className="orders__container">
        <div className="orders__title">
          <h1>Orders</h1>
        </div>
        {data.length === 0 ? (
          <>There is currently no orders</>
        ) : (
          <table>
            <thead>
              <tr>
                <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ _id, image, title, price, buyer, seller }, i) => (
                <tr key={_id}>
                  <td>
                    {currentUser.isSeller ? buyer.username : seller.username}
                  </td>
                  <td>
                    <img className="orders__image" src={image} alt="" />
                  </td>
                  <td>{title}</td>
                  <td>{price}</td>
                  <td>
                    <img
                      className="orders__message"
                      src="./img/message.webp"
                      alt=""
                      onClick={() => handleContact(buyer._id, seller._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
