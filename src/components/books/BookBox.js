import React, { Component } from "react";
import Header from "../commons/Header";
import PubSub from "pubsub-js";
import services from "../../services";
import List from "./List";
import Form from "./Form";

export default class InputComponent extends Component {
  constructor() {
    super();
    this.state = { books: [], authors: [] };
  }

  componentWillMount() {
    this.getBooks();
    this.getAuthors();

    PubSub.subscribe(
      "book:updateList",
      function(event, newList) {
        this.updateList(newList);
      }.bind(this)
    );
  }

  updateList(newList) {
    this.setState({ books: newList });
  }

  getBooks() {
    services.getBooks().then(({ data }) => {
      this.setState({ books: data });
    });
  }

  getAuthors() {
    services.getAuthors().then(({ data }) => {
      this.setState({ authors: data });
    });
  }

  render() {
    return (
      <div>
        <Header title={"Livros"} />
        <Form authors={this.state.authors} />
        <List books={this.state.books} />
      </div>
    );
  }
}
