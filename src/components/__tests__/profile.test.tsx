import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserProvider } from "../../context/UserContext";
import Profile from "../investor/profile/profile";

// Mock Button component
jest.mock("../cummon/Button", () => ({
  __esModule: true,
  default: ({ label }: { label: string }) => <button>{label}</button>,
}));

// Mock PreferencesStep component
jest.mock("../auth/InvestorSignUpForm/PreferencesStep", () => ({
  __esModule: true,
  default: ({ isEditing }: { isEditing: boolean }) => (
    <div>{isEditing ? "Editing" : "Not Editing"}</div>
  ),
}));

// Mock useUser context
const mockUser = { name: "John Doe", email: "john.doe@example.com" };

jest.mock("../../context/userContext", () => {
  const actual = jest.requireActual("../../context/UserContext");
  return {
    ...actual,
    useUser: () => ({ user: mockUser }),
  };
});

describe("Profile Component", () => {
  it("renders Profile component with user data", () => {
    render(
      <UserProvider>
        <Profile />
      </UserProvider>
    );

    // Check if PreferencesStep is rendered
    expect(screen.getByText("Editing")).toBeInTheDocument();

    // Check if Button is rendered
    expect(screen.getByText("Delete account")).toBeInTheDocument();
  });
});
