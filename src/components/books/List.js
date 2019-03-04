import React, { Component } from "react";

export default class extends Component {
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Preço</th>
            <th>Autor</th>
          </tr>
        </thead>
        <tbody>
          {this.props.books.map(book => {
            return (
              <tr key={book.id}>
                <td>{book.titulo}</td>
                <td>{book.preco}</td>
                <td>{book.autor.nome}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
