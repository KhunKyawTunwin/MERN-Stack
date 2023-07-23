import "./Review.scss";

const Review = () => {
  return (
    <div className="review">
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sed incidunt
        totam ut consequuntur ex, vel esse itaque, quidem soluta, accusamus
        expedita provident. Ipsam qui optio nisi animi accusamus veniam.
      </p>
      <div className="helpful">
        <span>Helpful ?</span>
        <img src="/img/like.png" alt="" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>
    </div>
  );
};
export default Review;
