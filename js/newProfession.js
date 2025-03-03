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
            let description = ""
            let name = ""
            Array.from(professionForm.elements).forEach(input => {
                if (input.id !== "profession-name") {
                    console.log(input, input.value)
                    description = description + input.value + "."
                } else {
                    name = input.value
                }
            })
            const data = new FormData()
            data.append("profession_name", name)
            data.append("profession_description", description)

            const response = await fetch("http://localhost:8081/create-profession", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getCookie("jwt")}`
                },
                body: data
            })
            const result = await response.json()
            popupHandler(result)
            if (result.status === 200) {
                location.replace("index.html")
            }
        })
    } else {
        window.location.replace("index.html")
    }
}