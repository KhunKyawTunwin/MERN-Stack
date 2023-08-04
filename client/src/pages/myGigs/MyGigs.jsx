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
        .get(`/gigs/?userId=${currentUser.userId}`)
        .then((res) => res.data),
  });

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

  const handleEdit = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>{currentUser.username} #Assets</h1>
          {currentUser.isSeller && (
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
                  {data.map((gig) => (
                    <tr key={gig._id}>
                      <Link to={`/gig/${gig._id}`} className="link">
                        <td>
                          <img className="imgGis" src={gig.cover} alt="" />
                        </td>
                      </Link>
                      <td>{gig.title}</td>
                      <td>{gig.price} MMK</td>
                      <td>{gig.sales}</td>
                      <td className="editIcons">
                        <img
                          className="edit"
                          src={isLoading ? "Editing ..." : "/img/edit.png"}
                          alt="DeleteIcon"
                          onClick={() => handleEdit(gig._id)}
                        />{" "}
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
export default MyGigs;
