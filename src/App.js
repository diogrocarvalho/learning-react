import React, { Component } from "react";
import "./App.scss";
import services from "./services";
import InputComponent from "./InputComponent";

class App extends Component {
  constructor() {
    super();
    this.state = { authors: [], nome: "", email: "", senha: "" };

    //binding this to addAuthor function (boring)
    this.addAuthor = this.addAuthor.bind(this);

    // boring to bind all these this to correspondent function
    // it is needed to access the this.state inside function
    // TODO: there is a better way to do this with a lib?
    this.setName = this.setName.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  componentWillMount() {
    this.getAuthors();
  }

  getAuthors() {
    services.getAuthors().then(({ data }) => {
      this.setState({ authors: data });
    });
  }

  addAuthor(event) {
    event.preventDefault();

    let author = {
      nome: this.state.nome,
      email: this.state.email,
      senha: this.state.senha
    };

    services
      .addAuthor(author)
      .then(({ data }) => this.setState({ authors: data }))
      .catch(error => {
        console.log(error);
      });
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
      <div className="App">
        <div className="left-menu" id="menu">
          <a href="#menu">Home</a>
          <a href="#menu">Autores</a>
          <a href="#menu">Livros</a>
        </div>
        <div className="right-content">
          <div className="title">
            <h1>Home</h1>
          </div>
          <form className="form" onSubmit={this.addAuthor} method="post">
            <InputComponent label={"Nome"} type={"text"} value={this.state.name} onChange={this.setName}/>
            <InputComponent label={"Email"} type={"email"} value={this.state.email} onChange={this.setEmail}/>
            <InputComponent label={"Senha"} type={"password"} value={this.state.senha} onChange={this.setPassword}/>
            <div>
              <button className="btn" type="submit">
                Gravar
              </button>
            </div>
          </form>
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
              </tr>
            </thead>
            <tbody>
              {this.state.authors.map(author => {
                return (
                  <tr key={author.id}>
                    <td>{author.nome}</td>
                    <td>{author.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
