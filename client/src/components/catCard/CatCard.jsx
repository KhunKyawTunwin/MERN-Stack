import { Link } from "react-router-dom";
import "./catcard.scss";
// const { search } = useLocation();

const CatCard = ({ items }) => {
  return (
    <div className="catCard">
      <Link to={`/gigs?search=${items.cat}`} className="link">
        <img src={items.cover} alt="profileImg" />
        <span className="desc">{items.title}</span>
        <span className="title">{items.cat}</span>
      </Link>
    </div>
  );
};
export default CatCard;
