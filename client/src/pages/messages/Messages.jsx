import { Link } from "react-router-dom";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { newRequest } from "../../api/url";
import moment from "moment";

import "./Messages.scss";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversation"],
    queryFn: () => newRequest.get("/conversations").then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`, review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
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
            <tr>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {data.map((conver) => (
              <tr
                className={
                  (currentUser.isSeller && !conver.readBySeller) ||
                  (!currentUser.isSeller && !conver.readByBuyer && "active")
                }
                key={conver.id}
              >
                <td>
                  {currentUser.isSeller ? conver.buyerId : conver.sellerId}
                </td>
                <td>
                  <Link className="link" to={`/message/${conver.id}`}>
                    {conver?.lastMessage?.substring(0, 100)} ....
                  </Link>
                </td>
                <td>{moment(conver.updatedAt).fromNow()}</td>
                <td>
                  <button>
                    {(currentUser.isSeller && !conver.readBySeller) ||
                      (!currentUser.isSeller && !conver.readByBuyer && (
                        <button onClick={() => handleRead(conver.id)}>
                          Mark as Read
                        </button>
                      ))}
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};
export default Messages;
