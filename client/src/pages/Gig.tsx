import Reviews from "@components/Reviews";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  cssEase: "linear",
};

const Gig = () => {
  return (
    <section className="gig">
      <div className="gig__container">
        <div className="gig__left">
          <span className="gig__breadcrumbs">
            Fiverr {">"} Graphics & Design {">"}
          </span>
          <h1>I will create a simple website for you with about 3-5 pages</h1>
          <div className="gig__user">
            <img className="gig__user-pp" src={"/img/noavatar.webp"} alt="" />
            <span>John</span>
            <div className="gig__user-stars">
              <img src="/img/star.webp" alt="" />
              <span>5</span>
            </div>
          </div>
          <Slider {...settings} className="gig__left-slider">
            {Array.from({ length: 5 }).map((img, i) => (
              <img
                key={i}
                src={
                  "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1600"
                }
                alt=""
              />
            ))}
          </Slider>
          <h2>About This Gig</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
            nesciunt voluptates libero vitae quidem odio illum aliquam quas
            laborum a! Voluptates, sequi distinctio delectus nemo totam
            doloremque? Consequuntur, hic perspiciatis.
          </p>
          <div className="gig__seller">
            <h2>About The Seller</h2>
            <div className="gig__seller__user">
              <img src={"/img/noavatar.webp"} alt="" />
              <div className="gig__seller__user-info">
                <span>John</span>
                <div className="gig__seller__user-stars">
                  <img src="/img/star.webp" alt="" />
                  <span>5</span>
                </div>
                <button>Contact Me</button>
              </div>
            </div>
            <div className="gig__seller__box">
              <div className="gig__seller__items">
                <div className="gig__seller__item">
                  <span className="gig__seller__item-title">From</span>
                  <span className="gig__seller__item-desc">Nigeria</span>
                </div>
                <div className="gig__seller__item">
                  <span className="gig__seller__item-title">Member since</span>
                  <span className="gig__seller__item-desc">Aug 2022</span>
                </div>
                <div className="gig__seller__item">
                  <span className="gig__seller__item-title">
                    Avg. response time
                  </span>
                  <span className="gig__seller__item-desc">4 hours</span>
                </div>
                <div className="gig__seller__item">
                  <span className="gig__seller__item-title">Last delivery</span>
                  <span className="gig__seller__item-desc">1 day</span>
                </div>
                <div className="gig__seller__item">
                  <span className="gig__seller__item-title">Languages</span>
                  <span className="gig__seller__item-desc">English</span>
                </div>
              </div>
              <hr />
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Obcaecati, suscipit voluptas? Doloribus culpa voluptate error
                sit nisi autem ipsam ullam fugiat expedita placeat enim eos,
                vitae, repellendus fugit fuga ut?
              </p>
            </div>
          </div>
        </div>

        <div className="gig__right">
          <div className="gig__right__price">
            <h3>title</h3>
            <h2>$ 200</h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis
            aspernatur ea, doloribus dicta explicabo est iusto ipsa ipsum! Quas,
            eligendi fugiat nostrum vel dicta tenetur numquam assumenda
            aspernatur illo amet?
          </p>
          <div className="gig__right__details">
            <div className="gig__right__details-item">
              <img src="/img/clock.webp" alt="" />
              <span>5 Days Delivery</span>
            </div>
            <div className="gig__right__details-item">
              <img src="/img/recycle.webp" alt="" />
              <span>10 Revisions</span>
            </div>
          </div>
          <div className="gig__right__features">
            {Array.from({ length: 5 }).map((feature, i) => (
              <div className="gig__right__features-item" key={i}>
                <img src="/img/greencheck.webp" alt="" />
                <span>{i}</span>
              </div>
            ))}
          </div>
          <Link to={`/pay/2`}>
            <button>Continue</button>
          </Link>
        </div>
      </div>
      <Reviews />
    </section>
  );
};

export default Gig;
