import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

import DataFetcher from "@components/DataFetcher";
import Reviews from "@components/Reviews";

import { Gig } from "@customTypes/gig";

dayjs.extend(advancedFormat);

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  cssEase: "linear",
};

const GigPage = () => {
  const { id } = useParams();

  return (
    <DataFetcher<Gig>
      url={`/gigs/${id}`}
      buildUI={(data) => <GigDisplay {...data} />}
    />
  );
};

const GigDisplay = ({
  _id,
  category,
  coverImage,
  deliveryTime,
  description,
  price,
  revisionNumber,
  sales,
  shortDescription,
  shortTitle,
  starNumber,
  title,
  totalStars,
  user,
  features,
  images,
}: Gig) => {
  return (
    <section className="gig">
      <div className="gig__container">
        <div className="gig__left">
          <span className="gig__breadcrumbs">
            Fiverr {">"} {category} {">"}
          </span>
          <h1>{title}</h1>
          <div className="gig__user">
            <img
              className="gig__user-pp"
              src={user.avatar ?? "/img/noavatar.webp"}
              alt={user.username}
            />
            <span>{user.username}</span>
            {!isNaN(totalStars / starNumber) && (
              <div className="stars">
                {Array.from({
                  length: Math.round(totalStars / starNumber),
                }).map((_, i) => (
                  <img src="/img/star.webp" alt="" key={i} />
                ))}
                <span>{Math.round(totalStars / starNumber)}</span>
              </div>
            )}
          </div>
          <Slider {...settings} className="gig__left-slider">
            {images.length > 0
              ? images.map((img) => <img key={img} src={img} alt="" />)
              : Array.from({ length: 3 }).map((_, i) => (
                  <img key={i} src={coverImage} alt="" />
                ))}
          </Slider>
          <h2>About This Gig</h2>
          <p>{description}</p>
          <div className="gig__seller">
            <h2>About The Seller</h2>
            <div className="gig__seller__user">
              <img
                src={user.avatar ?? "/img/noavatar.webp"}
                alt={user.username}
              />
              <div className="gig__seller__user-info">
                <span>{user.username}</span>
                <div className="gig__seller__user-stars">
                  {!isNaN(totalStars / starNumber) && (
                    <div className="stars">
                      {Array.from({
                        length: Math.round(totalStars / starNumber),
                      }).map((_, i) => (
                        <img src="/img/star.webp" alt="" key={i} />
                      ))}
                      <span>{Math.round(totalStars / starNumber)}</span>
                    </div>
                  )}
                </div>
                <button>Contact Me</button>
              </div>
            </div>
            <div className="gig__seller__box">
              <div className="gig__seller__items">
                <div className="gig__seller__item">
                  <span className="gig__seller__item-title">From</span>
                  <span className="gig__seller__item-desc">{user.country}</span>
                </div>
                <div className="gig__seller__item">
                  <span className="gig__seller__item-title">Member since</span>
                  <span className="gig__seller__item-desc">
                    {dayjs(user.createdAt).format("MMM YYYY")}
                  </span>
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
              <p>{user.description}</p>
            </div>
          </div>
        </div>

        <div className="gig__right">
          <div className="gig__right__price">
            <h3>{shortTitle}</h3>
            <h2>$ {price}</h2>
          </div>
          <p>{shortDescription}</p>
          <div className="gig__right__details">
            <div className="gig__right__details-item">
              <img src="/img/clock.webp" alt="" />
              <span>{deliveryTime} Days Delivery</span>
            </div>
            <div className="gig__right__details-item">
              <img src="/img/recycle.webp" alt="" />
              <span>{revisionNumber} Revisions</span>
            </div>
          </div>
          <div className="gig__right__features">
            {features.map((feature, i) => (
              <div className="gig__right__features-item" key={i}>
                <img src="/img/greencheck.webp" alt="feat" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <Link to={`/pay/${_id}`}>
            <button>Continue</button>
          </Link>
        </div>
      </div>
      <Reviews />
    </section>
  );
};

export default GigPage;
