import { Link, useNavigate } from "react-router-dom";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { newRequest } from "../../api/url";
import moment from "moment";

import "./Messages.scss";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => newRequest.get("/conversations").then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "Loading ..."
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Investment Orders Lists</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>{currentUser.roles === "Seller" ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((conver) => (
                <tr
                  className={
                    (currentUser.roles === "Seller" && !conver.readBySeller) ||
                    (!currentUser.roles === "Seller" && !conver.readByBuyer
                      ? "active"
                      : "")
                  }
                  key={conver.id}
                >
                  <td>
                    {currentUser.roles === "Seller"
                      ? conver.buyerId
                      : conver.sellerId}
                  </td>
                  <td>
                    <Link className="link" to={`/message/${conver.id}`}>
                      {conver?.lastMessage?.substring(0, 50)} ....
                    </Link>
                  </td>
                  <td>{moment(conver.updatedAt).fromNow()}</td>
                  <td>
                    {(currentUser.roles === "Seller" && !conver.readBySeller) ||
                      (!currentUser.roles === "Seller" &&
                        !conver.readByBuyer && (
                          <Link to={`/message/${currentUser.userId}`}>
                            <button onClick={() => handleRead(conver.id)}>
                              Mark as Read
                            </button>
                          </Link>
                        ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default Messages;
