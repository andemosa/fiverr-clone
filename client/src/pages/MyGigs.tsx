import { Link } from "react-router-dom";

const MyGigs = () => {
  return (
    <section className="myGigs">
      <div className="myGigs__container">
        <div className="myGigs__title">
          <h1>Gigs</h1>
          <Link to="/add">
            <button>Add New Gig</button>
          </Link>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
          </tr>
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i}>
              <td>
                <img className="myGigs__image" src={"/img/noavatar.webp"} alt="" />
              </td>
              <td>title</td>
              <td>price</td>
              <td>sales</td>
              <td>
                <img className="myGigs__delete" src="./img/delete.webp" alt="" />
              </td>
            </tr>
          ))}
        </table>
      </div>
    </section>
  );
};

export default MyGigs;
