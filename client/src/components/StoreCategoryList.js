import React from "react";
import { CustomInput, Form, FormGroup, Input, Label } from "reactstrap";

const StoreCategoryList = (props) => {
  return (
    <Form>
      <FormGroup>
        <Label for="exampleSearch">Search</Label>
        <Input
          type="search"
          name="search"
          id="exampleSearch"
          placeholder="search placeholder"
        />
      </FormGroup>

      <FormGroup>
        <Label for="exampleCheckbox">Category</Label>
        <div>
          <CustomInput
            type="checkbox"
            id="exampleCustomCheckbox1"
            label="Art product"
          />
          <CustomInput
            type="checkbox"
            id="exampleCustomCheckbox22"
            label="Photography"
          />
          <CustomInput
            type="checkbox"
            id="exampleCustomCheckbox33"
            label="Graphic Desgin"
          />
          <CustomInput
            type="checkbox"
            id="exampleCustomCheckbox44"
            label="Digital Design"
          />
          <CustomInput
            type="checkbox"
            id="exampleCustomCheckbox55"
            label="Painting"
          />
          <CustomInput
            type="checkbox"
            id="exampleCustomCheckbox6"
            label="Architecture"
          />
        </div>
      </FormGroup>
    </Form>
  );
};

export default StoreCategoryList;
