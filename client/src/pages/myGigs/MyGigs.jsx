import { Link } from "react-router-dom";
import "./MyGigs.scss";
import currentUserData from "../../utils/currentUserData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { newRequest } from "../../api/url";

const MyGigs = () => {
  const currentUser = currentUserData();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest
        .get(`/gigs?userId=${currentUser.userId}`)
        .then((res) => res.data),
  });
  console.log(
    "Current user data and id",
    currentUser.userId,
    "Name",
    currentUser.username,
    data
  );
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>{currentUser.username} # Assets</h1>
          {currentUser.roles === ("Admin" || "Seller") && (
            <Link to="/add" className="link">
              <button>Add New</button>
            </Link>
          )}
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
              <tbody>
                <tr>
                  <td colSpan="6">Loading ...</td>
                </tr>
              </tbody>
            ) : error ? (
              <tbody>
                <tr>
                  <td colSpan="6">Create new assets. 😩</td>
                </tr>
              </tbody>
            ) : (
              <>
                {data?.map((gig) => (
                  <tbody>
                    <tr key={gig._id}>
                      <Link to={`/gig/${gig._id}`} className="link">
                        <td>
                          <img className="imgGis" src={gig.cover} alt="" />
                        </td>
                      </Link>
                      <td>{gig.title}</td>
                      <td>
                        {gig.priceGoal.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD", // Replace 'USD' with your desired currency code
                          minimumFractionDigits: 0, // Number of decimal places
                          maximumFractionDigits: 0, // Number of decimal places
                        })}
                      </td>
                      <td>{gig.postAccept === false ? "Pending" : "Active"}</td>
                      <td className="investors">
                        {gig.sales} <Link to="/orders">Investors</Link>
                      </td>
                      <td className="editIcons">
                        <Link to={`/editgig/${gig._id}`} className="link">
                          <img
                            className="edit"
                            src={isLoading ? "Editing ..." : "/img/edit.png"}
                            alt="DeleteIcon"
                          />
                        </Link>
                        <img
                          className="delete"
                          src={isLoading ? "Deleting" : "/img/Del.png"}
                          alt="DeleteIcon"
                          onClick={() => handleDelete(gig._id)}
                        />
                      </td>
                    </tr>
                  </tbody>
                ))}
              </>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};
export default MyGigs;
