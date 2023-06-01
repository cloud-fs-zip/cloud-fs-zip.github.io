async function playSong(handledFile) {
    const blob = await file.getFile();
    const url = window.URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
  }
  
if ("launchQueue" in window) {
window.launchQueue.setConsumer((launchParams) => {
    if (launchParams.files && launchParams.files.length) {
    playSong(launchParams.files[0]);
    }
});
}