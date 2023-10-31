import * as yup from "yup";

// Define arrays of allowed domains, blocked domains, and disposable email providers
const allowedDomains = [
  "gmail.com",
  "example.com",
  "yahoo.com",
  "outlook.com",
  "icloud.com",
  "hotmail.com",
  "msn.com",
];
const blockedDomains = ["blocked.com"];
const disposableEmailProviders = ["mailinator.com", "tempmail.com"];

export const SignUpValidation = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is required")
    .min(2, "First Name must be at least 2 characters long"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .min(2, "Last Name must be at least 2 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password should be at least 6 characters long")
    .matches(/[A-Z]/, "Password should contain at least one uppercase letter")
    .matches(/[a-z]/, "Password should contain at least one lowercase letter")
    .matches(/[0-9]/, "Password should contain at least one digit"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .test("is-allowed-domain", "Email domain is not allowed", (value) => {
      const domain = value.split("@")[1];
      return allowedDomains.includes(domain);
    })
    .test("is-blocked-domain", "Email domain is blocked", (value) => {
      const domain = value.split("@")[1];
      return !blockedDomains.includes(domain);
    })
    .test(
      "is-disposable-email",
      "Disposable email addresses are not allowed",
      (value) => {
        const domain = value.split("@")[1];
        return !disposableEmailProviders.includes(domain);
      }
    ),
  phone: yup.string().required("Phone is required"),
  role: yup
    .string()
    .required("User Type is required")
    .oneOf(["owner", "renter"], "Invalid User Type"),
  address: yup
    .string()
    .required("Address is required")
    .min(2, "Address must be at least 2 characters long"),
});
