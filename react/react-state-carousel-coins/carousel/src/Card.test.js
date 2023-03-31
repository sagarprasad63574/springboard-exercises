import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

//Smoke tests
it("renders without crashing", function() {
  render(<Card />)
});

//Snapshot test 
it("matches snapshot", function(){
    const {asFragment} = render(<Card />)
    expect(asFragment()).toMatchSnapshot();
});