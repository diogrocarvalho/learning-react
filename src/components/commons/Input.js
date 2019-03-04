import React, { Component } from "react";
import PubSub from "pubsub-js";

export default class Input extends Component {
  constructor() {
    super();
    this.state = { errorMsg: "" };
  }

  componentDidMount() {
    PubSub.subscribe(
      "formFieldValidation:thereIsError",
      function(event, error) {
        if (error.field === this.props.name) {
          this.setState({ errorMsg: error.defaultMessage });
        }
      }.bind(this)
    );
    PubSub.subscribe(
      "form-errors:clearErrorMsg",
      function(event) {
        this.setState({ errorMsg: "" });
      }.bind(this)
    );
  }

  render() {
    return (
      <div className="control">
        <label className="label">{this.props.label}</label>
        <input
          type={this.props.type}
          value={this.props.value}
          onChange={this.props.onChange}
        />
        <span>{this.state.errorMsg}</span>
      </div>
    );
  }
}
