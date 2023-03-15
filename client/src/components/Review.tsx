const Review = () => {
  return (
    <div className="review">
      <div className="review__user">
        <img className="review__user-pic" src={"/img/noavatar.webp"} alt="" />
        <div className="review__user-info">
          <span>John Doe</span>
          <div className="review__user-country">
            <span>Togo</span>
          </div>
        </div>
      </div>
      <div className="review__stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <img src="/img/star.webp" alt="" key={i} />
        ))}
        <span>5</span>
      </div>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </p>
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
