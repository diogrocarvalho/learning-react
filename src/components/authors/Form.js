import React, { Component } from "react";
import Input from "../commons/Input";
import Button from "../commons/Button";
import services from "../../services";
import PubSub from "pubsub-js";
import FormFieldValidation from "../../Utils/FormFieldValidation";

export default class extends Component {
  constructor() {
    super();
    this.state = { nome: "", email: "", senha: "" };

    //binding this to addAuthor function (boring)
    this.addAuthor = this.addAuthor.bind(this);
    this.clearForm = this.clearForm.bind(this);

    // boring to bind all these this to correspondent function
    // it is needed to access the this.state inside function
    // TODO: there is a better way to do this with a lib?
    this.setName = this.setName.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  addAuthor(event) {
    event.preventDefault();

    let author = {
      nome: this.state.nome,
      email: this.state.email,
      senha: this.state.senha
    };

    PubSub.publish("form-errors:clearErrorMsg");

    services
      .addAuthor(author)
      .then(({ data }) => {
        PubSub.publish("author:updateList", data);
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
    this.setState({ nome: "" });
    this.setState({ email: "" });
    this.setState({ senha: "" });
  }

  setName(event) {
    this.setState({ nome: event.target.value });
  }

  setEmail(event) {
    this.setState({ email: event.target.value });
  }

  setPassword(event) {
    this.setState({ senha: event.target.value });
  }

  render() {
    return (
      <form className="form" onSubmit={this.addAuthor} method="post">
        <Input
          label={"Nome"}
          type={"text"}
          name={"nome"}
          value={this.state.nome}
          onChange={this.setName}
        />
        <Input
          label={"Email"}
          type={"email"}
          name={"email"}
          value={this.state.email}
          onChange={this.setEmail}
        />
        <Input
          label={"Senha"}
          type={"password"}
          name={"senha"}
          value={this.state.senha}
          onChange={this.setPassword}
        />
        <Button type={"submit"} label={"Gravar"} />
      </form>
    );
  }
}
