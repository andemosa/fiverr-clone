import { Link } from "react-router-dom";

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

export default Card;
