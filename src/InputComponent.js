import React, { Component } from "react";

export default class InputComponent extends Component{
  render(){
    return(
        <div className="control">
          <label className="label">{this.props.label}</label>
          <input
              type={this.props.type}
              value={this.props.value}
              onChange={this.props.onChange}
          />
        </div>
    )
  }
}
