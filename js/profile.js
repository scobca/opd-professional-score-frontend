import {getCookie} from "./cookieHandler.js";
import {dataFromJWT} from "./jwtHandler.js";

const jwt = getCookie("jwt")
if (jwt) {
    const user = dataFromJWT(jwt).data
    const profileLink = `${user.role}-profile.html`
    const usernameField = document.getElementById("username")
    const emailField = document.getElementById("email")

    usernameField.innerHTML = user.username
    emailField.innerHTML = user.email
    if (!document.URL.includes(profileLink)) {
        window.location.replace(profileLink)
    }
} else {
    window.location.replace("sign-in.html")
}
