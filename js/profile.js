import {deleteCookie, getCookie} from "./cookieHandler.js";
const logoutBtn = document.querySelector(".logout_button");
const dataFromJWT = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Error decoding JWT:", e);
        return null;
    }
}

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

logoutBtn.addEventListener("click", () => {
    deleteCookie("jwt")
    window.location.replace("index.html");
})
