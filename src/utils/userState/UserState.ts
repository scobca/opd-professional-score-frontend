import { reactive } from "vue";
import type {UserRole, UserStateInterface} from "./UserState.types.ts";
import {jwtDecode} from "jwt-decode";

export const UserState = reactive<UserStateInterface>({
    status: "unauthorized",
})

interface UserJwt {
    id: number;
    username: string;
    email: string;
    role: UserRole;
    isBanned: boolean;
    iat: number;
    exp: number;
}

export const updateUserState = () => {
    const token = localStorage.getItem("token");
    const userToVerify = JSON.parse(<string>localStorage.getItem("userToVerify"))
    if (token) {
        const userData = jwtDecode(token) as UserJwt;

        if (userData) {
            UserState.id = userData.id
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
        UserState.id = userToVerify.id;
        UserState.status = userToVerify.status;
        UserState.username = userToVerify.username;
        UserState.password = userToVerify.password;
        UserState.email = userToVerify.email;
        UserState.role = userToVerify.role;
    } else {
        UserState.status = "unauthorized"
        UserState.id = null
        UserState.username = null
        UserState.password = null
        UserState.email = null
        UserState.role = null
    }
}

