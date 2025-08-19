import api from "../utils/api"; // Adjust the import path as necessary
import { FORGOT_PASSWORD_URL } from "../utils/Urls";

export const forgotPassword = async (email) => {
  // Request Body
  const apiPayload = {
    email: email,
  };

  // Simulate an API call
  console.log("Submitting the following data to the API:", apiPayload);

  try {
    const response = await api.post(FORGOT_PASSWORD_URL, JSON.stringify(apiPayload), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.status;
  } catch (error) {
    console.error("Error Forgot Password post:", error);
    throw error;
  }
}