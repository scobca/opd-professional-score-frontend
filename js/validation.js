import {getCookie} from "./cookieHandler.js";

if (document.URL.endsWith("email-verify.html") &&
    !getCookie("email")) window.location.replace("sign-in.html");

const codeField = document.querySelector('.code-field');
const inputs = []
if (codeField) {
    codeField.childNodes.forEach(digitField => {
        const input = digitField.childNodes[0];
        if (input) inputs.push(input);
    })
}

inputs.forEach(input => {
    input.onkeyup = event => {
        if (input.value < 0 || input.value > 9) input.value = "";
    }
})

const codeValidator = () => {
    let res = ""
    inputs.forEach(input => {
        res += input.value
    })
    return res
}

export {codeValidator};