import React, { useState } from "react";
import { ActionRenderer } from "../UI/Utils/StatusRenderer";
import AgGrid from "../Components/AgGridWrapper";
import { LevelMasterColumnDefs } from "../constants/columnMetadata";
import { Button, Form } from "react-bootstrap";
import ModalWrapper from "../Components/ModalWrapper";

let rowData = [
  { id: "1", level: "3C", unique_id: 35000 },
  { id: "2", level: "Executive", unique_id: 32000 },
  { id: "3", level: "Security", unique_id: 72000 },
];

const frameworkComponents = {
  statusRenderer: ActionRenderer,
};

export default class LevelMaster extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };
  render() {
    return (
      <div>
        <div className="page-heading">
          <h3>Level Master</h3>
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
          ModalTitle="Add New Level"
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formLevelName">
              <Form.Label>Level</Form.Label>
              <Form.Control type="text" placeholder="Enter level name" />
              {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}
            </Form.Group>
            <Form.Group controlId="formUniqueID">
              <Form.Label>Unique ID</Form.Label>
              <Form.Control type="text" placeholder="Enter ID" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </ModalWrapper>
        <hr></hr>
        <AgGrid
          pagination={true}
          columnDefs={LevelMasterColumnDefs}
          rowData={rowData}
          suppressCellSelection={true}
          onGridReady={this.onGridReady}
          frameworkComponents={frameworkComponents}
        ></AgGrid>
      </div>
    );
  }
}
