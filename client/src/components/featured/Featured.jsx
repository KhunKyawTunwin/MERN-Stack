import { useState } from "react";
import "./featured.scss";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <i>freelance</i> services for your business
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="SearchIcon" />
              <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                placeholder="Try 'building mobile app'"
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Populars :</span>
            <button>Web Design</button>
            <button>Node Js Developer</button>
            <button>Full-Stack Developer</button>
            <button>Python Developer</button>
            <button>Java Developer</button>
          </div>
        </div>
        <div className="right">
          <img src="./img/man.png" alt="HeroImg" />
        </div>
      </div>
    </div>
  );
};
export default Featured;
