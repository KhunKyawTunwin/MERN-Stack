import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Review from "../review/Review";
import "./Reviews.scss";
import { newRequest } from "../../api/url";

const Reviews = ({ gigId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => newRequest.get(`/reviews/${gigId}`).then((res) => res.data),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star });
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "loading"
        : error
        ? "Something went wrong!"
        : data.map((review) => <Review key={review._id} review={review} />)}

      <div className="add">
        <h2>Add a review 🌟🌟🌟🌟🌟</h2>
        <form action="" className="formInput" onSubmit={handleSubmit}>
          <input type="text" placeholder="Write your Opinion 😉!" />
          <select name="" id="">
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
          <button>Send</button>
        </form>
      </div>
      <hr />
    </div>
  );
};
export default Reviews;
