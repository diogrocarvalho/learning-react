import React, { Component } from "react";

export default class InputComponent extends Component {
  render() {
    return (
      <div className="control text-right">
        <button className="btn" type="submit">
          {this.props.label}
        </button>
      </div>
    );
  }
}
