import * as Yup from "yup";

const propertySchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  location: Yup.string().required("Location is required"),
  size: Yup.string().required("Size is required"),

  numberOfRooms: Yup.number()
    .integer("Number of rooms must be an integer")
    .min(1, "At least 1 room is required")
    .required("Number of rooms is required"),
  monthlyRent: Yup.number()
    .required("Monthly rent is required")
    .integer("Monthly rent must be an integer")
    .min(0, "Monthly rent cannot be negative"),
  flatNo: Yup.string().required("Flat No is required"),
  description: Yup.string().required("Description No is required"),

  maxOccupancy: Yup.number()
    .integer("Maximum occupancy must be an integer")
    .min(1, "Maximum occupancy must be at least 1")
    .required("Occupancy is required"),
});

export default propertySchema;
