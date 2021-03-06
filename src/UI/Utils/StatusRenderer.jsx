import React, { Component } from "react";
import edit from "../../assets/edit.svg";
import deleteIcon from "../../assets/deleteIcon.svg";

export class ActionRenderer extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onEdit = () => {
    this.props.context.componentParent.handleEdit(this.props.node.data);
  };
  onDelete = () => {
    this.props.context.componentParent.handleDelete(this.props.node.data);
  };

  onRowClicked(event) {
    console.log("Row selected methord.....!!", event);
    console.log("Row selected methord (Obj).....!!", event.data);
    // this.props.history.push({ pathname: this.props.onRowClickPath, state:{id :event.data.id} })
  }
  render() {
    return (
      <>
        <a
          data-toggle="modal"
          data-target="#editModal"
          onClick={this.onEdit}
        >
          <img
            src={edit}
            style={{ width: "20px", cursor: "pointer" }}
            alt="delete"
          />
        </a>
        <a
          data-toggle="modal"
          data-target="#deleteModal"
          onClick={this.onDelete}
        >
          <img
            src={deleteIcon}
            style={{ width: "20px", cursor: "pointer", marginLeft: "10px" }}
            alt="delete"
          />
        </a>
      </>
    );
  }
}
