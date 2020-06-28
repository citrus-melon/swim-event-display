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
    .catch((err) => { window.alert("Audio recording error:\n" + err.message); });
}

let onRecordingReady = (e) => {
    socket.send(e.data);
}

recordBtn.addEventListener('touchstart', (e) => {
    recordBtn.classList.add('active');
    e.preventDefault()
    if (recorder) {
        recorder.start();
    } else {
        initRecorder();
    } 
})
recordBtn.addEventListener('touchend', (e) => {
    recordBtn.classList.remove('active');
    e.preventDefault()
    if (!recorder) return;
    if (recorder.state == 'recording') recorder.stop();
})
recordBtn.addEventListener('mousedown', (e) => {
    if (recorder) {
        recorder.start();
    } else {
        initRecorder();
    } 
})
recordBtn.addEventListener('mouseup', (e) => {
    if (!recorder) return;
    if (recorder.state == 'recording') recorder.stop();
})