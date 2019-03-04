import React, { Component } from "react";

export default class InputComponent extends Component {
  render() {
    return (
      <div className="header">
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}
