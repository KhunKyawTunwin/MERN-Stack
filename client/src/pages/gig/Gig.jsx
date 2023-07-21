import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import "./Gig.scss";

const Gig = () => {
  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          <span className="breadCrumbs">
            Ethnic Property and Farmig investment lists
          </span>
          <h1>I will show some most propery and fram</h1>
          <div className="user">
            <img
              className="proFileImg"
              src="https://images.unsplash.com/photo-1682686578707-140b042e8f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80"
              alt=""
            />
            <span>Mr Khun</span>
            <div className="stars">
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <span>5</span>
            </div>
          </div>

          {/* <Swiper className="mySlider" navigation={true} modules={[Navigation]}>
            <SwiperSlide>
              <img
                src="https://images.unsplash.com/photo-1682686578707-140b042e8f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://images.unsplash.com/photo-1682685797741-f0213d24418c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://images.unsplash.com/photo-1674574124649-778f9afc0e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt=""
              />
            </SwiperSlide>
          </Swiper> */}
          <div className="imgSlide">
            <img
              className="imgDetail"
              src="https://images.unsplash.com/photo-1682686578707-140b042e8f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80"
              alt=""
            />
          </div>
          <h2>About This Property</h2>

          <p>
            Houzez is a powerful WordPress real estate theme for freelancers,
            realtors and businesses. With extensive customization options and
            tons of features, Houzez will help you create a website that will
            impress your potential clients and help you sell more homes. This is
            the best theme ever for real estate Divi is the most popular
            WordPress theme in the world. It offers a front-end visual builder
            with fantastic customization options, a theme builder for creating
            page templates, 200+ elements, and over 2,200 pre-made layouts. It
            integrates seamlessly with popular plugins, including WooCommerce
          </p>

          <div className="seller">
            <h2>About The Seller</h2>
            <div className="user">
              <img
                src="https://images.unsplash.com/photo-1682686578707-140b042e8f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80"
                alt=""
              />
              <div className="info">
                <span>Mr Khun</span>
                <div className="stars">
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <span>5</span>
                </div>
                <button>Contact Me</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="title">USA</span>
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
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sed
                incidunt totam ut consequuntur ex, vel esse itaque, quidem
                soluta, accusamus expedita provident. Ipsam qui optio nisi animi
                accusamus veniam.
              </p>
            </div>
          </div>

          <div className="reviews">
            <h2>Reviews</h2>
            <div className="item">
              <div className="user">
                <img
                  className="proImg"
                  src="https://images.unsplash.com/photo-1682686578707-140b042e8f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80"
                  alt=""
                />
                <div className="info">
                  <span>Mr Khuns</span>
                  <div className="country">
                    <img
                      src="https://images.unsplash.com/photo-1540827341250-3dba07798cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
                      alt=""
                    />
                    <span>Yangon</span>
                  </div>
                </div>
              </div>

              <div className="stars">
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <span>5</span>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sed
                incidunt totam ut consequuntur ex, vel esse itaque, quidem
                soluta, accusamus expedita provident. Ipsam qui optio nisi animi
                accusamus veniam.
              </p>
              <div className="helpful">
                <span>Helpful ?</span>
                <img src="/img/like.png" alt="" />
                <span>Yes</span>
                <img src="/img/dislike.png" alt="" />
                <span>No</span>
              </div>
            </div>

            <hr />
          </div>
        </div>

        <div className="right">
          <div className="price">
            <h3>1 Ai generated image</h3>
            <h3>$ 5.90</h3>
          </div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            deserunt quibusdam perspiciatis molestias vitae rerum aspernatur
            labore eligendi error aperiam sint dolores est iure nulla, rem vel,
            blanditiis omnis dolor.
          </p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>2 days Delivery</span>
            </div>
            <div className="item">
              <img src="/img/recycle.png" alt="" />
              <span>2 days Delivery</span>
            </div>
          </div>
          <div className="featureslist">
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Prompt Writing</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Prompt Writing</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Prompt Writing</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Prompt Writing</span>
            </div>
          </div>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
};
export default Gig;
