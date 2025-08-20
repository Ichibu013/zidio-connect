import api from "../utils/api";
import { LOGIN_URL } from "../utils/Urls";

export const login = async (formData) => {
  //Request Body
  const apiPayload = {
    email: formData.email,
    password: formData.password,
  };

  //Simulate api call
  console.log("Submitting the following Data :", apiPayload);

  try {
    const response = await api.post(LOGIN_URL, JSON.stringify(apiPayload), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (response.data.success) {
      // Store the JWT token in cookies
      Cookies.set("jwt_token", response.data.token, { expires: 7 });
      Cookies.set("role", response.data.role, { expires: 7 });
      localStorage.setItem("role", response.data.role); // Also store in localStorage
      console.log("Login successful, token stored in cookies and localStorage");
    }
    // Return the status code
    console.log("Login successful, status code:", response.status);
    return response.status;
  } catch (error) {
    console.error("Error Login post:", error);
    throw error;
  }
};
