import {getCookie} from "./cookieHandler.js";
import {dataFromJWT} from "./jwtHandler.js";
import {popupHandler} from "./popup.js";

const nextBtnUsers = document.getElementById("nextBtnUsers");
const nextBtnProfessions = document.getElementById("prevBtnProfessions");
const prevBtnUsers = document.getElementById("prevBtnUsers");
const prevBtnProfessions = document.getElementById("prevBtnProfessions");
const usersTable = document.querySelector(".userData");
const professionsTable = document.querySelector(".professionData");
const modal = document.querySelector(".role-select");
const modalForm = document.getElementById("role-change-form");
let userPage = 1
let professionPage = 1
const user = dataFromJWT(getCookie("jwt")).data;
let renderedUserRows = []
let renderedProfessionRows = []
const loadUsers = async() => {
    if (user.role === "admin") {
        const response = await fetch("http://localhost:8081/get-users-all", {
            headers: {
                Authorization: `Bearer ${getCookie("jwt")}`,
            },
        })
        return await response.json()
    } else {
        window.location.replace("sign-in.html")
    }
}

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

const renderUsers = async (userPage) => {
    const users = await loadUsers()
    if (renderedUserRows) {
        renderedUserRows.forEach(row => {
            row.remove()
        })
    }

    for (let i = (userPage - 1) * 5; i < (userPage) * 5; i++) {
        if (users[i]) {
            const userRow = document.createElement('div')
            userRow.classList.add('userRow')
            const idDiv = document.createElement('div')
            const usernameDiv = document.createElement('div')
            const emailDiv = document.createElement('div')
            const roleDiv = document.createElement('div')
            idDiv.classList.add('id')
            usernameDiv.classList.add('username')
            emailDiv.classList.add('email')
            roleDiv.classList.add('role')
            idDiv.innerHTML = users[i].id
            usernameDiv.innerHTML = users[i].username
            emailDiv.innerHTML = users[i].email
            roleDiv.innerHTML = users[i].role
            userRow.append(idDiv, usernameDiv, emailDiv, roleDiv)
            if (users[i].email !== user.email) {
                const changeRole = document.createElement('button')
                changeRole.innerHTML = "Изменить роль"
                userRow.append(changeRole)

                changeRole.addEventListener("click", () => {
                    Array.from(modalForm.elements).forEach(input => {
                        if (input.value === users[i].role) {
                            input.checked = true
                        } else if (input.type === "number") {
                            input.value = users[i].id
                        }
                    })
                    modal.classList.toggle("hide")
                    const btnCoords = changeRole.getBoundingClientRect()
                    const modalCoords = modal.getBoundingClientRect()
                    modal.style.top = btnCoords.top + btnCoords.height + 15 + 'px'
                    modal.style.left = btnCoords.left - modalCoords.width + btnCoords.width + "px"
                    modal.children[0].innerHTML = `Изменить роль пользователя ${users[i].username}`
                })
            }
            usersTable.appendChild(userRow)
            renderedUserRows.push(userRow)
        }
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
            const nameDiv = document.createElement('div')
            const descDiv = document.createElement('div')
            idDiv.classList.add('id')
            nameDiv.classList.add('username')
            descDiv.classList.add('email')
            idDiv.innerHTML = professions.data[i].id
            nameDiv.innerHTML = professions.data[i].name
            descDiv.innerHTML = professions.data[i].description
            professionRow.append(idDiv, nameDiv, descDiv)
            // const changeRole = document.createElement('button')
            // changeRole.innerHTML = "Изменить роль"
            // userRow.append(changeRole)
            //
            // changeRole.addEventListener("click", () => {
            //     Array.from(modalForm.elements).forEach(input => {
            //         if (input.value === users[i].role) {
            //             input.checked = true
            //         } else if (input.type === "number") {
            //             input.value = users[i].id
            //         }
            //     })
            //     modal.classList.toggle("hide")
            //     const btnCoords = changeRole.getBoundingClientRect()
            //     const modalCoords = modal.getBoundingClientRect()
            //     modal.style.top = btnCoords.top + btnCoords.height + 15 + 'px'
            //     modal.style.left = btnCoords.left - modalCoords.width + btnCoords.width + "px"
            //     modal.children[0].innerHTML = `Изменить роль пользователя ${users[i].username}`
            // })
            professionsTable.appendChild(professionRow)
            renderedProfessionRows.push(professionRow)
        }
    }
}

prevBtnUsers.addEventListener("click", async (e) => {
    if (userPage > 1) {
        userPage -= 1
        await renderUsers(userPage)
    }
})
nextBtnUsers.addEventListener("click", async (e) => {
    if (userPage * 5 < loadUsers().length) {
        userPage += 1
        await renderUsers(userPage)
    }
})

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
    await renderUsers(1)
    await renderProfessions(1)
});

modalForm.onsubmit = async (e) => {
    const userId = Array.from(modalForm.elements).find(input => input.type === "number").value
    const newRole = Array.from(modalForm.elements).find(input => input.checked === true).value
    const data = new FormData
    data.append("user_id", userId)
    data.append("admin_email", user.email)
    data.append("new_role", newRole)
    e.preventDefault()
    const response = await fetch("http://localhost:8081/update-role", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getCookie("jwt")}`,
        },
        body: data
    })
    const result = await response.json()
    popupHandler(result)
    if (result.status === 200) {
        await renderUsers(userPage)
    }
}