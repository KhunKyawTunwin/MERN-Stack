import { useReducer, useState } from "react";
import "./Add.scss";
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducer";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

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
            <select name="cat" onChange={handleChange} id="web">
              <option value="design">Design</option>
              <option value="backend">Backend</option>
              <option value="frontend">Frontend</option>
              <option value="andriod">Andriod Dev</option>
              <option value="ios">Flutter Developer</option>
            </select>
            <label htmlFor="">Cover Image</label>
            <input type="file" />
            <label htmlFor="">Upload Images</label>
            <input type="file" multiple />
            <label>Description</label>
            <textarea
              name=""
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
            <input type="text" placeholder="Project page design" />
            <label htmlFor="">Price</label>
            <input type="number" name="price" onChange={handleChange} min={1} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Add;
