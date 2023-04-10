import { Link } from "react-router-dom";

import { IGig } from "@customTypes/gig";

const GigCard = ({
  _id,
  coverImage,
  price,
  description,
  user,
  totalStars,
  starNumber,
}: IGig) => {
  const { avatar, username } = user;
  return (
    <Link to={`/gig/${_id}`}>
      <div className="gigCard">
        <img src={coverImage} alt="" />
        <div className="gigCard__info">
          <div className="gigCard__user">
            <img src={avatar || "/img/noavatar.webp"} alt="" />
            <span>{username}</span>
          </div>
          <p>{description}</p>
          <div className="gigCard__star">
            <img src="./img/star.webp" alt="" />
            <span>
              {!isNaN(totalStars / starNumber) &&
                Math.round(totalStars / starNumber)}
            </span>
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
