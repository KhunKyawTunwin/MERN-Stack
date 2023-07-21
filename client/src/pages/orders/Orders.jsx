import { Link } from "react-router-dom";
import "./Orders.scss";

const Orders = () => {
  const currentUser = {
    id: Date.now(),
    name: "MrKhun",
    isSeller: true,
  };

  return (
    <div className="orders">
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
          <tr>
            <td>
              <img
                className="imgOrder"
                src="https://images.unsplash.com/photo-1682686578707-140b042e8f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80"
                alt=""
              />
            </td>
            <td>Gig1</td>
            <td>29</td>
            <td>Hi There</td>
            <td>
              <Link to="/message/1">
                <img className="delete" src="/img/message.png" alt="" />
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="imgOrder"
                src="https://images.unsplash.com/photo-1682686578707-140b042e8f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80"
                alt=""
              />
            </td>
            <td>Gig1</td>
            <td>29</td>
            <td>Hi There</td>
            <td>
              <Link to="/message/2">
                <img className="delete" src="/img/message.png" alt="" />
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="imgOrder"
                src="https://images.unsplash.com/photo-1682686578707-140b042e8f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80"
                alt=""
              />
            </td>
            <td>Gig1</td>
            <td>29</td>
            <td>Hi There</td>
            <td>
              <Link to="/message/3">
                <img className="delete" src="/img/message.png" alt="" />
              </Link>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};
export default Orders;
