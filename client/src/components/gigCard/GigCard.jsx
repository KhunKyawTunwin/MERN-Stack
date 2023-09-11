import { Link } from "react-router-dom";
import "./GigCard.scss";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../../api/url";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  if (item.postAccept === false) {
    return null;
  }

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

            <div className="star">
              <img src="./img/star.png" alt="" />
              <span>
                {!isNaN(item.totalStars / item.startNumber) &&
                  Math.round(item.totalStars / item.startNumber)}
              </span>
            </div>
          </div>
        )}
        <Link to={`/gig/${item._id}`}>
          <p>
            {item.desc.length <= 100
              ? item.desc
              : `${item.desc.substr(0, 100)}   Read more ...`}
          </p>
        </Link>
        <div className="investList">
          <h3>Investment Amount</h3>
          <p>$ {item.totalInvestAmount} M</p>
          <span>
            From <h3>{item.totalInvestor}</h3> Investor
          </span>
        </div>
      </div>
      <hr />
      <div className="details">
        <div className="iconAndDate">
          <img className="heartIcon" src="./img/heart.png" alt="" />
          <span>{moment(item.createdAt).fromNow()}</span>
        </div>
        <div className="dateLimit">
          <span>
            Start: {new Date(item.createdAt).getDate()}/
            {new Date(item.createdAt).getMonth() + 1}/
            {new Date(item.createdAt).getFullYear()}
          </span>
          <span>
            End: {new Date(item.endDate).getDate()}/
            {new Date(item.endDate).getMonth() + 1}/
            {new Date(item.endDate).getFullYear()}
          </span>
        </div>
        <div className="startPrice">
          <span>Starting Invest Amount</span>
          <hr />
          <h2>150 $</h2>
        </div>
      </div>
    </div>
  );
};
export default GigCard;
