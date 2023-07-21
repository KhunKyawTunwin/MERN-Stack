import { Link } from "react-router-dom";
import { projects } from "../../constants/data";

import "./projectcard.scss";

const ProjectCard = () => {
  return (
    <div className="project-container">
      {projects.map(({ id, img, pp, cat, username }) => (
        <div className="projectCard" key={id}>
          <img src={img} alt="" />
          <div className="info">
            <img src={pp} alt="" />
            <div className="texts">
              <h2>{cat}</h2>
              <span>{username}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProjectCard;
