import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "./Orders.scss";
import { newRequest } from "../../api/url";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => newRequest.get("/orders").then((res) => res.data),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const { data } = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  const regex = /0\d{3}\.\.\.\d{3}/;
  return (
    <div className="orders">
      {isLoading ? (
        "Loading ..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Investment Orders Lists</h1>
          </div>

          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>{currentUser?.isSeller ? "Buyer" : "Seller"} ID</th>
                <th>Contact</th>
              </tr>
            </thead>

            <tbody>
              {data.map((order) => (
                <tr key={order._id}>
                  <td>
                    <Link to={`/gig/${order.gigId}`} className="link">
                      <img className="imgOrder" src={order.img} alt="" />
                    </Link>
                  </td>
                  <td>{order.title.substring(0, 50)} ...</td>
                  <td>{order.price} MMK</td>
                  <td>
                    {currentUser?.isSeller
                      ? order.buyerId.substring(0, 5)
                      : order.sellerId.substring(0, 10)}
                    &nbsp;...
                  </td>
                  <td>
                    <img
                      className="delete"
                      src="/img/message.png"
                      alt="chatboxIcon"
                      onClick={() => handleContact(order)}
                    />
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
export default Orders;
