import { Link } from "react-router-dom";
import "./MyGigs.scss";

const MyGigs = () => {
  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>Ethnics</h1>
          <Link to="/add">
            <button>Add New</button>
          </Link>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>
              <img
                className="imgGis"
                src="https://images.unsplash.com/photo-1682686578707-140b042e8f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80"
                alt=""
              />
            </td>
            <td>Gig1</td>
            <td>29</td>
            <td>Hi There</td>
            <td>
              <img className="delete" src="/img/Del.png" alt="" />
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="imgGis"
                src="https://images.unsplash.com/photo-1682686578707-140b042e8f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80"
                alt=""
              />
            </td>
            <td>Gig1</td>
            <td>29</td>
            <td>Hi There</td>
            <td>
              <img className="delete" src="/img/Del.png" alt="" />
            </td>
          </tr>{" "}
          <tr>
            <td>
              <img
                className="imgGis"
                src="https://images.unsplash.com/photo-1682686578707-140b042e8f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80"
                alt=""
              />
            </td>
            <td>Gig1</td>
            <td>29</td>
            <td>Hi There</td>
            <td>
              <img className="delete" src="/img/Del.png" alt="" />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};
export default MyGigs;
