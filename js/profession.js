import {getCookie} from "./cookieHandler.js";
import {dataFromJWT} from "./jwtHandler.js";

const qualitiesBlock = document.querySelector(".qualities");
const profName = document.querySelector(".name")
const profDesc = document.querySelector(".description")
const descParts = ["Описание: ", "Требования: ", "Категория: "]

const loadPVK = async (id) => {
    return false
}

const loadProfession = async (id) => {
    const response = await fetch(`http://localhost:8081/profession/${id}`)
    const result = await response.json();

    if (result.status === 200) {
        const description = result.data.description.split(".")
        profName.innerHTML = `Профессия ${result.data.name}`
        console.log(result.data.description);
        for (let i = 0; i < description.length - 2; i++) {
            const block = document.createElement("p")
            block.innerHTML = descParts[i] + description[i]
            profDesc.append(block)
        }

        const pvk = await loadPVK(id)


        const jwt = getCookie("jwt")
        if (jwt) {
            const user = dataFromJWT(jwt).data
            if (user.role === "admin" || user.role === "expert" || user.role === "moderator") {
                const linkPVK = document.createElement("button")
                if (pvk) {
                    linkPVK.innerHTML = "Изменить ПВК"
                } else {
                    linkPVK.innerHTML = "Добавить ПВК"
                }
                linkPVK.addEventListener("click", () => {
                    window.location.replace("configure-pvk.html")
                })
                qualitiesBlock.append(linkPVK)
            }
        }
    }
}



window.onload = () => {
    const params = new URLSearchParams(document.location.search);
    const id = params.get('id');
    if (id) {
        loadProfession(id)
    }
}