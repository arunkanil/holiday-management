import React, { useState } from "react";
import { ActionRenderer } from "../UI/Utils/StatusRenderer";
import { DateRenderer } from "../UI/Utils/DateRenderer";
import AgGrid from "../Components/AgGridWrapper";
import { PublicHolidaysMasterColumnDefs } from "../constants/columnMetadata";
import { Button, Form } from "react-bootstrap";
import ModalWrapper from "../Components/ModalWrapper";
import {
  PostAPICall,
  DeleteAPICall,
  GetAPICall,
} from "../Dataservice/dataservice";
import {
  DELETE_PUBLICHOLIDAY,
  GET_COUNTRY,
  GET_PUBLICHOLIDAY,
  POST_PUBLICHOLIDAY,
} from "../constants/urls";

const frameworkComponents = {
  statusRenderer: ActionRenderer,
  dateRenderer: DateRenderer,
};

export default class PublicHolidayMaster extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showDeleteModal: false,
      showEditModal: false,
      rowData: [],
      name: "",
      description: "",
      date: "",
      country: "",
      countryList: [],
      edited_name: "",
      edited_description: "",
      edited_date: "",
      edited_country: "",
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
    this.getPublicHolidays();
    this.getCountry();
  }
  async getPublicHolidays() {
    let result = await GetAPICall(GET_PUBLICHOLIDAY);
    console.log(result, "getPublicHolidays");
    this.setState({ rowData: result.result.items });
  }
  async getCountry() {
    let result = await GetAPICall(GET_COUNTRY);
    console.log(result, "country");
    this.setState({ countryList: result.result.items });
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
      contryId: this.state.country,
      date: this.state.date,
    };
    let result = await PostAPICall(POST_PUBLICHOLIDAY, formdata);
    console.log(result);
    if (result.success === true) {
      alert("Addition Successfull");
      this.setState({ showModal: false });
      this.getPublicHolidays();
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
    let result = await DeleteAPICall(DELETE_PUBLICHOLIDAY, this.state.deleteID);
    console.log(result);
    if (result.success === true) {
      alert("Deleted Successfully");
      this.setState({ showDeleteModal: false });
      this.getPublicHolidays();
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
      edited_date: value.date,
      edited_country: value.contryId,
    });
  }
  async onEditConfirm(e) {
    e.preventDefault();
    console.log(this.state);
    let payload = {
      name: this.state.edited_name,
      description: this.state.edited_description,
      contryId: this.state.edited_country,
      date: this.state.edited_date,
      id: this.state.objEditable.id,
    };
    let result = await PostAPICall(POST_PUBLICHOLIDAY, payload);
    console.log(result);
    if (result.success === true) {
      alert("Edited Successfully");
      this.setState({ showEditModal: false });
      this.getPublicHolidays();
    } else {
      alert("Something went wrong");
    }
  }

  render() {
    return (
      <div>
        <div className="page-heading">
          <h3>Public Holidays Per Country Master</h3>
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
          ModalTitle="Add New Holiday"
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label className="required">Country</Form.Label>
              <Form.Control
                as="select"
                name="country"
                required
                onChange={this.formChange}
              >
                <option value="" disabled selected hidden>
                  Choose...
                </option>
                {this.state.countryList.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                required
                name="date"
                onChange={this.formChange}
              />
            </Form.Group>
            <Form.Group id="formGridCheckbox">
              <Form.Check type="checkbox" label="Recurring holiday" />
            </Form.Group>
            <Form.Group controlId="formDepartmentName">
              <Form.Label>Holiday Name</Form.Label>
              <Form.Control
                onChange={this.formChange}
                type="text"
                name="name"
                required
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group controlId="formUniqueID">
              <Form.Label>Description</Form.Label>
              <Form.Control
                onChange={this.formChange}
                as="textarea"
                rows="2"
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
          ModalTitle="Edit Department"
        >
          <Form onSubmit={this.onEditConfirm}>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Country</Form.Label>
              <Form.Control
                as="select"
                name="edited_country"
                required
                defaultValue={this.state.objEditable.contryId}
                onChange={this.formChange}
              >
                <option value="" disabled selected hidden>
                  Choose...
                </option>
                {this.state.countryList.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="datetime-local"
                required
                name="edited_date"
                defaultValue={this.state.objEditable.date}
                onChange={this.formChange}
              />
            </Form.Group>
            <Form.Group controlId="formDepartmentName">
              <Form.Label>Holiday Name</Form.Label>
              <Form.Control
                onChange={this.formChange}
                defaultValue={this.state.objEditable.name}
                type="text"
                required
                name="edited_name"
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group controlId="formUniqueID">
              <Form.Label>Description</Form.Label>
              <Form.Control
                onChange={this.formChange}
                defaultValue={this.state.objEditable.description}
                as="textarea"
                rows="2"
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
          columnDefs={PublicHolidaysMasterColumnDefs}
          rowData={this.state.rowData}
          suppressCellSelection={true}
          onGridReady={this.onGridReady}
          frameworkComponents={frameworkComponents}
        ></AgGrid>
      </div>
    );
  }
}
