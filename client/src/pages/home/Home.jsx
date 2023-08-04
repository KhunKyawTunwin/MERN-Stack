import { Fragment } from "react";
import { Featured, Slide, TrustedBy } from "../../components";
import ProjectCard from "../../components/projectCard/ProjectCard";

import "./Home.scss";
import Brand from "../../components/brand/Brand";
import Blog from "../blog/Blog";
import Possibility from "../possibility/Possibility";
import Features from "../features/Features";

const constextList = [
  {
    id: 1,
    img: "./img/check.png",
    title: "The best for every budget",
    desc: "Find the right service for every price point. No hourly rates, just project-based pricing.",
  },
  {
    id: 2,
    img: "./img/check.png",
    title: "The best for every budget",
    desc: "Find the right service for every price point. No hourly rates, just project-based pricing.",
  },
  {
    id: 3,
    img: "./img/check.png",
    title: "The best for every budget",
    desc: "Find the right service for every price point. No hourly rates, just project-based pricing.",
  },
  {
    id: 4,
    img: "./img/check.png",
    title: "The best for every budget",
    desc: "Find the right service for every price point. No hourly rates, just project-based pricing.",
  },
];

const Home = () => {
  return (
    <div>
      <Featured />
      {/* <TrustedBy /> */}
      <Brand />
      <Slide />

      <Possibility />
      {/* <div className="features">
        <div className="container">
          <div className="item">
            <h1>A whole world of freelance talent at your fingertips</h1>
            {constextList.map(({ id, img, title, desc }) => {
              return (
                <Fragment key={id}>
                <div className="title">
                    <img src={img} alt="checkIcon" />
                    {title}
                  </div>
                  <p>{desc}</p>
                </Fragment>
              );
            })}
          </div>

          <div className="item">
          <video src="./img/video.mp4" controls></video>
          </div>
          </div>
        </div> */}
      <Features />

      {/* <div className="features dark">
        <div className="container">
        <div className="item">
        <h1>Fiverr Business</h1>
        <h1>A business solution design for teams</h1>
        <p>
        Upgrade to a curated experience to access vetted talent and
        exclusive tools
        </p>
        
        {constextList.map(({ id, img, title }) => {
          return (
            <Fragment key={id}>
            <div className="title">
            <img src={img} alt="checkIcon" />
            <p>{title}</p>
            </div>
                </Fragment>
              );
            })}
            <button>Explore Ethnic Business</button>
            </div>
            
            <div className="item">
            <img
            src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624757/business-desktop-870-x1.png"
            alt=""
            />
            </div>
            </div>
          </div> */}

      {/* <ProjectCard /> */}
      {/* <Blog /> */}
    </div>
  );
};
export default Home;
