import { useState } from "react";
import people from "../../assets/people.png";
import "./featured.css";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?searchGigs=${input}`);
  };

  return (
    <div className="gpt3__header section__padding" id="home">
      <div className="gpt3__header-content">
        <h1 className="gradient__text">
          Investors&apos; Invest in founders building the future
        </h1>
        <p>
          Get equity and front row seats to the startups and small businesses
          you love-for as little as $100.
        </p>

        <div className="gpt3__header-content__input">
          <input
            type="text"
            placeholder="Try to find the best investment products!"
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>
            Search
          </button>
        </div>

        <div className="gpt3__header-content__people">
          <img src={people} />
          <p>1,600 people requested access a visit in last 24 hours</p>
        </div>
      </div>

      <div className="gpt3__header-image">
        <img
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt="ailogo"
        />
      </div>
    </div>
  );
};
export default Featured;
