import Slider from "react-slick";

import { projects } from "data";

interface IProps {
  img: string;
  pic: string;
  category: string;
  username: string;
}

const Card = ({ pic, img, category, username }: IProps) => {
  return (
    <div className="projectCard">
      <img src={img} alt={category} />
      <div className="projectCard__info">
        <img src={pic} alt={username} />
        <div className="projectCard__texts">
          <h2>{category}</h2>
          <span>{username}</span>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "linear",
  };
  return (
    <section className="slider">
      <Slider {...settings}>
        {projects.map((project) => (
          <Card key={project.id} {...project} />
        ))}
      </Slider>
    </section>
  );
};

export default Projects;
