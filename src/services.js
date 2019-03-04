import { API } from "./api";

const getAuthors = () => {
  return API.get("autores");
};

const addAuthor = author => {
  return API.post("autores", author);
};
const getBooks = () => {
  return API.get("livros");
};

const addBook = book => {
  return API.post("livros", book);
};

export default {
  getAuthors,
  addAuthor,
  getBooks,
  addBook
};
