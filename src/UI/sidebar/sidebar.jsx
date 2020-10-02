import React from "react";
import { withRouter, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import caret from "../../assets/caret.svg";
import {
  COUNTRY_URL,
  DEPARTMENT_URL,
  LEAVE_TYPE_URL,
  LEAVENTITLEMENT_URL,
  PUBLICHOLIDAYS_URL,
} from "../../constants/urls";

let test = ["Dashboard", "Leave Report", "Leave Approval", "Employee Mgmnt."];

export default class Sidebar extends React.Component {
  onDropdownClick = () => {
    let dropdownCaret = document.getElementsByClassName("masterscaret");
    dropdownCaret[0].style.transitionDuration = "0.5s";
    if (dropdownCaret[0].style.transform === "rotate(180deg)") {
      dropdownCaret[0].style.transform = "rotate(0deg)";
    } else {
      dropdownCaret[0].style.transform = "rotate(180deg)";
    }
    let dropdownContent = document.getElementsByClassName("dropdown-container");
    if (dropdownContent[0].style.display === "block") {
      dropdownContent[0].style.display = "none";
    } else {
      dropdownContent[0].style.display = "block";
    }
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
              className="masterscaret float-right"
              src={caret}
              style={{ width: "20px" }}
              alt="logo"
            />
          </a>
          <div className="dropdown-container sider-list">
            <Link to={DEPARTMENT_URL}>Department</Link>
            <Link to={LEAVE_TYPE_URL}>Leave type</Link>
            <Link to={COUNTRY_URL}>Country</Link>
            <Link to={PUBLICHOLIDAYS_URL}>Public holidays</Link>
            <Link to={LEAVENTITLEMENT_URL}>Leave Entitlement</Link>
          </div>
        </div>
      </div>
    );
  }
}
