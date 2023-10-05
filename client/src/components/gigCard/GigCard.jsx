import { Link, useParams } from "react-router-dom";
import "./GigCard.scss";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../../api/url";
import { calculateBarPercentage, daysLeft } from "../../utils";
daysLeft;

const GigCard = ({ item }) => {
  // console.log("Git cart items is", item);
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  const remainDays = daysLeft(item.endDate);

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
            <img src={data?.img || "/img/eth.png"} alt="" />
            <span>{data?.username}</span>

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
          <div className="raiseAmount">
            <p>
              Raise to {""}
              {item.totalInvestAmount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD", // Replace 'USD' with your desired currency code
                minimumFractionDigits: 0, // Number of decimal places
                maximumFractionDigits: 0, // Number of decimal places
              })}
            </p>

            <>
              {item.totalInvestAmount !== 0 && (
                <p className="leftamount">
                  Left{" "}
                  {(item.priceGoal - item.totalInvestAmount).toLocaleString(
                    "en-US",
                    {
                      style: "currency",
                      currency: "USD", // Replace 'USD' with your desired currency code
                      minimumFractionDigits: 0, // Number of decimal places
                      maximumFractionDigits: 0, // Number of decimal places
                    }
                  )}
                </p>
              )}
            </>
          </div>
          <span>
            From <h4>{item.totalInvestor}</h4>
            Investor
          </span>
        </div>
      </div>
      <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
        <div
          className="absolute h-full bg-[#4acd8d]"
          style={{
            width: `${calculateBarPercentage(
              item.priceGoal,
              item.totalInvestAmount
            )}%`,
            maxWidth: "100%",
          }}
        />
      </div>
      <div className="details">
        <div className="iconAndDate">
          <small>
            {item.priceGoal.toLocaleString("en-US", {
              style: "currency",
              currency: "USD", // Replace 'USD' with your desired currency code
              minimumFractionDigits: 0, // Number of decimal places
              maximumFractionDigits: 0, // Number of decimal places
            })}
            <h3>Goal*</h3>
          </small>

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
          {item.totalInvestAmount == item.priceGoal ? (
            <>
              <h3 className="hitTarget">Hit Target</h3>
              <hr />
              <h2>Days Left</h2>
            </>
          ) : (
            <>
              <span>{remainDays}</span>
              <hr />
              <h2>Days Left</h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default GigCard;
