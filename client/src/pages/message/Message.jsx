import { Link, json, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { newRequest } from "../../api/url";

import "./Message.scss";

const Message = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { id } = useParams();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () => newRequest.get(`/messages/${id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handdleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/message" className="link">
            Message{">"}
          </Link>
          - {currentUser.username}
        </span>
        {isLoading ? (
          "Loading ..."
        ) : error ? (
          "something went wrong!"
        ) : (
          <div className="messages">
            {data.map((message) => (
              <div
                className={
                  message.userId === currentUser.userId ? "owner item" : "item"
                }
              >
                <img
                  src={
                    message.userId === currentUser.userId
                      ? currentUser.img
                      : "/img/person.gif"
                  }
                  alt="userProfile"
                />
                <p>{message.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handdleSubmit}>
          <textarea
            name=""
            placeholder="Write a message ...."
            id=""
            cols="30"
            rows="10"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
export default Message;
