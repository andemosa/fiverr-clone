import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "@components/Button";
import { axiosInstance } from "@services/index";
import useForm from "@hooks/useForm.hook";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let location = useLocation();
  
  const { formState, submittingForm, formError, formSuccess } = useForm();

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    submittingForm();

    try {
      const res = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      formSuccess("");
      navigate(location.state?.from ?? "/");
    } catch (err: any) {
      formError(
        err.response.data.errorMessage ?? "An error occurred. Please try again"
      );
    }
  };

  return (
    <section className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="username">
          Username
          <input
            name="username"
            id="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            name="password"
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <Button
          isLoading={formState.submitting}
          disabled={formState.submitting}
        >
          Login
        </Button>
        <pre>{formState.error && formState.error}</pre>
      </form>
    </section>
  );
};

export default Login;
