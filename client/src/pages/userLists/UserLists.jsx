import { useQuery } from "@tanstack/react-query";
import "./userslists.scss";
import { newRequest } from "../../api/url";

const UserLists = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () => newRequest.get("/users").then((res) => res.data),
  });
  console.log(data);

  return (
    <section className="user-container">
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
              <p className="activelist">
                <span>Active Lists</span>
              </p>
            </div>
            {data.map((user) => (
              <div className="userlists">
                <img src={user.img} alt="userProfile" />

                <div className="userInfo">
                  <p>Name :{user.username}</p>
                  <span>Country :{user.country}</span>
                </div>
                <div className="datalist">
                  <h3>
                    {user.isAdmin & user.isSeller
                      ? "Admin"
                      : user.isSeller
                      ? "Seller & Buyer"
                      : "Normal & Buyer"}
                  </h3>
                  <p></p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};
export default UserLists;
