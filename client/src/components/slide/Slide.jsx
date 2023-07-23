import { Swiper, SwiperSlide } from "swiper/react";

import { FreeMode, Pagination } from "swiper/modules";
import { cards } from "../../constants/data";
import { CartCard } from "..";

import "swiper/css";
import "swiper/css/pagination";
import "./slide.scss";

const Slide = () => {
  return (
    <div className="slide">
      <div className="container">
        <h1>Polur Service</h1>
        <Swiper
          slidesPerView={6}
          spaceBetween={20}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {cards.map((card) => (
            <SwiperSlide key={card.id}>
              <CartCard item={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slide;
