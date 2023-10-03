import { Link } from "react-router-dom";
import "./gigsLists.scss";
import currentUserData from "../../utils/currentUserData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { newRequest } from "../../api/url";

const GigsList = () => {
  const currentUser = currentUserData();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () => newRequest.get(`/gigs`).then((res) => res.data),
  });

  console.log("Gigs list in data is ", data);
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
          <button className="link">All Assets</button>
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
                <>
                  {data?.map((gig) => (
                    <tr key={gig._id}>
                      {console.log(gig)}
                      <Link to={`/gig/${gig._id}`} className="link">
                        <td>
                          <img className="imgGis" src={gig.cover} alt="" />
                        </td>
                      </Link>
                      <td>{gig.title}</td>
                      <td>
                        {gig?.priceGoal.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD", // Replace 'USD' with your desired currency code
                          minimumFractionDigits: 1, // Number of decimal places
                          maximumFractionDigits: 1, // Number of decimal places
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
                  ))}
                </>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default GigsList;
