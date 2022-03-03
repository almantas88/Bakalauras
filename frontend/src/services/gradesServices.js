import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

axios.interceptors.request.use((config) => {
  config.headers.common["x-auth-token"] = `${localStorage.getItem("token")}`;
  return config;
});

export async function getGrades() {
  const response = await axios.get(`${apiUrl}/grades/allGrades`);
  return response;
}

export async function createNewGrade(grade) {
  const response = await axios.post(`${apiUrl}/grades/newGrade`, { grade });
  return response;
}

export async function deleteGrade(id) {
  console.log(id);
  const response = await axios.delete(`${apiUrl}/grades/deleteGrade/${id}`);
  return response;
}
