import { useReducer, useState } from "react";
import "./Add.scss";
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducer";
import upload from "../../utils/upload";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_FEATURE", payload: e.target[0].value });
    e.target[0].value = "";
  };

  const handleUpload = async (e) => {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
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
              <option value="design">Houses</option>
              <option value="backend">Land</option>
              <option value="frontend">Free Land</option>
              <option value="andriod">Hotels</option>
              <option value="ios">Apartments</option>
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
              <button>{uploading ? "Uploading" : "Upload"}</button>
            </div>
            <label>Short Description</label>
            <textarea
              name="desc"
              id=""
              cols="30"
              rows="10"
              placeholder="Brief description to introduce your service to customers."
            ></textarea>
            <button>Create</button>
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
              id=""
              cols="30"
              rows="10"
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
              name="revisionNumber"
              min={2}
              onChange={handleChange}
            />
            <label htmlFor="">Add Features</label>
            <form onSubmit={handleFeature} action="">
              <input type="text" placeholder="Project page design" />
              <button type="submit">Add</button>
            </form>
            <label htmlFor="">Price</label>
            <input type="number" name="price" onChange={handleChange} min={1} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Add;
