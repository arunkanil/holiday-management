import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";
import {
  COUNTRY_URL,
  DEPARTMENT_URL,
  LEAVE_TYPE_URL,
  LEVEL_URL,
} from "./constants/urls";
import Dashboard from "./Dashboard/dashboard";
import Header from "./UI/Header/header";
import CountryMaster from "./Masters/CountryMaster";
import departmentMaster from "./Masters/DepartmentMaster";
import LeaveTypeMaster from "./Masters/LeaveTypeMaster";
import LevelMaster from "./Masters/LevelMaster";
import Sidebar from "./UI/sidebar/sidebar";

class App extends React.Component {
  render() {
    axios.defaults.baseURL = "http://localhost:21021/";
    return (
      <Router>
        <Sidebar />
        <Header />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path={DEPARTMENT_URL} component={departmentMaster} />
            <Route path={LEAVE_TYPE_URL} component={LeaveTypeMaster} />
            <Route path={LEVEL_URL} component={LevelMaster} />
            <Route path={COUNTRY_URL} component={CountryMaster} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
