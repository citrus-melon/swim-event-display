roomInput = document.getElementById("roomInput");
btnWrapper = document.getElementById("btnWrapper");
controlBtn = document.getElementById("control");
receiveBtn = document.getElementById("receive");

const handleInput = () => {
    if (roomInput.value) btnWrapper.style.display = "block"; else btnWrapper.style.display = "none";
    controlBtn.href = "controller.html?" + encodeURIComponent(roomInput.value);
    receiveBtn.href = "receiver.html?" + encodeURIComponent(roomInput.value);
}

if (window.location.search) {
    roomInput.value = decodeURIComponent(window.location.search).substring(1);
    handleInput();
} else if (sessionStorage.getItem("room")) {
    roomInput.value = decodeURIComponent(sessionStorage.getItem("room"));
    handleInput();
}

roomInput.addEventListener('input', handleInput);

//hide mobile keyboard on enter...
roomInput.addEventListener('change', () => {
    roomInput.blur();
});