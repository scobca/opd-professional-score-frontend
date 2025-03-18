import {getCookie} from "./cookieHandler.js";
import {dataFromJWT} from "./jwtHandler.js";
import {popupHandler} from "./popup.js";

const nextBtnProfessionsPublished = document.getElementById("prevBtnProfessionsPublished");
const nextBtnProfessionsArchive = document.getElementById("prevBtnProfessionsArchive");
const prevBtnProfessionsPublished = document.getElementById("prevBtnProfessionsPublished");
const prevBtnProfessionsArchive = document.getElementById("prevBtnProfessionsArchive");
const professionsTableArchive = document.querySelector(".tableArchive");
const professionsTablePublished = document.querySelector(".tablePublished");
const modalProfession = document.querySelector(".profession-edit");
const modalProfessionForm = document.getElementById("profession-change-form");
const dataBlock = document.querySelector(".right-block")
let professionPageArchive = 1
let professionPagePublished = 1
let professions_Archive = []
let professions_Published = []
const renderedProfessionArchiveRows = []
const renderedProfessionPublishedRows = []
const user = dataFromJWT(getCookie("jwt")).data;

const loadProfessions = async() => {
    const response = await fetch("http://localhost:8081/get-professions-all")
    return await response.json()
}

window.onload = async() => {
    if (user.role === "expert") {
        await splitProfessions()
    } else {
        window.location.replace("sign-in.html")
    }
}

const splitProfessions = async () => {
    const professions = await loadProfessions()
    professions_Archive = []
    professions_Published = []
    professions.data.forEach(profession => {
        if (!profession.is_archive) {
            professions_Published.push(profession)
        } else {
            professions_Archive.push(profession)
        }
    })
    renderProfessionsArchive()
    renderProfessionsPublished()
}

const renderProfessionsArchive = async () => {
    if (renderedProfessionArchiveRows) {
        renderedProfessionArchiveRows.forEach(row => {
            row.remove()
        })
    }

    const loadPVK = async (id) => {
        const response = await fetch(`http://localhost:8081/pvk/profession/${id}`)
        const result = await response.json()
        if (result.status === 200) {
            return result.data
        }
    }


    for (let i = (professionPageArchive - 1) * 5; i < (professionPageArchive) * 5; i++) {
        if (professions_Archive[i]) {
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
            idDiv.innerHTML = professions_Archive[i].id
            nameDiv.innerHTML = professions_Archive[i].name
            nameDiv.href= `profession.html?id=${professions_Archive[i].id}`
            descDiv.innerHTML = professions_Archive[i].description
            requDiv.innerHTML = professions_Archive[i].requirements
            sphereDiv.innerHTML = professions_Archive[i].sphere
            professionRow.append(idDiv, nameDiv, descDiv, requDiv, sphereDiv)

            const pvks = await loadPVK(professions_Archive[i].id)
            if (!pvks) {
                const changeProfession = document.createElement('button')
                changeProfession.innerHTML = "Изменить"
                professionRow.append(changeProfession)

                changeProfession.addEventListener("click", () => {
                    Array.from(modalProfessionForm.elements).forEach(input => {
                        switch (input.id) {
                            case "profName":
                                input.value = professions_Archive[i].name
                                break
                            case "profDesc":
                                input.value = professions_Archive[i].description
                                break
                            case "profRequ":
                                input.value = professions_Archive[i].requirements
                                break
                            case "profSphere":
                                input.value = professions_Archive[i].sphere
                                break
                            case "profId":
                                input.value = professions_Archive[i].id
                                break
                        }
                    })
                    modalProfession.classList.toggle("hide")
                    dataBlock.classList.toggle("freeze")
                    const btnCoords = changeProfession.getBoundingClientRect()
                    const modalCoords = modalProfession.getBoundingClientRect()
                    modalProfession.style.top = btnCoords.top + btnCoords.height + 'px'
                    modalProfession.style.left = btnCoords.left - modalCoords.width + btnCoords.width + "px"
                    modalProfession.children[0].innerHTML = `Изменить профессию ${professions_Archive[i].name}`
                })
            }
            professionsTableArchive.appendChild(professionRow)
            renderedProfessionArchiveRows.push(professionRow)
        }
    }
}

const renderProfessionsPublished = () => {
    if (renderedProfessionPublishedRows) {
        renderedProfessionPublishedRows.forEach(row => {
            row.remove()
        })
    }

    for (let i = (professionPagePublished - 1) * 5; i < (professionPagePublished) * 5; i++) {
        if (professions_Published[i]) {
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
            idDiv.innerHTML = professions_Published[i].id
            nameDiv.innerHTML = professions_Published[i].name
            nameDiv.href= `profession.html?id=${professions_Published[i].id}`
            descDiv.innerHTML = professions_Published[i].description
            requDiv.innerHTML = professions_Published[i].requirements
            sphereDiv.innerHTML = professions_Published[i].sphere
            professionRow.append(idDiv, nameDiv, descDiv, requDiv, sphereDiv)

            professionsTablePublished.appendChild(professionRow)
            renderedProfessionPublishedRows.push(professionRow)
        }
    }
}

prevBtnProfessionsArchive.addEventListener("click", async (e) => {
    if (professionPageArchive > 1) {
        professionPageArchive -= 1
        await renderProfessionsArchive(professionPageArchive)
    }
})
nextBtnProfessionsArchive.addEventListener("click", async (e) => {
    if (professionPageArchive * 5 < loadUsers().length) {
        professionPageArchive += 1
        await renderProfessionsArchive(professionPageArchive)
    }
})

prevBtnProfessionsPublished.addEventListener("click", async (e) => {
    if (professionPagePublished > 1) {
        professionPagePublished -= 1
        await renderProfessionsPublished(professionPagePublished)
    }
})
nextBtnProfessionsPublished.addEventListener("click", async (e) => {
    if (professionPagePublished * 5 < loadUsers().length) {
        professionPagePublished += 1
        await renderProfessionsPublished(professionPagePublished)
    }
})


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
        await splitProfessions()
    }
}