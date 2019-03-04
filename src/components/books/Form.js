import React, { Component } from "react";
import Input from "../commons/Input";
import Button from "../commons/Button";
import services from "../../services";
import PubSub from "pubsub-js";
import FormFieldValidation from "../../Utils/FormFieldValidation";

export default class extends Component {
  constructor() {
    super();
    this.state = { titulo: "", preco: "", autorId: "" };

    //binding this to addBook function (boring)
    this.addBook = this.addBook.bind(this);
    this.clearForm = this.clearForm.bind(this);

    // boring to bind all these this to correspondent function
    // it is needed to access the this.state inside function
    // TODO: there is a better way to do this with a lib?
    this.setTitle = this.setTitle.bind(this);
    this.setAuthorId = this.setAuthorId.bind(this);
    this.setPrice = this.setPrice.bind(this);
  }

  addBook(event) {
    event.preventDefault();

    let book = {
      titulo: this.state.titulo,
      preco: this.state.preco,
      autorId: this.state.autorId
    };

    PubSub.publish("form-errors:clearErrorMsg");

    services
      .addBook(book)
      .then(({ data }) => {
        PubSub.publish("book:updateList", data);
        this.clearForm();
      })
      .catch(error => {
        let errorData = { error }.error.response.data;
        if (errorData.status === 400) {
          new FormFieldValidation().publishErrors(errorData.errors);
        }
      });
  }

  clearForm() {
    this.setState({ titulo: "" });
    this.setState({ preco: "" });
    this.setState({ autorId: "" });
  }

  setTitle(event) {
    this.setState({ titulo: event.target.value });
  }

  setPrice(event) {
    this.setState({ preco: event.target.value });
  }

  setAuthorId(event) {
    this.setState({ autorId: event.target.value });
  }

  render() {
    return (
      <form className="form" onSubmit={this.addBook} method="post">
        <Input
          label={"Título"}
          type={"text"}
          name={"titulo"}
          value={this.state.titulo}
          onChange={this.setTitle}
        />
        <Input
          label={"Preço"}
          type={"number"}
          name={"preco"}
          value={this.state.price}
          onChange={this.setPrice}
        />
        <select
          value={this.state.autorId}
          name="autorId"
          onChange={this.setAuthorId}
        >
          <option value="">Selecione</option>
          {this.props.authors.map(function(autor) {
            return (
              <option key={autor.id} value={autor.id}>
                {autor.nome}
              </option>
            );
          })}
        </select>
        <Button type={"submit"} label={"Gravar"} />
      </form>
    );
  }
}
