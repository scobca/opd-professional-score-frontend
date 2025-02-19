import http from "../http-common.ts";

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

