import "./featured.scss";

const Featured = () => {
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
              <input type="text" placeholder="Try 'building mobile app'" />
            </div>
            <button>Search</button>
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
