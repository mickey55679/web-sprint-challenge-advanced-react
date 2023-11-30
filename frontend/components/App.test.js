import React from "react"
import AppFunctional from "./AppFunctional"
import { render, screen, fireEvent} from '@testing-library/react';
// take in a string for the tests and a callback function, which runs some sort of a test suite.
// Mocking axios to control its behavior during the test


test("Renders AppForm without errors", () => {
  render(<AppFunctional />);
});
test("Displays coordinates and steps on the screen", () => {
  //Arrange
  render(<AppFunctional />);

expect(screen.getByText(/Coordinates/i)).toBeInTheDocument();
expect(screen.getByText(/You moved/i)).toBeInTheDocument();  
});
test("Buttons render on the screen", () => {
  render(<AppFunctional/>);

  expect(screen.getByText(/Left/i)).toBeInTheDocument();
  expect(screen.getByText(/Up/i)).toBeInTheDocument();
  expect(screen.getByText(/Right/i)).toBeInTheDocument();
  expect(screen.getByText(/Down/i)).toBeInTheDocument();
  expect(screen.getByText(/reset/i)).toBeInTheDocument();
});

test("Typing on the input changes its value", () => {
  render(<AppFunctional />);



})
