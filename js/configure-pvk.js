import {dataFromJWT} from "./jwtHandler.js";
import {getCookie} from "./cookieHandler.js";
import {popupHandler} from "./popup.js";
const params = new URLSearchParams(document.location.search);
const professionId = params.get('id');

const loadPVK = async (id) => {
    const response = await fetch(`http://localhost:8081/pvk/profession/${id}/user/${dataFromJWT(jwt).data.id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getCookie("jwt")}`,
        }
    })
    const result = await response.json()
    if (result.status === 200) {
        return result.data
    }
}

const loadPvkList = async () => {
    const response = await fetch("http://localhost:8081/get-pvk-all", {
        headers: {
            Authorization: `Bearer ${getCookie("jwt")}`,
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
        const ratingInputs = document.querySelectorAll(".rating-pvk");
        const pvkForm = document.getElementById("pvk-form");
        let pvkList = await loadPvkList()

        const pvkData = await loadPVK(professionId)
        if (pvkData) {
            pvkList = pvkList.filter(item => {
                return !pvkData.some(subItem => {
                    return item.name === subItem.pvk.name
                })
            })
        }

        selects.forEach(select => {
            if (pvkData) {
                pvkData.forEach((pvkItem) => {
                    if (select.name === `pvk-${pvkItem.pvk.category}`) {
                        const option = document.createElement("option");
                        option.value = pvkItem.pvk.name
                        option.text = pvkItem.pvk.description
                        option.selected = true
                        select.add(option, null)
                    }
                })
            }
            pvkList.forEach((pvk) => {
                if (select.name === `pvk-${pvk.category}`) {
                    const option = document.createElement("option");
                    option.value = pvk.name
                    option.text = pvk.description
                    select.add(option, null)
                }
            })
        })
        ratingInputs.forEach((input) => {
            if (pvkData) {
                pvkData.forEach((pvkItem) => {
                    if (input.name === `pvk-${pvkItem.pvk.category}-rate`) {
                        input.value = pvkItem.rating
                    }
                })
            }
        })

        pvkForm.addEventListener("submit", async (e) => {
            e.preventDefault()
            const formData = new FormData(pvkForm)
            formData.append("profession_id", professionId)
            const response = await fetch("http://localhost:8081/rate-profession", {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${getCookie("jwt")}`,
                }
            })
            const result = await response.json()
            popupHandler(result)
            if (result.status === 200) {
                window.location.replace(`profession.html?id=${professionId}`)
            }
        })
    } else {
        window.location.replace("index.html")
    }
} else {
    window.location.replace("sign-in.html")
}