var recorder;

let initRecorder = () => {
    if (navigator.mediaDevices === undefined) {
        window.alert("your browser does not support audio recording")
    }
    
    navigator.mediaDevices.getUserMedia({audio:true})
    .then((mediaStream) => {
        recorder = new MediaRecorder(mediaStream);
        recorder.addEventListener('dataavailable', onRecordingReady);
    })
    .catch((err) => { window.alert("error:\n" + err.message); });
}

let onRecordingReady = (e) => {
    socket.send(e.data);
}

recordBtn.addEventListener('touchstart', (e) => {
    if (!recorder) {
        initRecorder();
        return;
    }
    recorder.start();
    console.log('start');
    recordBtn.classList.add('active');
    e.preventDefault()
})
recordBtn.addEventListener('touchend', (e) => {
    if (recorder.state == 'recording') recorder.stop();
    console.log('stop');
    recordBtn.classList.remove('active');
    e.preventDefault()
})
recordBtn.addEventListener('mousedown', (e) => {
    if (!recorder) {
        initRecorder();
        return;
    }
    recorder.start();
    console.log('start');
})
recordBtn.addEventListener('mouseup', (e) => {
    if (recorder.state == 'recording') recorder.stop();
    console.log('stop');
})