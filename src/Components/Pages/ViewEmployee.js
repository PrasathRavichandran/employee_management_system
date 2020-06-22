import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

class ViewEmployee extends Component {
  /** State */
  state = {
    employee: {},
  };

  /** Effects - life cycle */
  componentDidMount() {
    this.loadEmployee();
  }

  /** Methods */
  loadEmployee = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const result = await axios.get(`http://localhost:4000/Employees/${id}`);
    this.setState({ employee: result.data });
  };

  deleteEmployee = async (id) => {
    if (window.confirm("Are you sure to delete this employee?")) {
      await axios.delete(`http://localhost:4000/Employees/${id}`);
      this.props.history.push("/");
    } else {
      return;
    }
  };

  /** Render */
  render() {
    const paragraphStyle = {
      textTransform: "capitalize",
    };
    let skills = null,
      education = null;
      /** Rendering skills */
    if (this.state.employee.skills) {
      skills = (
        <React.Fragment>
          {this.state.employee.skills.map((skill, index) => {
            return (
              <span key={index} className="mr-2">
                {skill}
              </span>
            );
          })}
        </React.Fragment>
      );
    }
    /** Checking & Rendering education */
    if (this.state.employee.education) {
      education = (
        <React.Fragment>
          <p style={paragraphStyle}>
            <span className="h6">College: </span>
            {this.state.employee.education.college}
          </p>
          <p style={paragraphStyle}>
            <span className="h6">Rank: </span>
            {this.state.employee.education.ranks}
          </p>
          <p style={paragraphStyle}>
            <span className="h6">Score: </span>
            {this.state.employee.education.score}
          </p>
        </React.Fragment>
      );
    }

    return (
      <section className="viewEmployee" style={{overflow:'hidden'}}>
        <div className="row">
          <div className="col-md-9 m-auto">
            <div className="card card-body border-0 shadow p-5">
              <p className="h3" style={paragraphStyle}>
                {this.state.employee.firstName} {this.state.employee.lastName}
              </p>

              {/* personal information */}
              <div className="personal-info mt-3">
                <p className="h6 text-muted">Personal Information</p>
                <hr />
                <p style={paragraphStyle}>
                  <span className="h6">FirstName: </span>
                  {this.state.employee.firstName}
                </p>
                <p style={paragraphStyle}>
                  <span className="h6">LastName: </span>
                  {this.state.employee.lastName}
                </p>
                <p style={paragraphStyle}>
                  <span className="h6">Email Address: </span>
                  {this.state.employee.emailAddress}
                </p>
                <p style={paragraphStyle}>
                  <span className="h6">Phone Number: </span>
                  {this.state.employee.phoneNumber}
                </p>
              </div>

              {/* Education qualification */}
              <div className="Education-info mt-3">
                <p className="h6 text-muted">Education</p>
                <hr />
                {education}
              </div>

              {/* Job Description */}
              <div className="Education-info mt-3">
                <p className="h6 text-muted">Job Description</p>
                <hr />
                <p style={paragraphStyle}>
                  <span className="h6">Employee Code: </span>
                  {this.state.employee.employeeCode}
                </p>
                <p style={paragraphStyle}>
                  <span className="h6">Job Title: </span>
                  {this.state.employee.jobTitleName}
                </p>
                <p style={paragraphStyle}>
                  <span className="h6">Skills: </span>
                  {skills}
                </p>
              </div>

              {/* Actions */}
              <div className="d-flex my-3">
                <Link
                  to={`/edit/employee/${this.state.employee.id}`}
                  className="btn btn-warning mr-3"
                >
                  Edit employee
                </Link>
                <button
                  className="btn btn-danger mr-3"
                  onClick={() => this.deleteEmployee(this.state.employee.id)}
                >
                  Delete employee
                </button>
                <Link to="/" className="btn btn-info">
                  Back
                </Link>
              </div>

            </div>
            {/* End of card */}
            
          </div>
        </div>
      </section>
    );
  }
}

export default ViewEmployee;
