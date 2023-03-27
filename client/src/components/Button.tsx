import { Spinner } from "./Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const Button = ({
  isLoading = false,
  children,
  ...rest
}: ButtonProps) => (
  <button className="button__container" {...rest}>
    {isLoading && (
      <span className="button__container-spinner">
        <span>
          <Spinner />
        </span>
      </span>
    )}

    <span style={{ visibility: isLoading ? "hidden" : "visible" }}>
      {children}
    </span>
  </button>
);

export default Button;
