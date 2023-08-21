import "./updatepost.scss";

import { useEffect, useState } from "react";
// import upload from "../../utils/upload";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { newRequest } from "../../api/url";
import { useNavigate, useParams } from "react-router-dom";
// import { INITIAL_STATE } from "../../reducers/gigReducer";

const UpdatePost = () => {
  // const [singleFile, setSingleFile] = useState(undefined);
  // const [files, setFiles] = useState([]);
  // const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [result, setState] = useState(null);

  const { id } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () => newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
  });

  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGig"]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutation.mutateAsync(result);
    navigate("/mygigs");
  };

  const handleChange = (e) => {
    setState({
      ...result,
      [e.target.name]: e.target.value,
    });
  };

  // const handleFeature = (e) => {
  //   e.preventDefault();
  //   dispatch({ type: "ADD_FEATURES", payload: e.target[0].value });
  //   e.target[0].value = "";
  // };

  // const handleUpload = async () => {
  //   setUploading(true);
  //   try {
  //     const cover = await upload(singleFile);
  //     const images = await Promise.all(
  //       [...files].map(async (file) => {
  //         const url = await upload(file);
  //         return url;
  //       })
  //     );
  //     setUploading(false);
  //     dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
  //   } catch (err) {
  //     console.log(err.stack);
  //   }
  // };

  return (
    <div className="add">
      <div className="container">
        <h1>Update Assets</h1>
        {isLoading ? (
          "Loading"
        ) : error ? (
          "Something went wrong!"
        ) : (
          <div className="sections">
            <div className="left">
              <label htmlFor="">Title</label>
              <input
                type="text"
                name="title"
                value={result?.title}
                onChange={handleChange}
                placeholder="I'm full-stack Webdeveloper."
              />
              <label htmlFor="">Category</label>
              <select name="cat" onChange={handleChange} id="Property">
                <option value="houses">Houses</option>
                <option value="land">Land</option>
                <option value="farm">Farm</option>
                <option value="fields">Field</option>
                <option value="free land">Free Land</option>
                <option value="hotels">Hotels</option>
                <option value="apartments">Apartments</option>
              </select>

              {/* <div className="images">
                <div className="imagesInputs">
                  <label htmlFor="">
                    {!uploading ? "Cover Image" : "Added Image"}
                  </label>
                  <input
                    type="file"
                    name="cover"
                    onChange={(e) => setSingleFile(e.target.files[0])}
                  />
                  <label htmlFor="">
                    {!uploading ? "Upload Images" : "Added Image"}
                  </label>
                  <input
                    type="file"
                    name="images"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                  />
                </div>
                <img src={result?.cover} alt="" />
                <button onChange={handleUpload}>
                  {!uploading ? "Upload" : "Uploading ..."}
                </button>
              </div> */}

              <label>Description</label>
              <textarea
                name="desc"
                value={result?.desc}
                onChange={handleChange}
                placeholder="Brief description to introduce your service to customers."
              />
              <button onClick={handleSubmit}>
                {handleSubmit && mutation.isError
                  ? "Updating ..."
                  : "Update Assets"}
              </button>
            </div>
            <div className="right">
              <label style={{ marginBottom: "10px" }}>Short Title</label>
              <input
                onChange={handleChange}
                type="text"
                value={result?.shortTitle}
                name="shortTitle"
                placeholder="One-age web design."
              />
              <label htmlFor="">Short Description</label>
              <textarea
                onChange={handleChange}
                name="shortDesc"
                value={result?.shortDesc}
                placeholder="Short description of your service."
              ></textarea>
              <label htmlFor="">Delivery Time</label>
              <input
                type="number"
                name="deliveryTime"
                value={result?.deliveryTime}
                min={1}
                onChange={handleChange}
              />
              <label htmlFor="">Price</label>
              <input
                type="number"
                name="price"
                value={result?.price}
                onChange={handleChange}
                min={1}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default UpdatePost;
