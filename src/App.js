import React, { Component } from "react";
import "./App.scss";
import AuthorBox from "./components/authors/AuthorBox";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="left-menu" id="menu">
          <a href="#top">Home</a>
          <a href="#top">Autores</a>
          <a href="#top">Livros</a>
        </div>
        <div className="right-content" id="top">
          <div className="title">
            <h1>Home</h1>
          </div>
          <AuthorBox />
        </div>
      </div>
    );
  }
}

export default App;
