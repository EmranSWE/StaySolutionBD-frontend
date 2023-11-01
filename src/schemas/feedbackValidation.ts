import * as yup from "yup";

export const FeedbackValidation = yup.object().shape({
  rating: yup
    .number()
    .required("Rating is required")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating can't be more than 5"),
  feedback: yup
    .string()
    .required("Feedback is required")
    .min(5, "Feedback must be at least 5 characters long"),
});
