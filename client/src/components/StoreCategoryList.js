import React from 'react';
import { CustomInput, Form, FormGroup, Label, Input } from 'reactstrap';

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
          <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Art product" />
          <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="Photography" />
          <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="Graphic Desgin" />
          <CustomInput type="checkbox" id="exampleCustomCheckbox4" label="Digital Design" />
          <CustomInput type="checkbox" id="exampleCustomCheckbox5" label="Painting" />
          <CustomInput type="checkbox" id="exampleCustomCheckbox6" label="Architecture" />
        </div>
      </FormGroup>

      
      
    </Form>
  );
}




export default StoreCategoryList;