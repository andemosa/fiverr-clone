import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className="notfound">
      <h3>Page not found</h3>
      <Link to="/">Go to home page</Link>
    </section>
  );
};

export default PageNotFound;
