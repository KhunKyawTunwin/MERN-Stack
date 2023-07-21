import { Link } from "react-router-dom";
import "./Message.scss";

const Message = () => {
  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link className="link"> Message</Link> - Mr Khun
        </span>
        <div className="messages">
          <div className="item">
            <img src="/img/man.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ad
              quos fugiat nobis nostrum minima!
            </p>
          </div>
          <div className="item owner">
            <img src="/img/man.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ad
              quos fugiat nobis nostrum minima!
            </p>
          </div>
          <div className="item">
            <img src="/img/man.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ad
              quos fugiat nobis nostrum minima!
            </p>
          </div>
          <div className="item owner">
            <img src="/img/man.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ad
              quos fugiat nobis nostrum minima!
            </p>
          </div>
          <div className="item">
            <img src="/img/man.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ad
              quos fugiat nobis nostrum minima!
            </p>
          </div>
          <div className="item owner">
            <img src="/img/man.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ad
              quos fugiat nobis nostrum minima!
            </p>
          </div>
          <div className="item">
            <img src="/img/man.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ad
              quos fugiat nobis nostrum minima!
            </p>
          </div>
          <div className="item owner">
            <img src="/img/man.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ad
              quos fugiat nobis nostrum minima!
            </p>
          </div>
        </div>
        <hr />
        <div className="write">
          <textarea
            name=""
            placeholder="Write a message ...."
            id=""
            cols="30"
            rows="10"
          />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};
export default Message;
