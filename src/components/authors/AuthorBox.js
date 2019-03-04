import React, { Component } from "react";
import Form from "./Form";
import List from "./List";
import Header from "../commons/Header";
import services from "../../services";
import PubSub from "pubsub-js";

export default class extends Component {
  constructor() {
    super();
    this.state = { authors: [] };
  }

  componentWillMount() {
    this.getAuthors();
    PubSub.subscribe(
      "author:updateList",
      function(event, newList) {
        this.updateList(newList);
      }.bind(this)
    );
  }

  updateList(newList) {
    this.setState({ authors: newList });
  }

  getAuthors() {
    services.getAuthors().then(({ data }) => {
      this.setState({ authors: data });
    });
  }

  render() {
    return (
      <div>
        <Header title={"Autores"}/>
        <Form />
        <List authors={this.state.authors} />
      </div>
    );
  }
}
