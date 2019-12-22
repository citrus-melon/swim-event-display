const socket = new WebSocket ('wss://connect.websocket.in/v2/1?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjkyNjg3ZDY1YWVjNDI3ZmRlYjA0ZDFkN2U2MzM5YWZlN2ExNGU2OTgwMTE1ODI3N2NlNGEzMTBkMTY4ZmVmZjEwZWI0MDgyNDU4YzhhOWY0In0.eyJhdWQiOiI2IiwianRpIjoiOTI2ODdkNjVhZWM0MjdmZGViMDRkMWQ3ZTYzMzlhZmU3YTE0ZTY5ODAxMTU4Mjc3Y2U0YTMxMGQxNjhmZWZmMTBlYjQwODI0NThjOGE5ZjQiLCJpYXQiOjE1NzQ1MzgyNzYsIm5iZiI6MTU3NDUzODI3NiwiZXhwIjoxNjA2MTYwNjc2LCJzdWIiOiI2MSIsInNjb3BlcyI6W119.KA5SpcvyKBsTyrEOGbd0B6iSh9YptKb3uo_-n2uUErZJL617fm5zXvyRw_oiwQnzbP_TCSiqgkUWl-OKeycGDHb2UW_Fn2TFDbJ6ePQuKIsZOFQ7kccQqidWi4nDgVnIS-xkl8iQrVeCtTZdj_v8i8tG_6WU_Zfdbq4xyFmb3lbsECngxhc9yKa7wq-kB-_asQ4t1sCqO5R59ZIiKIyWiY759SN9Ji3dYTsV6RARhQ4bV18KDV1gkk_wuQS098-0zahWhlzy0uJX4c4sMjVbHCqd6Pu219pYEphV0esUKoolNUc6s6ZDEkDmHVoaUiwb1MPZB-0fpFe5RNKAz3g-ebRl-qGQWjTy_NhkqW5wFa_bdMQ7SeGUh6N6azZELjV2-4jkUlI2GIM1eJruuvZRjPwukqtFYCYDdwvpR6JY012slzBLmA7WUHPYUm0UxqqzEN0TqaJuHU8eUVp4djRgYCqiKQPPM2u5HMxlpJNKyo_cLehJFd50Ko1-UlZj9x5N5az8_QK-UP5-6B6HpGfyEcX1XzwndXwhK3jJM46dyqOV6O1uvOvKcl5o96nPdHvqo81JNK5OHejRkkiFWNTNcgh1GkHu4vMiD3KBJMZnX8TXj2I50b0_HP5Vkry2MU2kNA2elO-Jfis9fGaaoVv-ExbkZDVc42WgXxQVWI22Bn8');

const localState = {
    number: 1,
    tts: true,
    sfx: true,
    msg: '',
    hideNumber: false
}

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

socket.onopen = () => {
    socket.requestUpdate()
}