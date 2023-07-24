import "./Add.scss";

const Add = () => {
  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="left">
            <label htmlFor="">Title</label>
            <input type="text" placeholder="I'm full-stack Webdeveloper." />
            <label htmlFor="">Category</label>
            <select name="web" id="web">
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
            <input type="text" placeholder="One-age web design." />
            <label htmlFor="">Short Description</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Short description of your service."
            ></textarea>
            <label htmlFor="">Delivery Time</label>
            <input type="number" min={1} />
            <label htmlFor="">Country Code</label>
            <input type="number" min={2} />
            <label htmlFor="">Add Features</label>
            <input type="text" placeholder="Project page design" />
            <input type="text" placeholder="Project file uploading" />
            <input type="text" placeholder="Project details usefull words." />
            <label htmlFor="">Price</label>
            <input type="number" min={1} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Add;
