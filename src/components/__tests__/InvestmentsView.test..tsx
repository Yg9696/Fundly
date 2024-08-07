import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Timestamp } from "firebase/firestore";
import Company from "../../models/Company";
import InvestmentsView from "../investor/my-investments/InvestmentsView";

// Mock useNavigate hook
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

// Mock NoData, Button, and InvestmentList components
jest.mock("../cummon/NoData", () => (props: any) => (
  <div data-testid="no-data">{props.messeage}</div>
));
jest.mock("../cummon/Button", () => (props: any) => (
  <button
    onClick={props.onClick}
    style={{ backgroundColor: props.backgroundColor }}
  >
    {props.label}
  </button>
));
jest.mock("../cummon/invest-card/InvestList", () => (props: any) => (
  <div data-testid="investment-list">
    InvestmentList with {props.companies.length} companies
  </div>
));

// Mock Company class
const mockCompany1 = new Company(
  "1",
  "Company 1",
  "email@company1.com",
  {
    website: "https://company1.com",
    promoVideoLink: "https://company1.com/video",
    country: "Country 1",
    registrarOfCompanies: true,
    category: "Category 1",
    description: "Description 1",
    about: "About Company 1",
    image: "path/to/image1.png",
    logo: "path/to/logo1.png",
  },
  {
    targetAmount: 100000,
    deadline: Timestamp.now(),
    minInvestment: 1000,
    raisePurpose: ["Purpose 1"],
    raisedAmount: 50000,
    currentInvestmentsAmount: 25000,
  },
  ["doc1.pdf", "doc2.pdf"]
);

const mockCompany2 = new Company(
  "2",
  "Company 2",
  "email@company2.com",
  {
    website: "https://company2.com",
    promoVideoLink: "https://company2.com/video",
    country: "Country 2",
    registrarOfCompanies: false,
    category: "Category 2",
    description: "Description 2",
    about: "About Company 2",
    image: "path/to/image2.png",
    logo: "path/to/logo2.png",
  },
  {
    targetAmount: 200000,
    deadline: Timestamp.now(),
    minInvestment: 2000,
    raisePurpose: ["Purpose 2"],
    raisedAmount: 100000,
    currentInvestmentsAmount: 50000,
  },
  ["doc3.pdf", "doc4.pdf"]
);

describe("InvestmentsView", () => {
  it("renders NoData and Button when there are no companies", () => {
    render(<InvestmentsView companies={[]} title="Investments" />);

    expect(screen.getByTestId("no-data")).toHaveTextContent(
      "לא השקעת באף חברה"
    );
    expect(
      screen.getByRole("button", { name: /find investments!/i })
    ).toBeInTheDocument();
  });

  it("renders InvestmentList when there are companies", () => {
    render(
      <InvestmentsView
        companies={[mockCompany1, mockCompany2]}
        title="Investments"
      />
    );

    expect(screen.getByText("Investments")).toBeInTheDocument();
    expect(screen.getByTestId("investment-list")).toHaveTextContent(
      "InvestmentList with 2 companies"
    );
  });
});
