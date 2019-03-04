import React, { Component } from "react";

export default class extends Component {
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {this.props.authors.map(author => {
            return (
              <tr key={author.id}>
                <td>{author.nome}</td>
                <td>{author.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
