export const Spinner = () => (
  <div className="spinner__wrapper-con" role="img" aria-label="Loading">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

const LoadingSpinner = ({ small = false }) => {
  return (
    <div className={small ? "spinner__wrapper small" : "spinner__wrapper"}>
      <Spinner />
    </div>
  );
};

export default LoadingSpinner;
