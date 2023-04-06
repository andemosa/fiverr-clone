import DataFetcher from "@components/DataFetcher";

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
                    <img className="orders__image" src={image} alt="" />
                  </td>
                  <td>{title}</td>
                  <td>{price}</td>
                  <td>
                    <img
                      className="orders__message"
                      src="./img/message.webp"
                      alt=""
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
