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
      // console.log(data.id);
    } catch (err) {
      if (err.response.status === 404) {
        const { data } = await newRequest.post(`/conversations`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${data.id}`);
      }
    }
  };

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
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>{currentUser?.isSeller ? "Buyer" : "Seller"}</th>
              <th>Contact</th>
            </tr>
            {data.map((order) => (
              <tr key={order._id}>
                <td>
                  <img className="imgOrder" src={order.img} alt="" />
                </td>
                <td>{order.title}</td>
                <td>$ {order.price} M</td>
                <td>Hi There</td>
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
          </table>
        </div>
      )}
    </div>
  );
};
export default Orders;
