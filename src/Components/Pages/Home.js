import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
class Home extends Component {
  /** State */
  state = {
    employees: [],
  };

  /** Effects - life cycle */
  componentDidMount() {
    this.loadEmployees();
  }

  /** Methods */
  loadEmployees = async () => {
    const result = await axios.get("http://localhost:4000/Employees");
    this.setState({ employees: result.data });
  };

  /** render */
  render() {
    return (
      <div className="container">
      <section className="homePage">
        <h5 className="mb-3">List of employees</h5>

        {/* tables */}
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="thead-light">
              <tr>
                <th>S.no</th>
                <th>Employee Id</th>
                <th>Full name</th>
                <th>Job title</th>
                <th>Email address</th>
                <th>Phone number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Rendering employee details */}
              {this.state.employees.map((employee, index) => (
                <tr key={employee.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{employee.employeeCode}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.jobTitleName}</td>
                  <td>{employee.emailAddress}</td>
                  <td>{employee.phoneNumber}</td>
                  <td>
                    <Link
                      to={`/view/employee/${employee.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      </div>
    );
  }
}

export default Home;
