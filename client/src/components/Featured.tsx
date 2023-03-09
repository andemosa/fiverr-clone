import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };

  return (
    <>
      <div className="featured">
        <div className="featured__container">
          <div className="featured__left">
            <h1>
              Find the perfect <span>freelance</span> services for your business
            </h1>
            <div className="featured__search">
              <div className="featured__searchInput">
                <img src="./img/search.png" alt="" />
                <input
                  type="text"
                  placeholder='Try "building mobile app"'
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <button onClick={handleSubmit}>Search</button>
            </div>
            <div className="featured__popular">
              <span>Popular:</span>
              <button>Web Design</button>
              <button>WordPress</button>
              <button>Logo Design</button>
              <button>AI Services</button>
            </div>
          </div>
          <div className="featured__right">
            <img src="./img/man.png" alt="" />
          </div>
        </div>
      </div>
      <div className="trusted">
        <div className="trusted__container">
          <span>Trusted by:</span>
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook2x.188a797.png"
            alt=""
          />
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google2x.06d74c8.png"
            alt=""
          />
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix2x.887e47e.png"
            alt=""
          />
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg2x.6dc32e4.png"
            alt=""
          />
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal2x.22728be.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Featured;
