import axios from "axios";

let url = "http://localhost:8080/api/";

export const API = axios.create({
  baseURL: url
});
