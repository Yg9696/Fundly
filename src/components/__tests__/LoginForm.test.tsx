import React from "react";
import { render } from "@testing-library/react";
import LoginForm from "../auth/LoginForm";

// Mock all external dependencies
jest.mock("../../context/UserContext", () => ({
  useUser: () => ({ setUser: jest.fn() }),
}));

jest.mock("../../context/popupContext", () => ({
  useModal: () => ({ closeModal: jest.fn() }),
}));

jest.mock("../../context/AppStatusContext", () => ({
  useAppStatus: () => ({
    loading: false,
    setLoading: jest.fn(),
    error: null,
    setError: jest.fn(),
  }),
}));

jest.mock("../../services/authService", () => ({
  loginUser: jest.fn(),
}));

jest.mock("../../services/dbService", () => ({
  fetchUserFromDb: jest.fn(),
}));

jest.mock("react-spinners/ClipLoader", () => () => null);

describe("LoginForm", () => {
  it("renders without crashing", () => {
    const { container } = render(<LoginForm />);
    expect(container).toBeTruthy();
  });
});
