import React from "react";
import Article from "../../components/article/Article";

import "./blog.css";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../../api/url";

const Blog = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () => newRequest.get(`/users`).then((res) => res.data),
  });

  return (
    <div className="gpt3__blog section__padding" id="blog">
      <div className="gpt3__blog-heading">
        <h1 className="gradient__text">
          A lot is happening, <br /> We are blogging about it.
        </h1>
      </div>
      {isLoading ? (
        "Loading ..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="gpt3__blog-container">
          {data.map((user) => (
            <div className="gpt3__blog-container_groupA" key={user._id}>
              <Article
                imgUrl={user.img}
                date="Sep 26, 2021"
                text="GPT-3 and Open  AI is the future. Let us exlore how it is?"
                username={user.username}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
