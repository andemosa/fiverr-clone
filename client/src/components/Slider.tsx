import Slider from "react-slick";

import { cards } from "data";
import Card from "./Card";

const SliderComp = () => {
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
    <div className="slider">
      <Slider {...settings}>
        {cards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </Slider>
    </div>
  );
};

export default SliderComp;
