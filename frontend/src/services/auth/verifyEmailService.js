import api from "../utils/api";

export const verifyEmail = async ({ email, otp }) => {
  console.log("Calling Verify email api");
  try {
    const response = await api.post(`/verify-email/${email}`, otp, {
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
