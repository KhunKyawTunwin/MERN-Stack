import { useState } from "react";
import { newRequest } from "../../api/url";
import upload from "../../utils/upload";
import { Link, useNavigate } from "react-router-dom";

import "./Register.scss";

const Register = () => {
  const [file, setFile] = useState(null);
  const [load, setLoad] = useState(false);
  // const [error, setError] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    desc: "",
    roles: "User",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUserRole = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imgUrl = await upload(file, user);
      await newRequest.post("/auth/register", {
        ...user,
        img: imgUrl,
      });
      setLoad(true);
      navigate("/login");
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            required
            aria-describedby="uidnote"
            placeholder="mrkhuncode"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            required
            aria-describedby="uidnote"
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input
            name="password"
            autoComplete="off"
            required
            aria-describedby="uidnote"
            type="password"
            onChange={handleChange}
          />
          <label htmlFor="">Profile Picture</label>
          <input
            required
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Myanmar"
            onChange={handleChange}
          />
          <button type="submit" onClick={() => setLoad(!load)}>
            {load ? "Registering" : "Register"}
          </button>
          <div className="loginForm">
            <p>Already have an account ?</p>
            <Link to="/login">
              <span>Login</span>
            </Link>
            <Link>
              <div className="socialLogin">
                <span>Google Login</span>
              </div>
            </Link>
          </div>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <select
              name="roles"
              className="selectData"
              onChange={handleUserRole}
            >
              <option value="User">Default</option>
              <option value="User">User</option>
              <option value="Seller">Seller</option>
            </select>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+95 94421 70224"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
