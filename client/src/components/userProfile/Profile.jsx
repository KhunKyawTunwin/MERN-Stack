import { useQuery } from "@tanstack/react-query";
import currentUserData from "../../utils/currentUserData";
import "./userprofile.scss";
import { newRequest } from "../../api/url";
import { Link } from "react-router-dom";

const Profile = () => {
  const currentUser = currentUserData();

  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () => newRequest.get("/users").then((res) => res.data),
  });

  return (
    <>
      <section className="users-container">
        {isLoading ? (
          "Loading ..."
        ) : error ? (
          "Something went wrog!"
        ) : (
          <>
            <div className="header-container">
              <div className="headlist">
                <h2>Register Users Lists </h2>
                <h2>User Informations</h2>
                <h2>Total Assets</h2>
                <p className="activelist">
                  <span>Status</span>
                </p>
              </div>
              {data.map((user) => (
                <div className="userlists" key={user._id}>
                  {currentUser.userId === user._id && (
                    <>
                      <img src={user.img} alt="userProfile" />

                      <div className="userInfo">
                        <p>Name :{user.username}</p>
                        <span>Country :{user.country}</span>
                      </div>
                      <div className="userInfo">
                        <p>Name :{user.username}</p>
                        <span>Country :{user.country}</span>
                      </div>
                      <div className="datalist">
                        <h3>
                          {user.roles === "Admin"
                            ? "Admin & Seller"
                            : user.roles === "Seller"
                            ? "Seller & Buyer"
                            : "User & Buyer"}
                        </h3>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
        <div>
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>
      </section>
    </>
  );
};
export default Profile;
