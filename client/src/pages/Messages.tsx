import { Link } from "react-router-dom";

const Messages = () => {
  return (
    <section className="messages">
      <div className="messages__container">
        <div className="messages__title">
          <h1>Messages</h1>
        </div>
        <table>
          <tr>
            <th>Buyer</th>
            <th>Last Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          {Array.from({ length: 5 }).map((_, i) => (
            <tr className="messages__active" key={i}>
              <td>id</td>
              <td>
                <Link to={`/message/3`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci doloremque modi amet exercitationem explicabo, ipsa temporibus incidunt similique voluptate possimus tempora harum corporis nemo facilis aut. Nobis itaque temporibus deleniti?</Link>
              </td>
              <td>time</td>
              <td>
                <button>Mark as Read</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </section>
  );
};

export default Messages;
