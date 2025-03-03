import {dataFromJWT} from "./jwtHandler.js";
import {getCookie} from "./cookieHandler.js";

const loadPvkList = async () => {
    const response = await fetch("http://localhost:8081/get-pvk-all", {
        headers: {
            Authorization: `Bearer ${getCookie("token")}`,
        }
    })
    const result = await response.json()
    if (result.status === 200) {
        return result.data
    }
}

const jwt = getCookie("jwt")
if (jwt) {
    const user = dataFromJWT(jwt).data
    if (user.role === "admin" || user.role === "expert") {
        const selects = document.querySelectorAll(".select-pvk");
        const pvkList = await loadPvkList()
        selects.forEach(select => {
            pvkList.forEach((pvk) => {
                if (select.name === `pvk-${pvk.category}`) {
                    const option = document.createElement("option");
                    option.value = pvk.name
                    option.text = pvk.description
                    select.add(option, null)
                }
            })
        })
    } else {
        window.location.replace("index.html")
    }
} else {
    window.location.replace("sign-in.html")
}