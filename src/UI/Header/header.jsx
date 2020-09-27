import React from "react";
import { withRouter } from "react-router-dom";
import logout from "../../assets/logout.svg";

class Header extends React.Component {
  render() {
    return (
      <div className="App-header">
        <h2 className="app-title">AG Administrator</h2>
        <button type="button" className="btn btn-link App-link">
          <img src={logout} alt="logout Logo" className="p-1" /> Logout
        </button>
      </div>
    );
  }
}
export default withRouter(Header);
