import React, { Component } from "react";

import axios from "axios";
class ViewJson extends Component {
  /** State */
  state = {
    employees: null,
  };

  /** Effects */

  componentDidMount() {
    this.loadJson();
  }

  /** Methods */
  loadJson = async () => {
    const result = await axios.get("http://localhost:4000/Employees");
    const convertToJSON = JSON.stringify(result.data);
    this.setState({ employees: convertToJSON });
  };

  /** render */
  render() {
    return (
      <section className="container">
        <div className="row">
          <div className="col-md-10 m-auto">
            <div className="card card-body border-0 shadow p-5">
              <h5 className="card-title">JSON Data</h5>
              <hr />
              <p className="card-text">{this.state.employees}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ViewJson;
