import http from "../http-common.ts";
import {UserState} from "../utils/userState/UserState.ts";

export const setRole = async (id: number, role: string) => {
    console.log(role)
    if (UserState.role != "ADMIN") {
        return {
            status: "403",
            message: "You don't have enough rights to do this"
        }
    }
    try {
        const response = await http.patch("/user/setRole", {
            "id": id,
            "role": role,
        })
        return response.data
    } catch (error) {
        return error
    }
}

export const getAllUsers = async () => {
    if (UserState.role != "ADMIN") {
        return {
            status: "403",
            message: "You don't have enough rights to do this"
        }
    }
    try {
        const response = await http.get("/user/getAll")
        return response.data
    } catch (error) {
        return error
    }
}