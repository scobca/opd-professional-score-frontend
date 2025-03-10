import {dataFromJWT} from "./jwtHandler.js";
import {getCookie} from "./cookieHandler.js";
import {popupHandler} from "./popup.js";
import {getPvkEmbeddings, findClosestMatch} from "./utils-betas.js";
// import {getPvkEmbeddings, findClosestMatch} from "./utils.js";
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
    result.data.sort((a, b) => b.id - a.id)
    if (result.status === 200) {
        return result.data
    }
}

const jwt = getCookie("jwt")
if (jwt) {
    const user = dataFromJWT(jwt).data
    if (user.role === "admin" || user.role === "expert") {
        const pvkOptions = await loadPvkList()
        const pvkEmbeddings = await getPvkEmbeddings(pvkOptions)
        console.log(pvkEmbeddings)
        const selects = document.querySelectorAll(".select-pvk");
        const ratingInputs = document.querySelectorAll(".rating-pvk");
        const pvkForm = document.getElementById("pvk-form");
        const multiselect = document.querySelector(".multiselect");
        const ratings = document.querySelector(".ratings")
        const showOptionsBtn = document.querySelector(".show-options");
        const optionsList = document.querySelector(".options");
        const searchInput = document.querySelector(".search-input");
        const selectedPvks = []

        showOptionsBtn.addEventListener("click", () => {
            showOptionsBtn.classList.toggle("clicked");
            optionsList.classList.toggle("show");
        })

        searchInput.oninput = async () => {
            const options = findClosestMatch(searchInput.value, pvkEmbeddings, pvkOptions);
            if (searchInput.value === "") {
                optionsList.classList.remove("show");
                showOptionsBtn.classList.remove("clicked");
            } else {
                optionsList.classList.add("show")
                showOptionsBtn.classList.add("clicked");
            }
            if (options.length === 0) {
                options.push({ name: "default", description: "Ничего не найдено"})
            }
            renderOptions(options)
        }

        const renderOptions = (options) => {
            optionsList.replaceChildren()
            options.forEach((option) => {
                const optionDiv = document.createElement("div")
                const optionP = document.createElement("p");

                optionDiv.classList.add("option");
                optionP.innerHTML = option.description
                optionDiv.append(optionP)

                if (option.name !== "default") {
                    const optionCheckBox = document.createElement("input");
                    const optionLabel = document.createElement("label")

                    optionCheckBox.type = "checkbox";
                    optionCheckBox.name = option.name;

                    optionLabel.appendChild(optionCheckBox);
                    optionDiv.append(optionLabel)

                    optionDiv.addEventListener("click", () => {
                        if (selectedPvks.length > 0) {
                            selectedPvks.forEach(((pvk, index) => {
                                if (pvk.name === option.name) {
                                    selectedPvks.splice(index, 1)
                                    console.log(selectedPvks)

                                } else {
                                    selectedPvks.push(option)
                                    console.log("hi")
                                }
                            }))
                        } else {
                            selectedPvks.push(option)
                        }
                        renderRatings(selectedPvks)
                    })
                }

                optionsList.appendChild(optionDiv)
            })
        }
        const renderRatings = (pvks) => {
            ratings.replaceChildren()
            pvks.forEach(pvk => {
                const ratingDiv = document.createElement("div")
                const ratingP = document.createElement("p");

                const optionCheckBox = document.createElement("input");
                const optionLabel = document.createElement("label")

                ratingP.innerHTML = pvk.description
                optionCheckBox.type = "number";
                optionCheckBox.name = pvk.name;

                optionLabel.appendChild(optionCheckBox);
                ratingDiv.append(optionLabel)


                ratingDiv.append(ratingP)

                ratings.appendChild(ratingDiv)
            })
        }

        renderOptions(pvkOptions)
        let pvkList = pvkOptions
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