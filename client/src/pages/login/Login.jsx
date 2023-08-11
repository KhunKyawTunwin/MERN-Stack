import { useEffect, useState } from "react";
import { newRequest } from "../../api/url";
import { Link, useNavigate } from "react-router-dom";

import "./Login.scss";
import { useLoginMutation } from "../../features/auth/usersApiSlice";
import { setCredentials } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await newRequest.post("/auth/login", {
  //       email,
  //       password,
  //     });
  //     localStorage.setItem("currentUser", JSON.stringify(res.data));
  //     navigate("/");
  //   } catch (err) {
  //     setError(err.response.data);
  //   }
  // };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [navigate, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      console.log(err.data.message || err.error);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Email</label>
        <input
          // autoComplete="off"
          required
          aria-describedby="uidnote"
          name="email"
          type="email"
          placeholder="example.20@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          autoComplete="off"
          required
          aria-describedby="uidnote"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={isLoading}
          // onClick={() => setLoading(!loading)}
        >
          {/* {loading && error ? "Loading ..." : "Login"} */} Log In
        </button>
        <div className="registerForm">
          <p>Don't have an account ?</p>
          <Link to="/register">
            <span>Signup</span>
          </Link>
        </div>
        {error && error}
      </form>
    </div>
  );
};

export default Login;
