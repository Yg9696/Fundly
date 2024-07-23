import Company from "../models/Company";

import img1 from "../assets/images/company1.png";
import img2 from "../assets/images/company2.png";
import img3 from "../assets/images/company3.png";
import logo1 from "../assets/images/logo1.png";

export const RaisePurpose: string[] = [
  "Marketing",
  "Development",
  "Distribution",
  "Branding",
  "Pilot",
  "Production",
  "Design",
];
export const InvesmentsCategories: string[] = [
  "Ai",
  "Technology",
  "Health",
  "Renewable Energy",
  "Real Estate",
  "Food",
  "Finance",
  "Electric Cars",
];

export const companies: Company[] = [
  new Company(
    "1",
    "H2OLL",
    "info@h2oll.com",
    {
      companyName: "H2OLL",
      website: "https://h2oll.com",
      promoVideoLink: "",
      country: "Israel",
      registrarOfCompanies: true,
      category: "Water",
      description: "פיתוח חדשני לייצור מים מהאוויר",
      about: "",
      image: img1,
      logo: logo1,
    },
    {
      targetAmount: 1000000,
      raisedAmount: 500000,
      deadline: "12",
      minInvestment: 1000,
      raisePurpose: ["Innovation", "Expansion"],
    },

    []
  ),
  new Company(
    "2",
    "GreenTech",
    "info@greentech.com",
    {
      companyName: "GreenTech",
      website: "https://greentech.com",
      promoVideoLink: "",
      country: "USA",
      about: "",
      registrarOfCompanies: true,
      category: "Energy",
      description: "טכנולוגיה ירוקה לאנרגיה סולארית",
      image: img2,
      logo: logo1,
    },
    {
      targetAmount: 300000,
      raisedAmount: 100000,
      deadline: "18",
      minInvestment: 2000,
      raisePurpose: ["Solar", "Renewable"],
    },

    []
  ),
  new Company(
    "3",
    "BioHealth",
    "info@biohealth.com",
    {
      companyName: "BioHealth",
      website: "https://biohealth.com",
      promoVideoLink: "",
      about: "",
      country: "UK",
      registrarOfCompanies: true,
      category: "Health",
      description: "פיתוח טיפולים רפואיים חדשניים",
      image: img3,
      logo: logo1,
    },
    {
      targetAmount: 50000,
      raisedAmount: 50000,
      deadline: "24",
      minInvestment: 5000,
      raisePurpose: ["Medical", "Research"],
    },

    []
  ),
  new Company(
    "4",
    "Tesla",
    "info@h2oll.com",
    {
      companyName: "H2OLL",
      website: "https://h2oll.com",
      promoVideoLink: "",
      country: "Israel",
      registrarOfCompanies: true,
      category: "Water",
      description: "פיתוח חדשני לייצור מים מהאוויר",
      about: "",
      image: img1,
      logo: logo1,
    },
    {
      targetAmount: 20000,
      raisedAmount: 10000,
      deadline: "12",
      minInvestment: 1000,
      raisePurpose: ["Innovation", "Expansion"],
    },

    []
  ),
  new Company(
    "5",
    "Apple",
    "info@greentech.com",
    {
      companyName: "GreenTech",
      website: "https://greentech.com",
      promoVideoLink: "",
      country: "USA",
      about: "",
      registrarOfCompanies: true,
      category: "Energy",
      description: "טכנולוגיה ירוקה לאנרגיה סולארית",
      image: img2,
      logo: logo1,
    },
    {
      targetAmount: 30000,
      raisedAmount: 19000,
      deadline: "18",
      minInvestment: 2000,
      raisePurpose: ["Solar", "Renewable"],
    },

    []
  ),
];
