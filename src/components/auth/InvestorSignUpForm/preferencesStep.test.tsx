
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../../App";

// test
test('sign up basic user data correct', () => {
  render(<App />);
  const linkElement = screen.getByTestId("check");
  expect(linkElement).toBeInTheDocument();
});
