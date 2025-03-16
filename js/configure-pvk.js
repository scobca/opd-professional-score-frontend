import {dataFromJWT} from "./jwtHandler.js";
import {getCookie} from "./cookieHandler.js";
import {popupHandler} from "./popup.js";
// import {getPvkEmbeddings, findClosestMatch} from "./utils-betas.js";
// import {findClosestMatch} from "./utils.js";
import { findClosestMatch } from "./utils-gamma.js";
const params = new URLSearchParams(document.location.search);
const professionId = params.get('id');
let options = []
let timer = null
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
        // const pvkEmbeddings = await getPvkEmbeddings(pvkOptions)
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

        searchInput.addEventListener("keyup", async () => {
            // Clear the previous timer
            clearTimeout(timer);

            // Set a new timer
            timer = setTimeout(async () => {
                options = await findClosestMatch(searchInput.value, pvkOptions);
                if (searchInput.value === "") {
                    optionsList.classList.remove("show");
                    showOptionsBtn.classList.remove("clicked");
                    options = pvkOptions
                } else {
                    optionsList.classList.add("show")
                    showOptionsBtn.classList.add("clicked");
                }
                if (options.length === 0) {
                    options.push({ name: "default", description: "Ничего не найдено"})
                }
                renderOptions(options)
            }, 500);
        })

        const renderOptions = (options) => {
            optionsList.replaceChildren()
            options.forEach((option) => {
                const optionDiv = document.createElement("div")
                const optionP = document.createElement("p");

                optionDiv.classList.add("option");
                optionP.innerHTML = option.description
                optionDiv.append(optionP)

                selectedPvks.forEach(pvk => {
                    if (pvk.id === option.id) {
                        selectedPvks.splice(selectedPvks.indexOf(pvk), 1)
                        selectedPvks.push({...option, rating: pvk.rating})
                        optionDiv.classList.add("selected")
                    }
                })

                if (option.name !== "default") {
                    optionDiv.addEventListener("click", () => {
                        const isDuplicate = selectedPvks.some(pvk => pvk.id === option.id)
                        if (isDuplicate) {
                            selectedPvks.forEach(pvk => {
                                if (pvk.id === option.id) {
                                    optionDiv.classList.remove("selected");
                                    selectedPvks.splice(selectedPvks.indexOf(pvk), 1)
                                }
                            })
                        } else  {
                            if (selectedPvks.length < 7) {
                                optionDiv.classList.add("selected");
                                selectedPvks.push(option)
                            }
                        }
                        renderRatings()
                    })
                }

                optionsList.appendChild(optionDiv)
            })
        }
        const renderRatings = () => {
            ratings.replaceChildren()
            selectedPvks.forEach(pvk => {
                const ratingDiv = document.createElement("div")
                const ratingP = document.createElement("p");

                const optionCheckBox = document.createElement("input");
                const optionLabel = document.createElement("label")

                ratingDiv.classList.add("rating")
                ratingP.innerHTML = pvk.description
                optionCheckBox.type = "number";
                optionCheckBox.name = pvk.name;
                optionCheckBox.value = pvk.rating;
                optionCheckBox.max = "10"
                optionCheckBox.min = "-10"
                optionCheckBox.step = "0"
                optionCheckBox.required = true

                optionCheckBox.addEventListener("change", () => {
                    pvk.rating = optionCheckBox.value
                })

                optionLabel.appendChild(optionCheckBox);

                ratingDiv.append(ratingP)
                ratingDiv.append(optionLabel)
                ratings.appendChild(ratingDiv)

                if (ratings.children.length < 7) {
                    ratings.classList.add("disabled")
                    for (let element of pvkForm.elements) {
                        if (!element.classList.contains("search-input")) {
                            element.readOnly = true
                        }
                    }
                } else {
                    ratings.classList.remove("disabled")
                    for (let element of pvkForm.elements) {
                        element.readOnly = false
                    }
                }
            })
        }

        renderOptions(pvkOptions)
        let pvkList = pvkOptions
        const pvkData = await loadPVK(professionId)
        if (pvkData) {
            pvkData.forEach(pvk => {
                selectedPvks.push({...pvk.pvk, rating: pvk.rating})
            })

            renderOptions(pvkOptions)
            renderRatings()
        }

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