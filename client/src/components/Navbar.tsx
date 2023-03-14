import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const currentUser = {
  username: "andemosa",
  isSeller: true,
  img: null,
};

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  return (
    <nav className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="navbar__container">
        <div className="navbar__logo">
          <Link to="/">
            <span>fiverr</span>
          </Link>
          <span className="navbar__logo__dot">.</span>
        </div>
        <ul className="navbar__links">
          <li>Fiverr Business</li>
          <li>Explore</li>
          <li>English</li>
          {!currentUser?.isSeller && <li>Become a Seller</li>}
          {currentUser ? (
            <div className="navbar__user" onClick={() => setOpen(!open)}>
              <img src={currentUser?.img || "/img/noavatar.webp"} alt="" />
              <li>{currentUser?.username}</li>
              {open && (
                <ul className="navbar__user__options">
                  {currentUser.isSeller && (
                    <>
                      <li>
                        <Link to="/mygigs">Gigs</Link>
                      </li>
                      <li>
                        <Link to="/add">Add New Gig</Link>
                      </li>
                    </>
                  )}

                  <li>
                    <Link to="/orders">Orders</Link>
                  </li>
                  <li>
                    <Link to="/messages">Messages</Link>
                  </li>
                  <li>Logout</li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <li>
                <Link to="/login">Sign in</Link>
              </li>
              <li>
                <Link to="/register">
                  <button>Join</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <ul className="navbar__menu">
            <Link to="/">Graphics & Design</Link>
            <Link to="/">Video & Animation</Link>
            <Link to="/">Writing & Translation</Link>
            <Link to="/">AI Services</Link>
            <Link to="/">Digital Marketing</Link>
            <Link to="/">Music & Audio</Link>
            <Link to="/">Programming & Tech</Link>
            <Link to="/">Business</Link>
            <Link to="/">Lifestyle</Link>
          </ul>
        </>
      )}
    </nav>
  );
};

export default Navbar;
