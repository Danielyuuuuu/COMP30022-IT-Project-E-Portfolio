import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
import "../App.css";

const SearchBar = (props) => {
  return (
    <Form>
      <FormGroup>
        <button className="searchButton" type="submit">
          <i class="fas fa-search"></i>
        </button>
        <div className="searchBar">
          <Input
            type="search"
            name="search"
            id="exampleSearch"
            placeholder="search placeholder"
          />
        </div>
      </FormGroup>
    </Form>
  );
};

export default SearchBar;
