import { Link } from "react-router-dom";

interface IProps {
  id: number;
  img: string;
  pic: string;
  desc: string;
  price: number;
  star: number;
  username: string;
}

const GigCard = ({ id, desc, img, pic, price, star, username }: IProps) => {
  return (
    <Link to={`/gig/${id}`}>
      <div className="gigCard">
        <img src={img} alt="" />
        <div className="gigCard__info">
          <div className="gigCard__user">
            <img src={pic || "/img/noavatar.webp"} alt="" />
            <span>{username}</span>
          </div>
          <p>{desc}</p>
          <div className="gigCard__star">
            <img src="./img/star.webp" alt="" />
            <span>{star}</span>
          </div>
        </div>
        <hr />
        <div className="gigCard__detail">
          <img src="./img/heart.webp" alt="" />
          <div className="gigCard__price">
            <span>STARTING AT</span>
            <h2>$ {price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
