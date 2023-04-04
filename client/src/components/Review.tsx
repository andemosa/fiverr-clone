import { IReview } from "@customTypes/review";

const Review = ({ user, star, description }: IReview) => {
  return (
    <div className="review">
      <div className="review__user">
        <img
          className="review__user-pic"
          src={user.avatar ?? "/img/noavatar.webp"}
          alt={user.username}
        />
        <div className="review__user-info">
          <span>{user.username}</span>
          <div className="review__user-country">
            <span>{user.country}</span>
          </div>
        </div>
      </div>
      <div className="review__stars">
        {Array.from({ length: star }).map((_, i) => (
          <img src="/img/star.webp" alt="" key={i} />
        ))}
        <span>{star}</span>
      </div>
      <p>{description}</p>
      <div className="review__helpful">
        <span>Helpful?</span>
        <img src="/img/like.webp" alt="" />
        <span>Yes</span>
        <img src="/img/dislike.webp" alt="" />
        <span>No</span>
      </div>
      <hr />
    </div>
  );
};

export default Review;
