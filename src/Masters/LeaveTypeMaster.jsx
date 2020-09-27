import React, { useState } from "react";
import { ActionRenderer } from "../UI/Utils/StatusRenderer";
import AgGrid from "../Components/AgGridWrapper";
import { LeaveTypeMasterColumnDefs } from "../constants/columnMetadata";
import { Button, Form } from "react-bootstrap";
import ModalWrapper from "../Components/ModalWrapper";
import {
  PostAPICall,
  DeleteAPICall,
  GetAPICall,
} from "../Dataservice/dataservice";
import {
  DELETE_LEAVETYPE,
  GET_LEAVETYPE,
  POST_LEAVETYPE,
} from "../constants/urls";

const frameworkComponents = {
  statusRenderer: ActionRenderer,
};

export default class LeaveTypeMaster extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showDeleteModal: false,
      showEditModal: false,
      rowData: [],
      name: "",
      description: "",
      edited_name: "",
      edited_description: "",
      context: { componentParent: this },
      deleteID: "",
      objEditable: {},
    };
    this.formChange = this.formChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
    this.onEditConfirm = this.onEditConfirm.bind(this);
  }
  async componentDidMount() {
    this.getLeaveType();
  }
  async getLeaveType() {
    let result = await GetAPICall(GET_LEAVETYPE);
    console.log(result, "LEAVE master");
    this.setState({ rowData: result.result.items });
  }
  formChange(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value });
    console.log(this.state);
  }
  async handleSubmit(e) {
    e.preventDefault();
    let formdata = {
      name: this.state.name,
      description: this.state.description,
    };
    let result = await PostAPICall(POST_LEAVETYPE, formdata);
    console.log(result);
    if (result.success === true) {
      alert("Addition Successfull");
      this.setState({ showModal: false });
      this.getLeaveType();
    } else {
      alert("Something went wrong");
    }
  }
  handleDelete(value) {
    this.setState({
      showDeleteModal: true,
      deleteID: value.id,
    });
  }
  async onDeleteConfirm() {
    console.log(this.state.deleteID);
    let result = await DeleteAPICall(DELETE_LEAVETYPE, this.state.deleteID);
    console.log(result);
    if (result.success === true) {
      alert("Deleted Successfully");
      this.setState({ showDeleteModal: false });
      this.getLeaveType();
    } else {
      alert("Something went wrong");
    }
  }

  handleEdit(value) {
    this.setState({
      objEditable: value,
      showEditModal: true,
      edited_name: value.name,
      edited_description: value.description,
    });
  }
  async onEditConfirm(e) {
    e.preventDefault();
    console.log(this.state);
    let payload = {
      name: this.state.edited_name,
      description: this.state.edited_description,
      id: this.state.objEditable.id,
    };
    let result = await PostAPICall(POST_LEAVETYPE, payload);
    console.log(result);
    if (result.success === true) {
      alert("Edited Successfully");
      this.setState({ showEditModal: false });
      this.getLeaveType();
    } else {
      alert("Something went wrong");
    }
  }

  render() {
    return (
      <div>
        <div className="page-heading">
          <h3>Leave Type Master</h3>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => this.setState({ showModal: true })}
          >
            New
          </button>
        </div>
        <ModalWrapper
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
          ModalTitle="Add New Leave Type"
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formLeaveType">
              <Form.Label>Leave Type</Form.Label>
              <Form.Control
                onChange={this.formChange}
                type="text"
                name="name"
                placeholder="Enter leave type"
              />
            </Form.Group>
            <Form.Group controlId="formUniqueID">
              <Form.Label>Description</Form.Label>
              <Form.Control
                onChange={this.formChange}
                as="textarea"
                rows="3"
                name="description"
                placeholder="Enter description"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </ModalWrapper>
        <ModalWrapper
          show={this.state.showDeleteModal}
          onHide={() => this.setState({ showDeleteModal: false })}
          ModalTitle="Delete item?"
          size="sm"
        >
          <div className="justify-content-between">
            <Button
              variant="secondary"
              onClick={() => this.setState({ showDeleteModal: false })}
            >
              No
            </Button>
            <Button
              variant="primary"
              className="float-right"
              onClick={this.onDeleteConfirm}
            >
              Yes
            </Button>
          </div>
        </ModalWrapper>
        <ModalWrapper
          show={this.state.showEditModal}
          onHide={() => this.setState({ showEditModal: false })}
          ModalTitle="Edit Leave Type"
        >
          <Form onSubmit={this.onEditConfirm}>
            <Form.Group controlId="formDepartmentName">
              <Form.Label>Leave Type</Form.Label>
              <Form.Control
                onChange={this.formChange}
                type="text"
                defaultValue={this.state.objEditable.name}
                name="edited_name"
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group controlId="formUniqueID">
              <Form.Label>Description</Form.Label>
              <Form.Control
                onChange={this.formChange}
                as="textarea"
                defaultValue={this.state.objEditable.description}
                rows="3"
                name="edited_description"
                placeholder="Enter description"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </ModalWrapper>
        <hr></hr>
        <AgGrid
          pagination={true}
          context={this.state.context}
          columnDefs={LeaveTypeMasterColumnDefs}
          rowData={this.state.rowData}
          suppressCellSelection={true}
          onGridReady={this.onGridReady}
          frameworkComponents={frameworkComponents}
        ></AgGrid>
      </div>
    );
  }
}
