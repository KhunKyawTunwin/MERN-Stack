import { Link } from "react-router-dom";
import "./catcard.scss";

const CatCard = ({ item: { img, desc, title } }) => {
  return (
    <div className="catCard">
      <Link to={`/gigs`} className="link">
        <img src={img} alt="" />
        <span className="desc">{desc}</span>
        <span className="title">{title}</span>
      </Link>
    </div>
  );
};
export default CatCard;
