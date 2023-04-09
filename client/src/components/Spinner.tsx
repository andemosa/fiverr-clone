export const Spinner = ({ button = false }) => (
  <div
    className={`spinner__wrapper-con ${button && "button-spinner"}`}
    role="img"
    aria-label="Loading"
  >
    {Array.from({ length: 4 }).map((_, i) => (
      <div className={button ? "button-spinner" : ""} key={i}></div>
    ))}
  </div>
);

const LoadingSpinner = () => {
  return (
    <div className="spinner__wrapper">
      <Spinner />
    </div>
  );
};

export default LoadingSpinner;
