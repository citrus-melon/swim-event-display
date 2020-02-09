roomInput = document.getElementById("roomInput");
btnWrapper = document.getElementById("btnWrapper");

if (localStorage.getItem("room")) {
    roomInput.value = decodeURIComponent(localStorage.getItem("room"));
    if (roomInput.value) btnWrapper.style.display = "block"; else btnWrapper.style.display = "none";
}

roomInput.addEventListener('input', () => {
    localStorage.setItem("room", encodeURIComponent(roomInput.value));
    if (roomInput.value) btnWrapper.style.display = "block"; else btnWrapper.style.display = "none";
})

//hide mobile keyboard on enter...
roomInput.addEventListener('change', () => {
    roomInput.blur();
})