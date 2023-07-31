import axios from "axios";

const url = "http://localhost:5000/api";

export const newRequest = axios.create({
  baseURL: url,
  withCredentials: true,
});
