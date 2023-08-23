import "./Add.scss";

import { useReducer, useState } from "react";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newRequest } from "../../api/url";
import { useNavigate } from "react-router-dom";
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducer";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutation.mutateAsync(state);
    navigate("/mygigs");
  };

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_FEATURES", payload: e.target[0].value });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err.stack);
    }
  };

  return (
    <div className="newAdd">
      <div className="addContainer">
        <h1>Add New Gig</h1>
        <div className="sections_add">
          <div className="left">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
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
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "Uploading ..." : "Upload"}
              </button>
            </div>
            <label>Description</label>
            <textarea
              name="desc"
              onChange={handleChange}
              placeholder="Brief description to introduce your service to customers."
            />
            <button onClick={handleSubmit}>
              {handleSubmit && mutation.isError
                ? "Creating ..."
                : "Create Assets"}
            </button>
          </div>

          <div className="right">
            <label style={{ marginBottom: "10px" }}>Service Title</label>
            <input
              onChange={handleChange}
              type="text"
              name="shortTitle"
              placeholder="One-age web design."
            />
            <label htmlFor="">Short Description</label>
            <textarea
              onChange={handleChange}
              name="shortDesc"
              placeholder="Short description of your service."
            ></textarea>
            <label htmlFor="">Delivery Time</label>
            <input
              type="number"
              name="deliveryTime"
              min={1}
              onChange={handleChange}
            />
            <label htmlFor="">Country Code</label>
            <input
              type="number"
              name="revision555Number"
              min={2}
              onChange={handleChange}
            />
            <label htmlFor="">Add Features</label>
            <form className="add" onSubmit={handleFeature} action="">
              <input type="text" placeholder="Project page design" />
              <button type="submit">Add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((feature) => (
                <div className="item" key={feature}>
                  <button onClick={() => dispatch(removeFeature)}>
                    {feature} <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Price</label>
            <input type="number" name="price" onChange={handleChange} min={1} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Add;
