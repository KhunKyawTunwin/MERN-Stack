import { Link } from "react-router-dom";

import "./projectcard.scss";

// import currentUserData from "../../utils/currentUserData";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../../api/url";

const ProjectCard = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () => newRequest.get(`/users`).then((res) => res.data),
  });

  return (
    <div className="project-container">
      {isLoading ? (
        "Loading ..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <>
          {data.map((user) => (
            <div className="projectCard" key={data._id}>
              <img src={user.img} alt="" />
              <div className="info">
                <img src={user.img} alt="" />
                <div className="texts">
                  <h2>{user.email}</h2>
                  <span>{user.username}</span>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
export default ProjectCard;
