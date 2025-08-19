import { RESEND_VERIFICATION_EMAIL_URL } from "../utils/Urls";
import api from "../utils/api";

export const resendOtp = async (email) => {
  // Simulate an API call
  console.log("Submitting the following data to the API:", { email });

  try {
    const response = await api.patch(
      RESEND_VERIFICATION_EMAIL_URL + `${email}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response.status;
  } catch (error) {
    console.error("Error Resend OTP post:", error);
    throw error;
  }
};
