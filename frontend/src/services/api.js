import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:8080"
// });

const API = axios.create({
  baseURL: "https://ai-powered-expense-tracker-production.up.railway.app"
});

API.interceptors.request.use((config) => {

  const token =
    localStorage.getItem(
      "token"
    );

  if(token){

    config.headers.Authorization =
      `Bearer ${token}`;

  }

  return config;

});

export default API;

