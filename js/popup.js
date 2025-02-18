const removeOldPopup = (popup) => {
    if (popup) {
        popup.classList.remove("show")
        setTimeout(() => {document.body.removeChild(popup)}, 100)
    }
}

const popupHandler = (response) => {
    removeOldPopup(document.querySelector(".popup"))

    const popup = document.createElement("div");
    const msg = document.createElement("p");

    msg.innerHTML = response.message;
    popup.appendChild(msg);
    popup.classList.add("popup");
    response.status <= 200 ?
        popup.classList.add("success") :
        popup.classList.add("fail");

    document.body.appendChild(popup);
    popup.addEventListener("click", () => {
        removeOldPopup(popup)
    })
    setTimeout(() => {popup.classList.add("show")}, 100)
}

export { popupHandler };