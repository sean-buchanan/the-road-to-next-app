import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import React from 'react';
import { describe, expect, it } from "vitest";
import { FieldError } from "../field-error";
import { ActionState } from '../utils/to-action-state';

describe("FieldError", () => {
  it("should render an error message when field has an error", () => {
    const actionState: ActionState = {
      message: "",
      fieldErrors: {
        username: ["Username must be a string", "Username is required"],
        password: ["Password must be at least 8 characters"],
      },
    };

    // Render FieldError component with actionState and name
    const { getByText } = render(<FieldError actionState={actionState} name="username" />);
    
    // Check if the first error message is displayed
    expect(getByText("Username must be a string")).toBeInTheDocument()
    expect(() => getByText("Username is not required")).toThrow();
    expect(() => getByText("Password must be at least 8 characters")).toThrow();
  });
});