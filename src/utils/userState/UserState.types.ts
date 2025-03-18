export type UserStatus = "unauthorized" | "unverified" | "authorized";
export type UserRole = "USER" | "EXPERT" | "CONSULTANT" | "MODERATOR" | "ADMIN"

export interface UserState {
    /**
     * id of User in system
     */
    id: number;
    /**
     * status of User - on what step of authentication currently is
     */
    status: UserStatus;

    /**
     * Name on website
     */
    username?: string;

    /**
     * User's password
     */
    password?: string;

    /**
     * User's email (and login)
     */
    email?: string;

    /**
     * User's role on website
     */
    role?: UserRole;
}