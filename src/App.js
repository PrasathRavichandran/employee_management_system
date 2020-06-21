import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

/** components */
import Header from "./Components/Layouts/Header";
import Home from "./Components/Pages/Home";
import AddEmployee from "./Components/Pages/AddEmployee";
import NotFound from "./Components/Pages/NotFound";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* Header component */}
          <Header />

          {/* Router outlets */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/add/employee" component={AddEmployee} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
