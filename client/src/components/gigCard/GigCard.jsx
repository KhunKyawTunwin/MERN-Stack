import { Link } from "react-router-dom";
import "./GigCard.scss";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../../api/url";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["gigUser"],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => res.data),
  });
  return (
    <div className="gigCard">
      <Link to={`/gig/${item._id}`} className="link">
        <img src={item.cover} alt="" />
      </Link>

      <div className="info">
        {isLoading ? (
          "Loading ..."
        ) : error ? (
          "Something went wrong!"
        ) : (
          <div className="user">
            <img src={data.img || "/img/eth.png"} alt="" />
            <span>{data.username}</span>
          </div>
        )}
        <Link to={`/gig/${item._id}`}>
          <p>{item.desc}</p>
        </Link>
        <div className="star">
          <img src="./img/star.png" alt="" />
          <span>
            {!isNaN(item.totalStars / item.startNumber) &&
              Math.round(item.totalStars / item.startNumber)}
          </span>
        </div>
      </div>
      <hr />
      <div className="details">
        <img src="./img/heart.png" alt="" />
        <div className="price">
          <samp>Starting At</samp>
          <h2>${item.price}</h2>
        </div>
      </div>
    </div>
  );
};
export default GigCard;
