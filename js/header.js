import {getCookie} from "./cookieHandler.js";

const authorizedBtns = document.querySelector(".authorized")
const unauthorizedBtns = document.querySelector(".unauthorized")

if (getCookie("jwt")) {
    unauthorizedBtns.style.display = "none"
    authorizedBtns.style.display = "flex"

    if (document.URL.includes("sign-in") ||
        document.URL.includes("sign-up") ||
        document.URL.includes("email-verify") ) {
        window.location.replace("user-profile.html");
    }
} else {
    unauthorizedBtns.style.display = "flex"
    authorizedBtns.style.display = "none"
}