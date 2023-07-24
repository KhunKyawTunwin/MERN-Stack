// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import "./ReviewComment.scss";
// import { newRequest } from "../../api/url";

// const ReviewComment = ({ gigId }) => {
//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: (review) => {
//       return newRequest.post("/reviews", review);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["reviews"]);
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const desc = e.target[0].value;
//     const star = e.target[1].value;
//     mutation.mutate({ gigId, desc, star });
//   };

//   return (
//     <div className="add">
//       <h2>Add a review 🌟🌟🌟🌟🌟</h2>
//       <form action="" className="formInput" onSubmit={handleSubmit}>
//         <input type="text" placeholder="Write your Opinion 😉!" />
//         <select name="" id="">
//           <option value={1}>1 Star</option>
//           <option value={2}>2 Stars</option>
//           <option value={3}>3 Stars</option>
//           <option value={4}>4 Stars</option>
//           <option value={5}>5 Stars</option>
//         </select>
//         <button>Send</button>
//       </form>
//     </div>
//   );
// };
// export default ReviewComment;
