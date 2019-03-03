import { API } from "./api";

const getAuthors = () => {
  return API.get("autores");
};

const addAuthor = author => {
  return API.post("autores", author);
};

export default {
  getAuthors,
  addAuthor
};
