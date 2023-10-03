import "swiper/css";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../../api/url";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Reviews } from "../../components";

import "./Gig.scss";
import "./slide.css";
import currentUserData from "../../utils/currentUserData";
import { useState } from "react";

const Gig = () => {
  const { id } = useParams();
  const [investAmount, setInvestAmount] = useState("300");
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () => newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
  });
  const navigate = useNavigate();

  const handleOnchange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    console.log("Price gola is", data.priceGoal + "and value", investAmount);
    if (investAmount !== 0 && investAmount < 300) {
      return alert("Minimum order must be 300 $ or more.");
    }
    const fitAmount = (data.priceGoal - data.totalInvestAmount).toLocaleString(
      "en-US",
      {
        style: "currency",
        currency: "USD", // Replace 'USD' with your desired currency code
        minimumFractionDigits: 0, // Number of decimal places
        maximumFractionDigits: 0, // Number of decimal places
      }
    );
    if (
      investAmount > data.priceGoal ||
      investAmount > data.priceGoal - data.totalInvestAmount
    ) {
      return alert(`Total Invest amount ${fitAmount} Left.`);
    }
    setInvestAmount({ ...investAmount, [name]: value });

    navigate(`/pay/${id}/${investAmount}`);
  };

  const currentUser = currentUserData();

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => newRequest.get(`/users/${userId}`).then((res) => res.data),
    enabled: !!userId,
  });

  return (
    <div className="gig">
      {isLoading ? (
        "Loading ..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadCrumbs">
              Ethnic Property {">"} {data.cat.toUpperCase()}
            </span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "Loading ..."
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="proFileImg"
                  src={dataUser.img || "/img/person.gif"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src={`/img/star.png`} alt="starIcon" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}

            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySlide"
            >
              {data.images.map((img, i) => (
                <SwiperSlide key={i}>
                  <img className="imgDetail" src={img} alt={i} />
                </SwiperSlide>
              ))}
            </Swiper>
            <h2>About This{data.cat}</h2>
            <p>{data.desc}</p>
            {isLoadingUser ? (
              "Loading ..."
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>About The Investment Owner</h2>
                <div className="user">
                  <img src={dataUser.img || "/img/person.gif"} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="starIcon" key={i} />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button className="contactBtn">Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="title">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member Since</span>
                      <span className="title">Jan, 1950</span>
                    </div>
                    <div className="item">
                      <span className="title">Open Daily</span>
                      <span className="title">9:00 to 5:00</span>
                    </div>
                    <div className="item">
                      <span className="title">Language</span>
                      <span className="title">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}
            <Reviews gigId={id} />
          </div>

          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <div className="goalandleft">
                <p className="goalPrice">
                  Goal :
                  <span>
                    {data.priceGoal.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD", // Replace 'USD' with your desired currency code
                      minimumFractionDigits: 0, // Number of decimal places
                      maximumFractionDigits: 0, // Number of decimal places
                    })}
                  </span>
                </p>
                {data.totalInvestAmount !== 0 && (
                  <p className="leftlive">
                    Total Left :
                    <span>
                      {(data.priceGoal - data.totalInvestAmount).toLocaleString(
                        "en-US",
                        {
                          style: "currency",
                          currency: "USD", // Replace 'USD' with your desired currency code
                          minimumFractionDigits: 0, // Number of decimal places
                          maximumFractionDigits: 0, // Number of decimal places
                        }
                      )}
                    </span>
                  </p>
                )}
              </div>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="ClockIcon" />
                <span>{data.deliveryTime} Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revision</span>
              </div>
            </div>
            <div className="featureslist">
              {data?.features.map((feature, i) => (
                <div className="item" key={i}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
              <div className="formData">
                {currentUser ? (
                  <form className="formData-lists" onSubmit={handleOnchange}>
                    <label>Invest Amount</label>
                    <input
                      type="number"
                      name="amount"
                      step={50}
                      value={investAmount}
                      onChange={(e) => {
                        setInvestAmount(
                          e.target.value.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD", // Replace 'USD' with your desired currency code
                            minimumFractionDigits: 0, // Number of decimal places
                            maximumFractionDigits: 0, // Number of decimal places
                          })
                        );
                      }}
                      placeholder="Invest Amount"
                    />
                    <button type="submit">Continue</button>
                  </form>
                ) : (
                  <Link to={`/register`}>
                    <button>Continue</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Gig;
