import { useState } from "react";
import people from "../../assets/people.png";
import ai from "../../assets/ai.png";
// import "./featured.scss";
import "./featured.css";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };

  return (
    // <div className="featured">
    //   <div className="container">
    //     <div className="left">
    //       <h1>
    //         Find the perfect <i>freelance</i> services for your business
    //       </h1>
    //       <div className="search">
    //         <div className="searchInput">
    //           <img src="./img/search.png" alt="SearchIcon" />
    //           <input
    //             type="text"
    //             onChange={(e) => setInput(e.target.value)}
    //             placeholder="Try 'building mobile app'"
    //           />
    //         </div>
    //         <button onClick={handleSubmit}>Search</button>
    //       </div>
    //       <div className="popular">
    //         <span>Populars :</span>
    //         <button>Web Design</button>
    //         <button>Node Js Developer</button>
    //         <button>Full-Stack Developer</button>
    //         <button>Python Developer</button>
    //         <button>Java Developer</button>
    //       </div>
    //     </div>
    //     <div className="right">
    //       <img src="./img/man.png" alt="HeroImg" />
    //     </div>
    //   </div>
    // </div>
    <>
      <div className="gpt3__header section__padding" id="home">
        <div className="gpt3__header-content">
          <h1 className="gradient__text">
            Let&apos;s Build Something amazing with GPT-3 OpenAI
          </h1>
          <p>
            Yet bed any for travelling assistance indulgence unpleasing. Not
            thoughts all exercise blessing. Indulgence way everything joy
            alteration boisterous the attachment. Party we years to order allow
            asked of.
          </p>

          <div className="gpt3__header-content__input">
            <input type="email" placeholder="Your Email Address" />
            <button type="button">Get Started</button>
          </div>

          <div className="gpt3__header-content__people">
            <img src={people} />
            <p>1,600 people requested access a visit in last 24 hours</p>
          </div>
        </div>

        <div className="gpt3__header-image">
          <img src={ai} alt="ailogo" />
        </div>
      </div>
    </>
  );
};
export default Featured;
