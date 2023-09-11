import "swiper/css";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../../api/url";
import { Link, useParams } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Reviews } from "../../components";

import "./Gig.scss";
import "./slide.css";
import currentUserData from "../../utils/currentUserData";

const Gig = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () => newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
  });

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
                      .map((item) => (
                        <img src="/img/star.png" alt="starIcon" key={item} />
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
            <h2>About This {data.cat}</h2>
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
                          .map((item) => (
                            <img
                              src="/img/star.png"
                              alt="starIcon"
                              key={item}
                            />
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
              <h2>$ {data.price}M</h2>
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
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            {currentUser ? (
              <Link to={`/pay/${id}`} className="">
                <button>Continue</button>
              </Link>
            ) : (
              <Link to={`/register`} className="">
                <button>Continue</button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Gig;
