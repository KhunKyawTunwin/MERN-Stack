import { useEffect, useState } from "react";
import { newRequest } from "../../api/url";

// import onClickOutside from "react-onclickoutside";

import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  // Navbar.handleClickOutside = () => {
  //   setToggle(false);
  // };
  const { pathname } = useLocation();
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
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
    } catch (error) {}
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
        <div className="links">
          <span>Ethnic Business</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {currentUser ? (
            <div className="user" onClick={() => setToggle(!toggle)}>
              <img className="curPointer" src={currentUser?.img} alt="" />
              <span className="userName">{currentUser?.username}</span>
              {toggle && (
                <div className="options">
                  {currentUser?.isSeller && (
                    <>
                      <p className="userInfo">
                        <Link to="/mygigs" className="link">
                          Gigs
                        </Link>
                      </p>
                      <p className="userInfo">
                        <Link to="/add" className="link">
                          Add New Gig
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
              <p className="userInfo">
                <Link to="/login" className="link sign">
                  Sign in
                </Link>
              </p>
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
          <hr />
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
          <hr />
        </>
      )}
    </div>
  );
};

// const clickOutsideConfig = {
//   handleClickOutside: () => Navbar.handleClickOutside,
// };

export default Navbar;
