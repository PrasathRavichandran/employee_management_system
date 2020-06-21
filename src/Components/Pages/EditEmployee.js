import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

/** Regular expression for email, number */
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const phoneRegex = RegExp(/^\d+$/);
const floatRegex = RegExp(/^[+-]?\d+(\.\d+)?$/);

/** formValid method to check the invalid and empty fields before submit */
const formValid = ({ formErrors, ...args }) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => val.length > 0 && (valid = false));

  Object.values(args).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class EditEmployee extends Component {
  /** State */
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    college: "",
    rank: "",
    score: "",
    jobTitleName: "",
    employeeCode: "",
    skills: [],
    formErrors: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      college: "",
      rank: "",
      score: "",
      employeeCode: "",
      skills: "",
    },
    errorMessage: "",
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

    const { data } = await axios.get(`http://localhost:4000/Employees/${id}`);
    this.setState({
      firstName: data.firstName,
      lastName: data.lastName,
      emailAddress: data.emailAddress,
      phoneNumber: data.phoneNumber,
      college: data.education.college,
      rank: data.education.ranks,
      score: data.education.score,
      jobTitleName: data.jobTitleName,
      employeeCode: data.employeeCode,
      skills: [...data.skills],
    });
  };

  /** Input hander method and checking form validation */
  handleInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 4 ? "Minimum 4 characters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 4 ? "Minimum 4 characters required" : "";
        break;
      case "emailAddress":
        formErrors.emailAddress = emailRegex.test(value)
          ? ""
          : "Invalid Email address";
        break;
      case "phoneNumber":
        formErrors.phoneNumber = phoneRegex.test(value)
          ? ""
          : "Phone number should not be a character";
        break;
      case "college":
        formErrors.college = value.length < 6 ? "Minimum of 6 characters" : "";
        break;
      case "rank":
        formErrors.rank = floatRegex.test(value)
          ? ""
          : "Rank should be a number not a character";
        break;
      case "score":
        formErrors.score = floatRegex.test(value)
          ? ""
          : "Score should be a number not a character";
        break;
      case "employeeCode":
        formErrors.employeeCode =
          value.length < 2 ? "Minimum of 2 characters" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [event.target.name]: event.target.value });
  };

  /** Dynamically add/remove skills methods */
  handleSkills(e, index) {
    let skills = [...this.state.skills];
    skills[index] = e.target.value;
    this.setState({ skills });
  }

  addSkills = (event) => {
    this.setState({ skills: [...this.state.skills, ""] });
  };

  removeSkills(index) {
    this.state.skills.splice(index, 1);
    this.setState({ skills: this.state.skills });
  }

  /** edit employee by id method */
  onEditEmployee = async (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
      const {
        match: {
          params: { id },
        },
      } = this.props;
      const data = {
        employeeCode: this.state.employeeCode,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        jobTitleName: this.state.jobTitleName,
        phoneNumber: this.state.phoneNumber,
        emailAddress: this.state.emailAddress,
        skills: this.state.skills,
        education: {
          college: this.state.college,
          ranks: this.state.rank,
          score: this.state.score,
        },
      };
      await axios.put(`http://localhost:4000/Employees/${id}`, data);
      this.props.history.push("/");
    } else {
      this.setState({
        errorMessage: "Form is Invalid. Please check the form before submit.",
      });
    }
  };

  /** render */
  render() {
    const { formErrors } = this.state;
    return (
      <section className="editEmployee">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">

              {/* card section start */}
              <div className="card card-body shadow border-0 p-4">
                <h2 className="text-center my-3">Edit Employee</h2>
                <form onSubmit={this.onEditEmployee}>

                  {/* Personal information */}
                  <div className="mb-5">
                    <p className="h4">Personal Information</p>
                    <hr />
                    <div className="form-group">
                      <label>Firstname</label>
                      <input
                        type="text"
                        className={
                          formErrors.firstName.length > 0
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.handleInput}
                      />
                      {formErrors.firstName.length > 0 && (
                        <small className="text-small text-danger">
                          {formErrors.firstName}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Lastname</label>
                      <input
                        type="text"
                        className={
                          formErrors.lastName.length > 0
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.handleInput}
                      />
                      {formErrors.lastName.length > 0 && (
                        <small className="text-small text-danger">
                          {formErrors.lastName}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        className={
                          formErrors.emailAddress.length > 0
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        name="emailAddress"
                        value={this.state.emailAddress}
                        onChange={this.handleInput}
                      />
                      {formErrors.emailAddress.length > 0 && (
                        <small className="text-small text-danger">
                          {formErrors.emailAddress}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Contact number</label>
                      <input
                        type="text"
                        className={
                          formErrors.phoneNumber.length > 0
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        name="phoneNumber"
                        value={this.state.phoneNumber}
                        onChange={this.handleInput}
                      />
                      {formErrors.phoneNumber.length > 0 && (
                        <small className="text-small text-danger">
                          {formErrors.phoneNumber}
                        </small>
                      )}
                    </div>
                  </div>

                  {/* Education information */}
                  <div className="mb-5">
                    <p className="h4">Education</p>
                    <hr />
                    <div className="form-group">
                      <label>College</label>
                      <input
                        type="text"
                        className={
                          formErrors.college.length > 0
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        name="college"
                        value={this.state.college}
                        onChange={this.handleInput}
                      />
                      {formErrors.college.length > 0 && (
                        <small className="text-small text-danger">
                          {formErrors.college}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Rank</label>
                      <input
                        type="text"
                        className={
                          formErrors.rank.length > 0
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        name="rank"
                        value={this.state.rank}
                        onChange={this.handleInput}
                      />
                      {formErrors.rank.length > 0 && (
                        <small className="text-small text-danger">
                          {formErrors.rank}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Score</label>
                      <input
                        type="text"
                        className={
                          formErrors.score.length > 0
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        name="score"
                        value={this.state.score}
                        onChange={this.handleInput}
                      />
                      {formErrors.score.length > 0 && (
                        <small className="text-small text-danger">
                          {formErrors.score}
                        </small>
                      )}
                    </div>
                  </div>

                  {/* Job description */}
                  <div className="mb-5">
                    <p className="h4">Job Description</p>
                    <hr />
                    <div className="form-group">
                      <label>Employee Code</label>
                      <input
                        type="text"
                        className={
                          formErrors.employeeCode.length > 0
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        name="employeeCode"
                        value={this.state.employeeCode}
                        onChange={this.handleInput}
                      />
                      {formErrors.employeeCode.length > 0 && (
                        <small className="text-small text-danger">
                          {formErrors.employeeCode}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Job title</label>
                      <select
                        className="custom-select"
                        name="jobTitleName"
                        onChange={this.handleInput}
                        value={this.state.jobTitleName}
                      >
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="Tester">Tester</option>
                      </select>
                    </div>

                    {/* Skills section */}
                    <div className="form-group">
                      <label>Skills</label>
                      {this.state.skills.map((skill, index) => {
                        return (
                          <div className="row mb-2" key={index}>
                            <div className="col-md-8">
                              <input
                                className="form-control"
                                value={skill}
                                onChange={(e) => this.handleSkills(e, index)}
                              />
                            </div>
                            <div className="col-md-2">
                              <button
                                className="btn btn-danger"
                                onClick={(e) => this.removeSkills(index)}
                                type="button"
                              >
                                X
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <button
                      className="btn btn-success btn-sm"
                      type="button"
                      onClick={this.addSkills}
                    >
                      Add Skills
                    </button>
                  </div>

                  <div>
                    <button className="btn btn-warning mr-2" type="submit">
                      Update
                    </button>
                    <Link to="/" className="btn btn-danger">
                      Cancel
                    </Link>
                  </div>
                  <small className="text-danger mt-2 text-center">
                    {this.state.errorMessage}
                  </small>
                </form>
              </div>
              {/* End of card section */}

            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default EditEmployee;
