const Orders = () => {
  return (
    <div className="orders">
      <div className="orders__container">
        <div className="orders__title">
          <h1>Orders</h1>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Contact</th>
          </tr>
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i}>
              <td>
                <img
                  className="orders__image"
                  src={"/img/noavatar.webp"}
                  alt=""
                />
              </td>
              <td>title</td>
              <td>price</td>
              <td>
                <img
                  className="orders__message"
                  src="./img/message.webp"
                  alt=""
                />
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Orders;
