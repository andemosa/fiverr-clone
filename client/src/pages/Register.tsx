import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { axiosInstance } from "@services/index";
import uploadImage from "@utils/upload";
import useForm from "@hooks/useForm.hook";

import { countries } from "data";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
    country: "",
    isSeller: false,
    phone: "",
    description: "",
  });
  const { formState, submittingForm, formError, formSuccess } = useForm();

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (type === "file") {
      files && setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    submittingForm();

    try {
      const { data } = await uploadImage(formData.avatar);
      const { url } = data;

      await axiosInstance.post("/auth/register", {
        ...formData,
        avatar: url,
      });
      formSuccess("");
      navigate("/login");
    } catch (err: any) {
      formError(
        (err.response.data.errorMessage || err.response.data.error?.message) ??
          "An error occurred. Please try again"
      );
    }
  };

  const { username, email, password, country, isSeller, phone, description } =
    formData;

  return (
    <section className="register">
      <form onSubmit={handleSubmit}>
        <div className="register__sections">
          <div>
            <h1>Create a new account</h1>
            <label>
              Username
              <input
                name="username"
                type="text"
                placeholder="johndoe"
                value={username}
                onChange={handleChange}
              />
            </label>

            <label>
              Email
              <input
                name="email"
                type="email"
                placeholder="abc@example.com"
                value={email}
                onChange={handleChange}
              />
            </label>

            <label>
              Password
              <input
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
              />
            </label>

            <label>
              Profile Picture
              <input type="file" name="avatar" onChange={handleChange} />
            </label>

            <label>
              Country
              <select name="country" value={country} onChange={handleChange}>
                {countries.map(({ label, value }) => (
                  <option value={label} key={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <h1>I want to become a seller</h1>
            <div className="register__toggle">
              <label>Activate the seller account</label>
              <label className="register__toggle-switch">
                <input
                  type="checkbox"
                  name="isSeller"
                  checked={isSeller}
                  onChange={handleChange}
                />
                <span className="register__toggle-slider round"></span>
              </label>
            </div>

            <label>
              Phone Number
              <input
                name="phone"
                type="number"
                placeholder="+1 234 567 89"
                value={phone}
                onChange={handleChange}
              />
            </label>

            <label>
              Description
              <textarea
                placeholder="A short description of yourself"
                name="description"
                cols={30}
                rows={10}
                value={description}
                onChange={handleChange}
              ></textarea>
            </label>
          </div>
        </div>
        <button>Register</button>
        <pre>{formState.error && formState.error}</pre>
      </form>
    </section>
  );
};

export default Register;
