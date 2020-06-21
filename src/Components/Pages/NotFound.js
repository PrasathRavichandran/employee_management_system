import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <h2 className="display-1 mb-2 text-muted">\(o_o)/</h2>
        <h1 className="display-4">Page Not Found</h1>
        <p>
          Go to <Link to="/">Home Page</Link> to view employees details.
        </p>
      </div>
    );
  }
}

export default NotFound;
