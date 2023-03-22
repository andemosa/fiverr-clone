import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { axiosInstance } from "@services/index";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser")!)?.user;

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("currentUser");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

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
          <li className="navbar__links-ads">Fiverr Business</li>
          <li className="navbar__links-ads">Explore</li>
          <li className="navbar__links-ads">English</li>
          {!currentUser?.isSeller && (
            <li className="navbar__links-ads">Become a Seller</li>
          )}
          {currentUser ? (
            <div className="navbar__user" onClick={() => setOpen(!open)}>
              <img src={currentUser?.img || "/img/noavatar.webp"} alt="" />
              <li>{currentUser?.username}</li>
              {open && (
                <ul className="navbar__user__options">
                  {currentUser?.isSeller && (
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
                  <li onClick={handleLogout}>Logout</li>
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
