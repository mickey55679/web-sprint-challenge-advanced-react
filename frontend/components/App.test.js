import React from "react"
import AppFunctional from "./AppFunctional"
import { render, screen, fireEvent} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

test("Renders AppForm without errors", () => {
  render(<AppFunctional />);
});


// test("Displays coordinates and steps on the screen", () => {
//   render(<AppFunctional />);
 
// });

// test("Buttons render on the screen", () => {
//   render(<AppFunctional/>);
//  const buttons = screen.queryAllByRole("button");
//  expect(buttons.toHaveLength(6));

//  });

// test('loads items eventually', async () => {
//   render(<AppFunctional/>)
 
//   const submitButton = screen.getByText("submit")
// })



