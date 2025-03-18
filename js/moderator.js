import {getCookie} from "./cookieHandler.js";
import {dataFromJWT} from "./jwtHandler.js";
import {popupHandler} from "./popup.js";

const nextBtnUsers = document.getElementById("nextBtnUsers");
const nextBtnProfessions = document.getElementById("prevBtnProfessions");
const prevBtnUsers = document.getElementById("prevBtnUsers");
const prevBtnProfessions = document.getElementById("prevBtnProfessions");
const usersTable = document.querySelector(".userData");
const professionsTable = document.querySelector(".professionData");
const modalRole = document.querySelector(".role-select");
const modalProfession = document.querySelector(".profession-edit");
const modalRoleForm = document.getElementById("role-change-form");
const modalProfessionForm = document.getElementById("profession-change-form");
const dataBlock = document.querySelector(".right-block")
let userPage = 1
let professionPage = 1
const user = dataFromJWT(getCookie("jwt")).data;
let renderedUserRows = []
let renderedProfessionRows = []
const loadUsers = async() => {
    if (user.role === "moderator") {
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

const renderUsers = async (userPage) => {
    const users = await loadUsers()
    if (renderedUserRows) {
        renderedUserRows.forEach(row => {
            row.remove()
        })
    }

    for (let i = (userPage - 1) * 5; i < (userPage) * 5; i++) {
        if (users[i] && users[i].role === "expert") {
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
                    Array.from(modalRoleForm.elements).forEach(input => {
                        if (input.value === users[i].role) {
                            input.checked = true
                        } else if (input.type === "number") {
                            input.value = users[i].id
                        }
                    })
                    modalRole.classList.toggle("hide")
                    dataBlock.classList.toggle("freeze")
                    const btnCoords = changeRole.getBoundingClientRect()
                    const modalCoords = modalRole.getBoundingClientRect()
                    modalRole.style.top = btnCoords.top + btnCoords.height + 'px'
                    modalRole.style.left = btnCoords.left - modalCoords.width + btnCoords.width + "px"
                    modalRole.children[0].innerHTML = `Изменить роль пользователя ${users[i].username}`
                })
            }
            usersTable.append(userRow)
            renderedUserRows.push(userRow)
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


window.addEventListener("load", async () => {
    await renderUsers(1)
});
