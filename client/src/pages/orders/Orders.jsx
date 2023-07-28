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
  console.log("Data in oreders is ", data);
  console.log(`Current user Data is ${currentUser.username}`);
  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
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
                    <img className="imgOrder" src={order.img} alt="" />
                  </td>
                  <td>{order.title.substring(0, 50)} ...</td>
                  <td>{order.price} MMK</td>
                  <td>
                    {currentUser?.isSeller ? order.buyerId : order.sellerId}
                    {/* 
                    {currentUser?.isSeller
                      ? buyerNames[order._id] // Display buyer's username
                      : sellerNames[order._id]} // Display seller's username
                    
                     */}
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
