import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { axiosInstance } from "@services/index";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err: any) {
      setError(err.response.data.errorMessage ?? "An error occurred. Please try again");
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
        <button>Login</button>
        <p>{error && error}</p>
      </form>
    </section>
  );
};

export default Login;
