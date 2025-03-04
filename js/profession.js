import {getCookie} from "./cookieHandler.js";
import {dataFromJWT} from "./jwtHandler.js";

const qualitiesBlock = document.querySelector(".qualities");
const profName = document.querySelector(".name")
const profDesc = document.querySelector(".description")
const profRequ = document.querySelector(".requirements")
const profSphere = document.querySelector(".sphere")

const loadPVK = async (id) => {
    const response = await fetch(`http://localhost:8081/pvk/profession/${id}`)
    const result = await response.json()
    if (result.status === 200) {
        return result.data
    }
}

const loadProfession = async (id) => {
    const response = await fetch(`http://localhost:8081/profession/${id}`)
    const result = await response.json();

    if (result.status === 200) {
        profName.innerHTML = `Профессия ${result.data.name}`
        profDesc.innerHTML = `Описание: ${result.data.description}`
        profRequ.innerHTML = `Требования: ${result.data.requirements}`
        profSphere.innerHTML = `Сфера деятельности: ${result.data.sphere}`

        const pvk = await loadPVK(id)
        if (pvk) {
            pvk.forEach((item) => {
                const quality = document.createElement("div")
                const qName = document.createElement("p")
                const qRate = document.createElement("p")

                quality.classList.add("quality")
                qName.innerHTML = item.pvk.description
                qRate.innerHTML = item.rating
                quality.append(qName, qRate)
                qualitiesBlock.append(quality)
            })
        }

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
                    window.location.replace(`configure-pvk.html?id=${id}`)
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

export { loadPVK }