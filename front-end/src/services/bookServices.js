import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

axios.interceptors.request.use((config) => {
  config.headers.common["x-auth-token"] = `${localStorage.getItem("token")}`;
  return config;
});

export async function createNewBook(data) {
  const response = await axios.post(`${apiUrl}/books/newBook`, data);
  return response;
}

export async function getAllBooks() {
  const allBooks = await axios.get(`${apiUrl}/books/allBooks`);
  return allBooks;
}

export async function deleteBook(data) {
  const deletedUser = await axios.delete(`${apiUrl}/books/deleteBook`, {
    data,
  });
  return deletedUser;
}

export async function getOneBook(data) {
  const foundBook = await axios.post(`${apiUrl}/books/oneBook`, data);
  return foundBook;
}

export async function updateOneBook(data) {
  const updatingUser = await axios.put(`${apiUrl}/books/updateBook`, data);
  return updatingUser;
}
