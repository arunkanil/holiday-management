import React, { useState } from "react";
import { ActionRenderer } from "../UI/Utils/StatusRenderer";
import AgGrid from "../Components/AgGridWrapper";
import { CountryMasterColumnDefs } from "../constants/columnMetadata";
import { Button, Form } from "react-bootstrap";
import ModalWrapper from "../Components/ModalWrapper";
import {
  PostAPICall,
  DeleteAPICall,
  GetAPICall,
} from "../Dataservice/dataservice";
import { DELETE_COUNTRY, GET_COUNTRY, POST_COUNTRY } from "../constants/urls";

const frameworkComponents = {
  statusRenderer: ActionRenderer,
};

export default class CountryMaster extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showDeleteModal: false,
      showEditModal: false,
      rowData: [],
      name: "",
      code: "",
      edited_name: "",
      edited_code: "",
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
    this.getCountry();
  }
  async getCountry() {
    let result = await GetAPICall(GET_COUNTRY);
    console.log(result, "country master");
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
      code: this.state.code,
    };
    let result = await PostAPICall(POST_COUNTRY, formdata);
    console.log(result);
    if (result.success === true) {
      alert("Addition Successfull");
      this.setState({ showModal: false });
      this.getCountry();
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
    let result = await DeleteAPICall(DELETE_COUNTRY, this.state.deleteID);
    console.log(result);
    if (result.success === true) {
      alert("Deleted Successfully");
      this.setState({ showDeleteModal: false });
      this.getCountry();
    } else {
      alert("Something went wrong");
    }
  }
  handleEdit(value) {
    this.setState({
      objEditable: value,
      showEditModal: true,
      edited_name: value.name,
      edited_code: value.code,
    });
  }
  async onEditConfirm(e) {
    e.preventDefault();
    console.log(this.state);
    let payload = {
      name: this.state.edited_name,
      code: this.state.edited_code,
      id: this.state.objEditable.id,
    };
    let result = await PostAPICall(POST_COUNTRY, payload);
    console.log(result);
    if (result.success === true) {
      alert("Edited Successfully");
      this.setState({ showEditModal: false });
      this.getCountry();
    } else {
      alert("Something went wrong");
    }
  }

  render() {
    return (
      <div>
        <div className="page-heading">
          <h3>Country Master</h3>
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
          ModalTitle="Add New Country"
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formCountryName">
              <Form.Label>Country Name <span className="required">*</span></Form.Label>
              <Form.Control
                type="text"
                required
                onChange={this.formChange}
                name="name"
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group controlId="formUniqueID">
              <Form.Label>Unique Code <span className="required">*</span></Form.Label>
              <Form.Control
                type="text"
                required
                onChange={this.formChange}
                name="code"
                placeholder="Enter code"
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
          ModalTitle="Edit Country"
        >
          <Form onSubmit={this.onEditConfirm}>
            <Form.Group controlId="formDepartmentName">
              <Form.Label>Country Name <span className="required">*</span></Form.Label>
              <Form.Control
                onChange={this.formChange}
                type="text"
                required
                defaultValue={this.state.objEditable.name}
                name="edited_name"
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group controlId="formUniqueID">
              <Form.Label>Unique Code <span className="required">*</span></Form.Label>
              <Form.Control
                onChange={this.formChange}
                defaultValue={this.state.objEditable.code}
                name="edited_code"
                required
                placeholder="Enter code"
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
          columnDefs={CountryMasterColumnDefs}
          rowData={this.state.rowData}
          suppressCellSelection={true}
          onGridReady={this.onGridReady}
          frameworkComponents={frameworkComponents}
        ></AgGrid>
      </div>
    );
  }
}
