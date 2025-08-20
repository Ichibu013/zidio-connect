import { RESET_PASSWORD_URL } from "../utils/Urls";
import api from "../utils/api";
export const resetPassword = async (formData) => {
  // Request Body
  const apiPayload = {
    password: formData.password,
    token: formData.token,
  };

  // Simulate an API call
  console.log("Submitting the following data to the API:", apiPayload);

  try {
    const response = await api.patch(RESET_PASSWORD_URL, apiPayload);
    console.log(response);
    return response.status;
  } catch (error) {
    console.error("Error Reset Password post:", error);
    throw error;
  }
};
