import {getCookie} from "./cookieHandler.js";
import {dataFromJWT} from "./jwtHandler.js";
import {popupHandler} from "./popup.js";

const nextBtnProfessions = document.getElementById("prevBtnProfessions");
const prevBtnProfessions = document.getElementById("prevBtnProfessions");
const professionsTable = document.querySelector(".professionData");
const modalProfession = document.querySelector(".profession-edit");
const modalProfessionForm = document.getElementById("profession-change-form");
const dataBlock = document.querySelector(".right-block")
let professionPage = 1
const user = dataFromJWT(getCookie("jwt")).data;
let renderedProfessionRows = []


const loadProfessions = async() => {
    const response = await fetch("http://localhost:8081/get-professions-all")
    return await response.json()
}

const loadTests = async() => {
    if (user.role === "admin") {
        const response = await fetch("http://localhost:8081/get-users-all")
        return await response.json()
    } else {
        window.location.replace("sign-in.html")
    }
}

const renderProfessions = async (professionPage) => {
    const professions = await loadProfessions()
    if (renderedProfessionRows) {
        renderedProfessionRows.forEach(row => {
            row.remove()
        })
    }

    for (let i = (professionPage - 1) * 5; i < (professionPage) * 5; i++) {
        if (professions.data[i]) {
            const professionRow = document.createElement('div')
            professionRow.classList.add('professionRow')
            const idDiv = document.createElement('div')
            const nameDiv = document.createElement('a')
            const descDiv = document.createElement('div')
            const requDiv = document.createElement('div')
            const sphereDiv = document.createElement('div')
            idDiv.classList.add('id')
            nameDiv.classList.add('username')
            descDiv.classList.add('text')
            requDiv.classList.add('text')
            idDiv.innerHTML = professions.data[i].id
            nameDiv.innerHTML = professions.data[i].name
            nameDiv.href= `profession.html?id=${professions.data[i].id}`
            descDiv.innerHTML = professions.data[i].description
            requDiv.innerHTML = professions.data[i].requirements
            sphereDiv.innerHTML = professions.data[i].sphere
            professionRow.append(idDiv, nameDiv, descDiv, requDiv, sphereDiv)
            const changeProfession = document.createElement('button')
            changeProfession.innerHTML = "Изменить"
            professionRow.append(changeProfession)

            changeProfession.addEventListener("click", () => {
                Array.from(modalProfessionForm.elements).forEach(input => {
                    switch (input.id) {
                        case "profName":
                            input.value = professions.data[i].name
                            break
                        case "profDesc":
                            input.value = professions.data[i].description
                            break
                        case "profRequ":
                            input.value = professions.data[i].requirements
                            break
                        case "profSphere":
                            input.value = professions.data[i].sphere
                            break
                        case "profId":
                            input.value = professions.data[i].id
                            break
                    }
                })
                modalProfession.classList.toggle("hide")
                dataBlock.classList.toggle("freeze")
                const btnCoords = changeProfession.getBoundingClientRect()
                const modalCoords = modalProfession.getBoundingClientRect()
                modalProfession.style.top = btnCoords.top + btnCoords.height + 'px'
                modalProfession.style.left = btnCoords.left - modalCoords.width + btnCoords.width + "px"
                modalProfession.children[0].innerHTML = `Изменить профессию ${professions.data[i].name}`
            })
            professionsTable.appendChild(professionRow)
            renderedProfessionRows.push(professionRow)
        }
    }
}

prevBtnProfessions.addEventListener("click", async (e) => {
    if (professionPage > 1) {
        professionPage -= 1
        await renderProfessions(professionPage)
    }
})
nextBtnProfessions.addEventListener("click", async (e) => {
    if (professionPage * 5 < loadUsers().length) {
        professionPage += 1
        await renderProfessions(professionPage)
    }
})

window.addEventListener("load", async () => {
    await renderProfessions(1)
});


modalProfessionForm.onsubmit = async (e) => {
    const professionId = Array.from(modalProfessionForm.elements).find(input => input.id === "profId").value
    const professionName = Array.from(modalProfessionForm.elements).find(input => input.id === "profName").value
    const professionDescription = Array.from(modalProfessionForm.elements).find(input => input.id === "profDesc").value
    const professionRequirements = Array.from(modalProfessionForm.elements).find(input => input.id === "profRequ").value
    const professionSphere = Array.from(modalProfessionForm.elements).find(input => input.id === "profSphere").value

    const data = new FormData
    data.append("profession_id", professionId)
    data.append("profession_name", professionName)
    data.append("profession_description", professionDescription)
    data.append("profession_requirements", professionRequirements)
    data.append("profession_sphere", professionSphere)
    e.preventDefault()
    const response = await fetch("http://localhost:8081/update-profession", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getCookie("jwt")}`,
        },
        body: data
    })
    const result = await response.json()
    popupHandler(result)
    if (result.status === 200) {
        await renderProfessions(professionPage)
    }
}