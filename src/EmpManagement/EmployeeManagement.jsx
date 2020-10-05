import React, { useState } from "react";
import { ActionRenderer } from "../UI/Utils/StatusRenderer";
import AgGrid from "../Components/AgGridWrapper";
import { EmployeeManagementColumnDefs } from "../constants/columnMetadata";
import { Button, Col, Form } from "react-bootstrap";
import ModalWrapper from "../Components/ModalWrapper";
import {
  PostAPICall,
  DeleteAPICall,
  GetAPICall,
} from "../Dataservice/dataservice";
import {
  DELETE_EMPLOYEEPROFILE,
  GET_DESIGNATION,
  GET_DEPARTMENT,
  GET_EMPLOYEEPROFILE,
  POST_EMPLOYEEPROFILE,
  GET_USERS,
} from "../constants/urls";

const frameworkComponents = {
  statusRenderer: ActionRenderer,
};
let formselect = [
  {
    name: "Reports To",
    id: "reportsTo",
    editedid: "edited_reportsTo",
    data: "userList",
  },
  {
    name: "Designation",
    id: "designationId",
    editedid: "edited_designationId",
    data: "designationList",
  },
  {
    name: "Department",
    id: "departmentId",
    editedid: "edited_departmentId",
    data: "departmentlist",
  },
];
export default class EmployeeManagement extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showDeleteModal: false,
      showEditModal: false,

      rowData: [],

      firstName: "",
      lastName: "",
      emailAddress: "",
      employeeId: "",
      officeLocation: "",
      reportsTo: "",
      designationId: "",
      departmentId: "",

      edited_firstName: "",
      edited_lastName: "",
      edited_emailAddress: "",
      edited_employeeId: "",
      edited_officeLocation: "",
      edited_reportsTo: "",
      edited_designationId: "",
      edited_departmentId: "",

      designationList: [],
      departmentlist: [],
      userList: [],

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
    this.getEmployees();
    this.getDataLists();
  }
  async getEmployees() {
    let result = await GetAPICall(GET_EMPLOYEEPROFILE);
    console.log(result, "getEmployees");
    this.setState({ rowData: result.result.items });
  }
  async getDataLists() {
    let result = await GetAPICall(GET_DESIGNATION);
    let userList = await GetAPICall(GET_USERS);
    let departmentlist = await GetAPICall(GET_DEPARTMENT);
    this.setState({
      userList: userList.result.items,
      designationList: result.result.items,
      departmentlist: departmentlist.result.items,
    });
  }
  formChange(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value });
    console.log(this.state);
  }
  async handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    let formdata = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailAddress: this.state.emailAddress,
      employeeId: this.state.employeeId,
      officeLocation: this.state.officeLocation,
      reportsTo: this.state.reportsTo,
      designationId: this.state.designationId,
      departmentId: this.state.departmentId,
    };
    let result = await PostAPICall(POST_EMPLOYEEPROFILE, formdata);
    console.log(result);
    if (result.success === true) {
      alert("Addition Successfull");
      this.setState({ showModal: false });
      this.getEmployees();
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
    let result = await DeleteAPICall(
      DELETE_EMPLOYEEPROFILE,
      this.state.deleteID
    );
    console.log(result);
    if (result.success === true) {
      alert("Deleted Successfully");
      this.setState({ showDeleteModal: false });
      this.getEmployees();
    } else {
      alert("Something went wrong");
    }
  }
  handleEdit(value) {
    this.setState({
      objEditable: value,
      showEditModal: true,
      edited_firstName: value.firstName,
      edited_lastName: value.lastName,
      edited_emailAddress: value.emailAddress,
      edited_employeeId: value.employeeId,
      edited_officeLocation: value.officeLocation,
      edited_reportsTo: value.reportsTo,
      edited_designationId: value.designationId,
      edited_departmentId: value.departmentId,
    });
    console.log(this.state,"handleedit");
  }
  async onEditConfirm(e) {
    e.preventDefault();
    console.log(this.state,"onEditConfirm" );
    let payload = {
      firstName: this.state.edited_firstName,
      lastName: this.state.edited_lastName,
      emailAddress: this.state.edited_emailAddress,
      employeeId: this.state.edited_employeeId,
      officeLocation: this.state.edited_officeLocation,
      reportsTo: this.state.edited_reportsTo,
      designationId: this.state.edited_designationId,
      departmentId: this.state.edited_departmentId,
      id: this.state.objEditable.id,
    };
    let result = await PostAPICall(POST_EMPLOYEEPROFILE, payload);
    console.log(result);
    if (result.success === true) {
      alert("Edited Successfully");
      this.setState({ showEditModal: false });
      this.getEmployees();
    } else {
      alert("Something went wrong");
    }
  }

  render() {
    return (
      <div>
        <div className="page-heading">
          <h3>Employee Management</h3>
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
          ModalTitle="Add New Employee"
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Row>
                <Col>
                  <Form.Control
                    size="sm"
                    required
                    onChange={this.formChange}
                    name="firstName"
                    placeholder="First name"
                  />
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    required
                    onChange={this.formChange}
                    name="lastName"
                    placeholder="Last name"
                  />
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group>
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                size="sm"
                onChange={this.formChange}
                type="email"
                required
                name="emailAddress"
                placeholder="Enter e-mail"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                size="sm"
                required
                onChange={this.formChange}
                name="employeeId"
                placeholder="Enter employee id"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Office Location</Form.Label>
              <Form.Control
                size="sm"
                onChange={this.formChange}
                name="officeLocation"
                placeholder="Enter office location"
              />
            </Form.Group>
            {formselect.map((item) => (
              <Form.Group>
                <Form.Label>{item.name}</Form.Label>
                <Form.Control
                  size="sm"
                  as="select"
                  name={item.id}
                  onChange={this.formChange}
                >
                  <option value="" disabled selected hidden>
                    Choose...
                  </option>
                  {this.state[item.data].map((innerItem) => (
                    <option value={innerItem.id}>{innerItem.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            ))}
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
          ModalTitle="Edit Employee"
        >
          <Form onSubmit={this.onEditConfirm}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Row>
                <Col>
                  <Form.Control
                    size="sm"
                    required
                    onChange={this.formChange}
                    name="edited_firstName"
                    defaultValue={this.state.objEditable.firstName}
                  />
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    required
                    onChange={this.formChange}
                    name="edited_lastName"
                    defaultValue={this.state.objEditable.lastName}
                  />
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group>
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                size="sm"
                onChange={this.formChange}
                type="email"
                required
                name="edited_emailAddress"
                defaultValue={this.state.objEditable.emailAddress}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                size="sm"
                required
                onChange={this.formChange}
                name="edited_employeeId"
                defaultValue={this.state.objEditable.employeeId}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Office Location</Form.Label>
              <Form.Control
                size="sm"
                onChange={this.formChange}
                name="edited_officeLocation"
                defaultValue={this.state.objEditable.officeLocation}
              />
            </Form.Group>
            {formselect.map((item) => (
              <Form.Group>
                <Form.Label>{item.name}</Form.Label>
                <Form.Control
                  size="sm"
                  as="select"
                  name={item.editedid}
                  defaultValue={this.state.objEditable[item.id]}
                  onChange={this.formChange}
                >
                  <option value="" disabled selected hidden>
                    Choose...
                  </option>
                  {this.state[item.data].map((innerItem) => (
                    <option value={innerItem.id}>{innerItem.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            ))}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </ModalWrapper>
        <hr></hr>
        <AgGrid
          pagination={true}
          context={this.state.context}
          columnDefs={EmployeeManagementColumnDefs}
          rowData={this.state.rowData}
          suppressCellSelection={true}
          onGridReady={this.onGridReady}
          frameworkComponents={frameworkComponents}
        ></AgGrid>
      </div>
    );
  }
}
