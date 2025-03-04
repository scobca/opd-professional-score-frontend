import {getCookie} from "./cookieHandler.js";
import {dataFromJWT} from "./jwtHandler.js";
import {popupHandler} from "./popup.js";

const professionForm = document.getElementById("add-profession-form");
const jwt = getCookie("jwt")
if (jwt) {
    const user = dataFromJWT(jwt).data
    if (user.role === "admin" || user.role === "expert" || user.role === "moderator") {
        professionForm.addEventListener("submit", async (e) => {
            e.preventDefault()

            const response = await fetch("http://localhost:8081/create-profession", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getCookie("jwt")}`
                },
                body: new FormData(professionForm)
            })
            const result = await response.json()
            popupHandler(result)
            if (result.status === 200) {
                window.location.replace("index.html")
            }
        })
    } else {
        window.location.replace("index.html")
    }
}