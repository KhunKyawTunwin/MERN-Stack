import { Link } from "react-router-dom";
import "./Messages.scss";

const Messages = () => {
  const currentUser = {
    id: Date.now(),
    name: "MrKhun",
    isSeller: true,
  };

  const message =
    "You can provide a way better UX than this when your app throws errors by providing your own ErrorBoundary or errorElement prop on your route.";
  return (
    <div className="messages">
      <div className="container">
        <div className="title">
          <h1>Investment Orders Lists</h1>
        </div>
        <table>
          <tr>
            <th>Investor</th>
            <th>Last Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          <tr className="active">
            <td>Mr Khun</td>
            <td>
              <Link className="link" to="/message/1">
                {message.substring(0, 100)} ....
              </Link>
            </td>
            <td>1 day ago</td>
            <td>
              <button>
                <Link className="link" to="/message/1">
                  Mark as Read
                </Link>
              </button>
            </td>
          </tr>
          <tr className="active">
            <td>Mr Khun</td>
            <td>
              <Link className="link" to="/message/2">
                {message.substring(0, 100)} ....
              </Link>
            </td>
            <td>1 day ago</td>
            <td>
              <button>
                <Link className="link" to="/message/2">
                  Mark as Read
                </Link>
              </button>
            </td>
          </tr>
          <tr>
            <td>Mr Khun</td>
            <td>
              <Link className="link" to="/message/3">
                {message}
              </Link>
            </td>
            <td>1 day ago</td>
          </tr>
        </table>
      </div>
    </div>
  );
};
export default Messages;
