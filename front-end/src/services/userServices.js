import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

axios.interceptors.request.use((config) => {
  config.headers.common["x-auth-token"] = `${localStorage.getItem("token")}`;
  return config;
});

export async function createNewUser(data) {
  const response = await axios.post(`${apiUrl}/users/register`, data);
  return response;
}

export async function getAllUsers() {
  const allUsers = await axios.get(`${apiUrl}/users/allUsers`);
  return allUsers;
}

export async function deleteUser(data) {
  const deletedUser = await axios.delete(`${apiUrl}/users/deleteUser`, {
    data,
  });
  return deletedUser;
}

export async function getOneUser(data) {
  const foundUser = await axios.post(`${apiUrl}/users/oneUser`, data);
  return foundUser;
}

export async function updateOneUser(data) {
  const updatingUser = await axios.put(`${apiUrl}/users/updateUser`, data);
  return updatingUser;
}
