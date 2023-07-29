import { useQuery } from "@tanstack/react-query";
import "./Review.scss";
import { newRequest } from "../../api/url";

const Review = ({ review }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => res.data),
  });

  return (
    <div className="review">
      {isLoading ? (
        "Loading ..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="user">
          <img className="proImg" src={data.img || "/img/person.gif"} alt="" />
          <div className="info">
            <span>{data.username}</span>
            <div className="country">
              <img src="/img/mm.png" alt="" />
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}
      <div className="stars">
        {Array(review.star)
          .fill()
          .map((_, i) => (
            <img src="/img/star.png" alt="" key={i} />
          ))}
        <span>{review.star}</span>
      </div>
      <p>{review.desc}</p>
      <div className="helpful">
        <span>Helpful ?</span>
        <img src="/img/like.png" alt="" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;
