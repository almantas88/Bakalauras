import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

axios.interceptors.request.use((config) => {
  config.headers.common["x-auth-token"] = `${localStorage.getItem("token")}`;
  return config;
});

export async function retrieveCurrentUserBooks(cardID) {
  const response = await axios.post(`${apiUrl}/users/oneUserWithAllBooks`, {cardID});
  return response;
}

export async function giveOutBooks(data) {
    const response = await axios.post(`${apiUrl}/booksmanagement/giveout`, data);
    return response;
  }

export async function returnBooks(data) {
    const response = await axios.post(`${apiUrl}/booksmanagement/return`, data);
    return response;
  }
