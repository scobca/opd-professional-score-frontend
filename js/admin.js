import {getCookie} from "./cookieHandler.js";
import {dataFromJWT} from "./jwtHandler.js";
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const changeBtn = document.getElementById("changeBtn");
const usersTable = document.querySelector(".data");
let page = 1
let user = null
let renderedRows = []
const loadUsers = async() => {
    const jwt = getCookie("jwt")
    if (jwt) {
        user = dataFromJWT(jwt).data
        if (user.role === "admin") {
            const response = await fetch("http://localhost:8081/get-users-all")
            return await response.json()
        }
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
            userRow.append(changeRole)
        }
        usersTable.appendChild(userRow)
        renderedRows.push(userRow)
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