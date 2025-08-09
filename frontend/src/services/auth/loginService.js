import api from "../utils/api"
import { LOGIN_URL } from "../utils/Urls"

export const login = async (formData) => {
    //Request Body
    const apiPayload = {
        email: formData.email,
        password: formData.password
    }

    //Simulate api call
    console.log("Submitting the following Data :", apiPayload)
    
    try {
        const response = await api.post(LOGIN_URL, JSON.stringify(apiPayload), {
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log(response);
        return response.status;
    } catch (error) {
        console.error("Error Login post:", error);
        throw error;
    }
};