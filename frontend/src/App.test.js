import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Greet } from "./greet";
test("hi", () => {
  render(<Greet />);
  const text = screen.getByText(/hello/i);
  expect(text).toBeInTheDocument();
});
