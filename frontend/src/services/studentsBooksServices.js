import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

axios.interceptors.request.use((config) => {
  config.headers.common["x-auth-token"] = `${localStorage.getItem("token")}`;
  return config;
});

export async function getUserBooks() {
  const response = await axios.get(`${apiUrl}/students/books`);
  return response;
}
