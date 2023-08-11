import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../../api/url";

import "swiper/css";
// import "swiper/css/pagination";
import "./slide.scss";
import CatCard from "../catCard/CatCard";

const Slide = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["gigs"],
    queryFn: () => newRequest.get(`/gigs`).then((res) => res.data),
  });

  return (
    <div className="slide">
      <div className="container">
        <h1>Categories lists for invester</h1>
        {isLoading ? (
          "Loading ..."
        ) : error ? (
          "Somethig went wrong!"
        ) : (
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            freeMode={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
              1400: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
          >
            {data.map((card) => (
              <SwiperSlide key={card._id}>
                <CatCard cat={card.cat} cover={card.cover} title={card.title} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Slide;
