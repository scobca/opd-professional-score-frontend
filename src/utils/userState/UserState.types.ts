export type UserStatus = "unauthorized" | "unverified" | "authorized";
export type UserRole = "USER" | "EXPERT" | "CONSULTANT" | "MODERATOR" | "ADMIN"

export interface UserStateInterface {
    /**
     * id of User in system
     */
    id?: number | null;
    /**
     * status of User - on what step of authentication currently is
     */
    status: UserStatus;

    /**
     * Name on website
     */
    username?: string | null;

    /**
     * User's password
     */
    password?: string | null;

    /**
     * User's email (and login)
     */
    email?: string | null;

    /**
     * User's role on website
     */
    role?: UserRole | null;
}