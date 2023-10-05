import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "./Orders.scss";
import { newRequest } from "../../api/url";
import currentUserData from "../../utils/currentUserData";
// import { useMemo } from "react";

const Orders = () => {
  const navigate = useNavigate();
  const currentUser = currentUserData();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => newRequest.get("/orders").then((res) => res.data),
  });

  const {
    isLoading: fetchUser,
    error: userError,
    data: usersData,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => newRequest.get("/users/getUsers").then((res) => res.data),
  });

  // const totalInvestAmount = useMemo(() => {
  //   if (data) {
  //     return data.reduce((total, order) => total + order.totalInvestAmount, 0);
  //   }
  //   return 0;
  // }, [data]);

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const { data } = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations`, {
          to: currentUser.roles === "Seller" ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className="orders">
      {isLoading ? (
        "Loading ..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          {currentUser?.roles === "Admin" ||
          currentUser?.roles === "Seller" ||
          currentUser.roles === "User" ? (
            <>
              <div className="ownerLists">
                <div className="title">
                  <h1>Investment Lists</h1>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Invest Amount</th>
                      <th>Interest Rate 10%</th>
                      <th>
                        {currentUser?.roles === "Admim" ||
                        currentUser?.roles === "Seller"
                          ? "Buyer"
                          : "Seller"}{" "}
                        Name
                      </th>
                      <th>Contact</th>
                      <th>Invested Date</th>
                    </tr>
                  </thead>
                  {data?.map((order) => (
                    <tbody key={order._id}>
                      {(currentUser.roles === "Admin" ||
                        currentUser.roles === "Seller" ||
                        currentUser.roles === "User") && (
                        <tr>
                          <td>
                            <Link to={`/gig/${order.gigId}`} className="link">
                              <img
                                className="imgOrder"
                                src={order.img}
                                alt=""
                              />
                            </Link>
                          </td>
                          <td>{order.title.substring(0, 20)} ...</td>
                          <td>
                            {order.investAmount.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 1,
                              maximumFractionDigits: 1,
                            })}
                          </td>
                          <td>
                            <small>
                              You will recived 10% profit after the target Goal.
                            </small>
                          </td>
                          <td>{order.buyerId.slice(0, 12)}</td>

                          <td>
                            <img
                              className="delete"
                              src="/img/message.png"
                              alt="chatboxIcon"
                              onClick={() => handleContact(order)}
                            />
                          </td>
                          <td>{new Date(order.createdAt).toLocaleString()}</td>
                        </tr>
                      )}
                    </tbody>
                  ))}
                </table>
                {/* <hr style={{ marginTop: "50px" }} />
                <div className="allinvestoramount">
                  <div className="amountList">
                    <span>Total Invest amount from all user</span>
                    <p>3000$</p>
                  </div>
                  <div className="interestList">
                    <span>Total Interest and Capital Money</span>
                  </div>
                </div> */}
              </div>
            </>
          ) : (
            <div>
              <p>No investment!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Orders;
