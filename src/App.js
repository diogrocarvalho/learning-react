import React, { Component } from "react";
import "./App.scss";
import { Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="left-menu" id="menu">
          <Link to="/">Home</Link>
          <Link to="/authors">Autores</Link>
          <Link to="/books">Livros</Link>
        </div>
        <div className="right-content" id="top">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
