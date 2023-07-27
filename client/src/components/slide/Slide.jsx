import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { cards } from "../../constants/data";

import "swiper/css";
// import "swiper/css/pagination";
import "./slide.scss";
import CatCard from "../catCard/CatCard";

const Slide = () => {
  return (
    <div className="slide">
      <div className="container">
        <h1>Categories lists for invester</h1>
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
          {cards.map((card) => (
            <SwiperSlide key={card.id}>
              <CatCard item={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slide;
