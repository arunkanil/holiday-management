import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";
import {
  COUNTRY_URL,
  DEPARTMENT_URL,
  LEAVE_TYPE_URL,
  LEAVENTITLEMENT_URL,
  PUBLICHOLIDAYS_URL,
  EMPLOYEE_MANAGEMENT_URL,
} from "./constants/urls";
import Dashboard from "./Dashboard/dashboard";
import Header from "./UI/Header/header";
import CountryMaster from "./Masters/CountryMaster";
import departmentMaster from "./Masters/DepartmentMaster";
import LeaveTypeMaster from "./Masters/LeaveTypeMaster";
import LeaveEntitlementMaster from "./Masters/LeaveEntitlementMaster";
import Sidebar from "./UI/sidebar/sidebar";
import PublicHolidayMaster from "./Masters/PublicHolidayMaster";
import EmployeeManagement from "./EmpManagement/EmployeeManagement";

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
            <Route path={PUBLICHOLIDAYS_URL} component={PublicHolidayMaster} />
            <Route path={LEAVE_TYPE_URL} component={LeaveTypeMaster} />
            <Route
              path={LEAVENTITLEMENT_URL}
              component={LeaveEntitlementMaster}
            />
            <Route path={COUNTRY_URL} component={CountryMaster} />
            <Route path={EMPLOYEE_MANAGEMENT_URL} component={EmployeeManagement} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
