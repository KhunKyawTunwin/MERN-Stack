import { Link } from "react-router-dom";
import React from "react";
import gpt3Logo from "../../assets/logo.svg";
import "./footer.css";
// import "./Footer.scss";

const Footer = () => {
  return (
    // <div className="footer">
    //   <div className="container">
    //     <div className="top">
    //       <div className="item">
    //         <h2>Categories</h2>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //       </div>
    //       <div className="item">
    //         <h2>Categories</h2>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //       </div>
    //       <div className="item">
    //         <h2>Categories</h2>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //       </div>
    //       <div className="item">
    //         <h2>Categories</h2>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //       </div>
    //       <div className="item">
    //         <h2>Categories</h2>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //         <span>Graphic & Design</span>
    //       </div>
    //     </div>
    //     <hr />
    //     <div className="bottom">
    //       <div className="left">
    //         <Link to="/" className="link">
    //           <h2>Ethnic</h2>
    //         </Link>
    //         <span>@ ethnic internaltional 2023</span>
    //       </div>
    //       <div className="right">
    //         <div className="social">
    //           <img src="/img/twitter.png" alt="" />
    //           <img src="/img/facebook.png" alt="" />
    //           <img src="/img/linkedin.png" alt="" />
    //           <img src="/img/pinterest.png" alt="" />
    //           <img src="/img/instagram.png" alt="" />
    //         </div>
    //         <div className="link">
    //           <img src="/img/language.png" alt="" />
    //           <span>English</span>
    //         </div>
    //         <div className="link">
    //           <img src="/img/coin.png" alt="" />
    //           <span>USD</span>
    //         </div>
    //         <img src="/img/accessibility.png" alt="" />
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="gpt3__footer section__padding">
      <div className="gpt3__footer-links">
        <div className="gpt3__footer-links_logo">
          <img src={gpt3Logo} alt="gpt3_logo" />
          <p>
            Crechterwoord K12 182 DK Alknjkcb, <br /> All Rights Reserved
          </p>
        </div>
        <div className="gpt3__footer-links_div">
          <h4>Links</h4>
          <p>Overons</p>
          <p>Social Media</p>
          <p>Counters</p>
          <p>Contact</p>
        </div>
        <div className="gpt3__footer-links_div">
          <h4>Company</h4>
          <p>Terms & Conditions </p>
          <p>Privacy Policy</p>
          <p>Contact</p>
        </div>
        <div className="gpt3__footer-links_div">
          <h4>Get in touch</h4>
          <p>Crechterwoord K12 182 DK Alknjkcb</p>
          <p>085-132567</p>
          <p>info@payme.net</p>
        </div>
      </div>

      <div className="gpt3__footer-copyright">
        <p>@2021 GPT-3. All rights reserved.</p>
      </div>
    </div>
  );
};
export default Footer;
