import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../../api/url";
import { useParams } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import "./Gig.scss";
import "./slide.css";
import { Reviews } from "../../components";

const Gig = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () => newRequest(`gigs/single/${id}`).then((res) => res.data),
  });

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${data.userId}`).then((res) => res.data),
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
              Ethnic Property {">"} Hospital investment lists
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
                  <img className="imgDetail" key={i} src={img} />
                </SwiperSlide>
              ))}
            </Swiper>

            <h2>About This Property</h2>
            <p>{data.desc}</p>
            {isLoadingUser ? (
              "Loading ..."
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
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
                    <button>Contact Me</button>
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
                <img src="/img/clock.png" alt="" />
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
            <button>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Gig;
