const inputElement = document.getElementById("input");
const files = document.getElementById("files");
inputElement.addEventListener("click", handleFiles, false);
console.log(files);
function handleFiles(e) {
    e.preventDefault();
    window.ReactNativeWebView.postMessage('file_upload');
}
document.addEventListener("message", function(event) {
    alert(JSON.stringify(event.data));
    window.ReactNativeWebView.postMessage(event.data);
});
