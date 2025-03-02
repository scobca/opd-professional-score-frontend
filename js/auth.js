import {deleteCookie, getCookie, setCookie} from "./cookieHandler.js";
import {codeValidator} from "./validation.js"
import {popupHandler} from "./popup.js";

const signInForm = document.getElementById("sign-in-form");
const signUpForm = document.getElementById("sign-up-form");
const emailVerifyForm = document.getElementById("email-verify-form");
const resendCode = document.getElementById("resend-code");
const logoutBtn = document.getElementById("logout-btn")
const profileLogoutBtn = document.querySelector(".logout_button");

if (signInForm) {
    signInForm.onsubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(signInForm)
        let response = await fetch("http://localhost:8081/sign-in", {
            method: "POST",
            body: data,
        })
        let result = await response.json()
        if (result.message === "User isn't verified") {
            setCookie("email", data.get("email"), { "max-age": 600 })
            window.location.replace("email-verify.html")
        }
        else if (!result.jwt) {
            popupHandler(result)
        } else {
            setCookie("jwt", result.jwt)
            window.location.replace(`user-profile.html`)
        }
    }
}

if (signUpForm) {
    signUpForm.onsubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(signUpForm)
        let response = await fetch("http://localhost:8081/sign-up", {
            method: "POST",
            body: data,
        })
        let result = await response.json()
        if (result.status <= 300) {
            setCookie("email", data.get("email"), { "max-age": 600 })
            window.location.replace("email-verify.html")
        }
        popupHandler(result)
    }
}

if (emailVerifyForm) {
    emailVerifyForm.onsubmit = async (e) => {
        const email = getCookie("email")


        if (email) {
            e.preventDefault();
            const data = new FormData()
            const code = codeValidator()
            data.set("email", getCookie("email"))
            data.set("code", code)
            let response = await fetch("http://localhost:8081/email-verify", {
                method: "POST",
                body: data,
            })
            let result = await response.json()
            if (result.status <= 300) {
                window.location.replace("user-profile.html")
            }
            if (!result.jwt) {
                popupHandler(result)
            } else {
                setCookie("jwt", result.jwt)
            }
        } else {
            window.location.replace("sign-in.html");
        }
    }
}

if (resendCode) {
    resendCode.addEventListener("click", async () => {
        if (getCookie("email")) {
            const data = new FormData()
            data.set("email", getCookie("email"))
            let response = await fetch("http://localhost:8081/resend-code", {
                method: "POST",
                body: data
            })
            let result = await response.json()
            popupHandler(result)
        } else {
            window.location.replace("sign-in.html");
        }
    })
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        deleteCookie("jwt")
        console.log('hi')
        window.location.replace("index.html")
    })
}

if (profileLogoutBtn) {
    profileLogoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        deleteCookie("jwt")
        console.log('hi')
        window.location.replace("index.html")
    })
}


