import http from "../http-common.ts";
import {updateUserState} from "../utils/userState/UserState.ts";
import router from "../router/router.ts";

export const registrationFirstStep = async (data) => {
    try {
        const response = await http.post("/auth/registrationFirstStep", data)
        return response.data
    } catch (error) {
        return error
    }
}

export const registrationSecondStep = async (data) => {
    const code = parseInt(data.value.codeArr.join(""));
    try {
        const response = await http.post("/auth/register", {
            "userData": data.value.userData,
            "code": code
        })
        return response.data
    } catch (error) {
        return error
    }
}

export const login = async (data) => {
    try {
        const response = await http.post("/auth/login", data)
        return response.data
    } catch (error) {
        return error
    }
}

export const logout = async () => {
    localStorage.removeItem('token');
    updateUserState()
    await router.push('/')
}