const inputElement = document.getElementById("input");
const files = document.getElementById("files");
inputElement.addEventListener("click", handleFiles, false);
console.log(files);
function handleFiles(e) {
    e.preventDefault();
    window.ReactNativeWebView.postMessage('default prevented');
}
document.addEventListener("message", function(event) {
    alert(event.data);
});
