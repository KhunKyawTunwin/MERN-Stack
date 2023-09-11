import { Link } from "react-router-dom";
import "./dashboard.scss";
import currentUserData from "../../utils/currentUserData";
import { newRequest } from "../../api/url";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react";

const Dashboard = () => {
  const currentUser = currentUserData();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () => newRequest.get(`/gigs`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGig"]);
    },
  });

  const mutationForEdit = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGig"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  const handleEdit = (id) => {
    mutationForEdit.mutate(id);
  };

  return (
    <div className="mydash">
      <div className="dash-container">
        <div className="dash-title">
          <h1>
            <span className="adminCheck">Admin </span>
            {currentUser.username} {"> >"} Post Review
          </h1>
        </div>
        <hr />
        <div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Post By</th>
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
                        <td>
                          {gig.userId === currentUser.userId
                            ? currentUser.username
                            : gig.userId.substring(0, 10)}
                          ....
                        </td>
                        <td>{"Pending"}</td>
                        <td>{gig.sales}</td>
                        {currentUser.roles === "Admin" && (
                          <div className="btnFlex">
                            <span
                              onClick={() => handleDelete(gig._id)}
                              className="delitem"
                            >
                              Delete
                            </span>
                            <span onClick={() => handleEdit(gig._id)}>
                              Accept
                            </span>
                            <Link to={`/gig/${gig._id}`} className="link">
                              <span>Review</span>
                            </Link>
                          </div>
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
