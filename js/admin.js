import {getCookie} from "./cookieHandler.js";
import {dataFromJWT} from "./jwtHandler.js";
import {popupHandler} from "./popup.js";

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const usersTable = document.querySelector(".data");
const modal = document.querySelector(".role-select");
const modalForm = document.getElementById("role-change-form");
let page = 1
const user = dataFromJWT(getCookie("jwt")).data;
let renderedRows = []
const loadUsers = async() => {
    if (user.role === "admin") {
        const response = await fetch("http://localhost:8081/get-users-all")
        return await response.json()
    } else {
        window.location.replace("sign-in.html")
    }
}

const renderUsers = async (page) => {
    const users = await loadUsers()
    if (renderedRows) {
        renderedRows.forEach(row => {
            row.remove()
        })
    }

    for (let i = (page - 1) * 5; i < (page) * 5; i++) {
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
            renderedRows.push(userRow)
        }
    }
}

prevBtn.addEventListener("click", (e) => {
    if (page > 1) {
        page -= 1
        renderUsers(page)
    }
})
nextBtn.addEventListener("click", (e) => {
    if (page * 5 < loadUsers().length) {
        page += 1
        renderUsers(page)
    }
})

window.addEventListener("load", () => {
    renderUsers(1)
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
        renderUsers(page)
    }
}