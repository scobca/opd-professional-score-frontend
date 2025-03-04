import {getCookie} from "./cookieHandler.js";
import {dataFromJWT} from "./jwtHandler.js";
import {popupHandler} from "./popup.js";

const nextBtnUsers = document.getElementById("nextBtnUsers");
const prevBtnUsers = document.getElementById("prevBtnUsers");
const usersTable = document.querySelector(".userData");
const modalRole = document.querySelector(".role-select");
const modalRoleForm = document.getElementById("role-change-form");
const dataBlock = document.querySelector(".right-block")
let userPage = 1
const user = dataFromJWT(getCookie("jwt")).data;
let renderedUserRows = []
const loadUsers = async() => {
    if (user.role === "consultant") {
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

const loadTests = async() => {
    if (user.role === "consultant") {
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
            if (users[i].email !== user.email && user.email === "admin") {
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

modalRoleForm.onsubmit = async (e) => {
    const userId = Array.from(modalRoleForm.elements).find(input => input.type === "number").value
    const newRole = Array.from(modalRoleForm.elements).find(input => input.checked === true).value
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