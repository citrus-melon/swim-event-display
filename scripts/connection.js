let room;
if (window.location.search) {
    room = window.location.search.substring(1);
    sessionStorage.setItem("room", room);
} else if (sessionStorage.getItem("room")) {
    room = sessionStorage.getItem("room");
} else {
    window.location.replace("index.html");
}

const localState = {
    number: 1,
    tts: true,
    sfx: true,
    msg: '',
    hideNumber: false
}

const initializeConnection = () => {
    socket.sendNumber = () => {
        let msg = {
            type: "number",
            value: localState.number
        };
        socket.send(JSON.stringify(msg));
    }
    
    socket.sendGeneric = () => {
        let msg = {
            type: "all",
            value: localState
        }
        socket.send(JSON.stringify(msg));
    }
    
    socket.requestUpdate = () => {
        let msg = {
            type: "request",
        }
        socket.send(JSON.stringify(msg));
    }
    
    socket.onmessage = (event) => {
        if (event.data instanceof Blob && typeof playRecorded == "function") {
            playRecorded(event);
            return;
        }
        var msg = JSON.parse(event.data);
        switch(msg.type) {
          case "number":
            localState.number = msg.value;
            numberDisplay.innerText = localState.number;
            if (typeof backgroundAnimate == "function") backgroundAnimate();
            break;
          case "all":
            localState.number = msg.value.number;
            localState.tts = msg.value.tts;
            localState.sfx = msg.value.sfx;
            localState.msg = msg.value.msg;
            localState.hideNumber = msg.value.hideNumber;
            updateDOM();
            break;
          case "request":
            socket.sendGeneric();
            break;
        }
    }
    
    socket.onerror = () => {
        alert("A connection error has occurred, please reload the page")
    }
    
    socket.onclose = (e) => {
        setTimeout(() => {
            socket = new WebSocket ('wss://websocket-room.now.sh/swimeventdisplay_'+room);
            initializeConnection();
            console.log('reconncet!');
        }, 100);
    }
    
    socket.onopen = () => {
        socket.requestUpdate()
    }
}

let socket = new WebSocket ('wss://websocket-room.now.sh/swimeventdisplay_'+room);
initializeConnection();