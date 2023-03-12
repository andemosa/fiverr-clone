import { Link } from "react-router-dom";
import Slider from "react-slick";

import { cards } from "data";

interface IProps {
  img: string;
  desc: string;
  title: string;
}

const Card = ({ desc, img, title }: IProps) => {
  return (
    <Link to="/gigs?cat=design">
      <div className="catCard">
        <img src={img} alt="" />
        <div className="catCard__overlay">
          <p className="catCard__desc">{desc}</p>
          <p className="catCard__title">{title}</p>
        </div>
      </div>
    </Link>
  );
};

const Categories = () => {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <section className="slider">
      <Slider {...settings}>
        {cards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </Slider>
    </section>
  );
};

export default Categories;
