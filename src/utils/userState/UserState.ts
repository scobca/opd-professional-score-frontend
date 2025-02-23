import { reactive } from "vue";
import type {UserState, UserStatus} from "./UserState.types.ts";
import {jwtDecode} from "jwt-decode";

export const UserState = reactive<UserState>({
    status: "unauthorized",
})

export const updateUserState = () => {
    const token = localStorage.getItem("token");
    const userToVerify = JSON.parse(localStorage.getItem("userToVerify"))
    if (token) {
        const userData = jwtDecode(token);

        if (userData) {
            UserState.status = "authorized";
            UserState.username = userData.username;
            UserState.email = userData.email;
            if (userData.role) {
                UserState.role = userData.role;
            } else {
                UserState.role = "USER"
            }
        }
    } else if (userToVerify) {
        UserState.status = userToVerify.status;
        UserState.username = userToVerify.username;
        UserState.password = userToVerify.password;
        UserState.email = userToVerify.email;
        UserState.role = userToVerify.role;
    } else {
        UserState.status = "unauthorized"
        UserState.username = null
        UserState.password = null
        UserState.email = null
        UserState.role = null
    }
}

