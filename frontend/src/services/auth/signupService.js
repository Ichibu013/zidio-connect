import { SIGNUP_URL } from "../utils/Urls";
import api from "../utils/api";

/**
 * Handles user sign-up by processing form data and making an API call.
 * @param {object} formData - The raw form data from the component.
 */
export const signup = async (formData) => {
  // Request Body
  const apiPayload = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    password: formData.password,
    passwordConfirm: formData.confirmPassword,
    role: formData.isCandidate ? "CANDIDATE" : "RECRUITER",
    tncAccepted: formData.termsAccepted,
  };

  //Simulate an API call
  console.log("Submitting the following data to the API:", apiPayload);

  try {
    const response = await api.post(SIGNUP_URL, JSON.stringify(apiPayload), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.status;
  } catch (error) {
    console.error("Error Signup post:", error);
    throw error;
  }
};
