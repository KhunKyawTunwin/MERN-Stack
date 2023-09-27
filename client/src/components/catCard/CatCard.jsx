import { Link } from "react-router-dom";
import "./catcard.scss";

const CatCard = ({ item }) => {
  return (
    <div className="catCard">
      <Link to={`/gigs?searchGigs=${item.cat}`} className="link">
        <img src={item.cover} alt="profileImg" />
        <span className="title">{item.cat.toUpperCase()}</span>
        <span className="desc">{item.title}</span>
      </Link>
    </div>
  );
};

export default CatCard;
