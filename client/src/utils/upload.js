import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "Ethnic Property");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/khuncode/image/upload",
      data
    );
    const { secure_url } = res.data;
    return secure_url;
  } catch (err) {
    console.log(err);
  }
};

export default upload;
