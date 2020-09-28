import React from "react";
import { withRouter, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import caret from "../../assets/caret.svg";
import {
  COUNTRY_URL,
  DEPARTMENT_URL,
  LEAVE_TYPE_URL,
  LEVEL_URL,
  PUBLICHOLIDAYS_URL,
} from "../../constants/urls";

let test = ["Dashboard", "Leave Report", "Leave Approval", "Employee Mgmnt."];

export default class Sidebar extends React.Component {
  onDropdownClick = () => {
    let dropdownContent = document.getElementsByClassName("dropdown-container");
    if (dropdownContent[0].style.display === "block") {
      dropdownContent[0].style.display = "none";
    } else {
      dropdownContent[0].style.display = "block";
    }
    console.log(dropdownContent[0].style);
  };

  render() {
    return (
      <div className="sidebar" id="Sidebar">
        <img
          src={logo}
          style={{ width: "200px", padding: "15px" }}
          alt="logo"
        />
        <div style={{ marginTop: "50px" }}>
          {test.map((item) => (
            <a className="sider-list">
              <span className="menu-title"> {item} </span>
            </a>
          ))}
          <a className="sider-list" onClick={this.onDropdownClick}>
            Masters
            <img
              src={caret}
              style={{ width: "20px", marginLeft: "50px" }}
              alt="logo"
            />
          </a>
          <div className="dropdown-container sider-list">
            <Link to={PUBLICHOLIDAYS_URL}>Public holidays</Link>
            <Link to={DEPARTMENT_URL}>Department</Link>
            <Link to={LEAVE_TYPE_URL}>Leave type</Link>
            <Link to={LEVEL_URL}>Level</Link>
            <Link to={COUNTRY_URL}>Country</Link>
          </div>
        </div>
      </div>
    );
  }
}
