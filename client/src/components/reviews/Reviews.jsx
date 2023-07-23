import { useQuery } from "@tanstack/react-query";
import Review from "../review/Review";
import "./Reviews.scss";
import { newRequest } from "../../api/url";

const Reviews = ({ gigId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => newRequest.get(`/reviews/${gigId}`).then((res) => res.data),
  });

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "Loading ..."
        : error
        ? "Something went wrong!"
        : data.map((review) => <Review key={review._id} review={review} />)}
    </div>
  );
};
export default Reviews;
