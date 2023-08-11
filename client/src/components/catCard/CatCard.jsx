import { Link } from "react-router-dom";
import "./catcard.scss";
// const { search } = useLocation();

const CatCard = ({ cat, cover, title }) => {
  return (
    <div className="catCard">
      <Link to={`/gigs?search=${new Set(cat)}`} className="link">
        <img src={cover} alt="" />
        <span className="desc">{title}</span>
        <span className="title">{cat}</span>
      </Link>
    </div>
  );
};
export default CatCard;
