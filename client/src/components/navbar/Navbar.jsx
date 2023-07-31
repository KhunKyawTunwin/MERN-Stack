import { useEffect, useRef, useState } from "react";
import { newRequest } from "../../api/url";

import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  const { pathname } = useLocation();
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  const menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", handler);
    // return document.removeEventListener("mousedown", handler);
  });

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => window.removeEventListener("scroll", isActive);
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">Ethnic</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links" ref={menuRef}>
          <Link to="business">
            <span>Ethnic Business</span>
          </Link>
          <span>Explore</span>
          <span>English</span>
          {!currentUser?.isSeller && (
            <Link to="/register" className="link">
              <span>Become a Seller</span>
            </Link>
          )}
          {currentUser ? (
            <div className="user" onClick={() => setToggle(!toggle)}>
              <img className="curPointer" src={currentUser?.img} alt="" />
              <span className="userName">
                {currentUser?.username.substring(0, 4)}...
              </span>
              {toggle && (
                <div className="options">
                  {/* <p className="userInfo">
                    <Link to="/mygigs" className="link">
                      Profile
                    </Link>
                  </p> */}
                  {currentUser?.isSeller && (
                    <>
                      <p className="userInfo">
                        <Link to="/mygigs" className="link">
                          Assets
                        </Link>
                      </p>
                      <p className="userInfo">
                        <Link to="/add" className="link">
                          Add New Assets1
                        </Link>
                      </p>
                    </>
                  )}
                  <p className="userInfo">
                    <Link to="/orders" className="link">
                      Orders
                    </Link>
                  </p>
                  <p className="userInfo">
                    <Link to="/messages" className="link">
                      Messages
                    </Link>
                  </p>
                  <p className="userInfo">
                    <Link onClick={handleLogout} className="link">
                      Logout
                    </Link>
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* <p className="userInfo">
                <Link to="/login" className="link sign">
                  Sign in
                </Link>
              </p> */}
              <p className="userInfo">
                <Link className="link join" to="/register">
                  <button>Join</button>
                </Link>
              </p>
            </>
          )}
        </div>
      </div>

      {(active || pathname !== "/") && (
        <>
          {/* <hr />
          <div className="menu">
            <span>Graphic & Design</span>
            <span>Video & Animation</span>
            <span>Writing & Translation</span>
            <span>AI Service</span>
            <span>Digital Marketing</span>
            <span>Music & Audio</span>
            <span>Business</span>
            <span>LifeStyle</span>
            <span>Programming & Tech</span>
          </div>
          <hr /> */}
        </>
      )}
    </div>
  );
};

export default Navbar;
