import api from "../utils/api";
import { VERIFY_EMAIL_URL } from "../utils/Urls";

export const verifyEmail = async ({ email, otp }) => {
  console.log("Calling Verify email api");
  try {
    const response = await api.patch(VERIFY_EMAIL_URL+`${email}`, otp, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.status;
  } catch (error) {
    console.error("Error Verify Email Post:" + error);
    throw error;
  }
};
