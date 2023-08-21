import { Link } from "react-router-dom";
import "./dashboard.scss";
import currentUserData from "../../utils/currentUserData";
import { newRequest } from "../../api/url";
import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react";

const Dashboard = () => {
  const currentUser = currentUserData();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () => newRequest.get(`/gigs`).then((res) => res.data),
  });

  console.log("DAta is ", data);
  return (
    <div className="mydash">
      <div className="dash-container">
        <div className="dash-title">
          <h1>{currentUser.username} # Post Review</h1>
        </div>
        <hr />
        <div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Status</th>
                <th>Sales</th>
                <th>Action</th>
              </tr>
            </thead>
            {isLoading ? (
              "Loading ..."
            ) : error ? (
              "Create new assets. 😩"
            ) : (
              <tbody>
                {data?.map((gig) => (
                  <Fragment key={gig._id}>
                    {!gig.postAccept && (
                      <tr>
                        <Link to={`/gig/${gig._id}`} className="link">
                          <td>
                            <img className="imgGis" src={gig.cover} alt="" />
                          </td>
                        </Link>
                        <td>{gig.title}</td>
                        <td>{gig.price} MMK</td>
                        <td>{"Pending"}</td>
                        <td>{gig.sales}</td>
                        {currentUser.roles === "Admin" && (
                          <td>
                            <div className="btnFlex">
                              <Link to="/" className="link">
                                <span className="delitem">Delete</span>
                                <span>Accept</span>
                                <span>Review</span>
                              </Link>
                            </div>
                          </td>
                        )}
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
