const inputElement = document.getElementById("input");
const files = document.getElementById("files");
inputElement.addEventListener("click", handleFiles, false);
console.log(files);
function handleFiles(e) {
    e.preventDefault();
    window.ReactNativeWebView.postMessage('file_upload');
}
function b64toBlob(dataURI) {

    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
}
document.addEventListener("message", function(event) {
    const fileData = JSON.parse(event.data);
    const dataURI = `data:image/jpeg;base64,${fileData.data}`

    const fileBlob = b64toBlob(dataURI.replace(/\s/g, ''));
    alert('blob');
    var formData = new FormData();
    formData.append("file", fileBlob, fileData.fileName);
    alert('form');

    fetch({method: "POST", url:  'https://api.ellorem.xyz/public/file-upload', body: formData}).then(response => {
        alert(jJSON.stringify(response));

    }).catch(error => {
        alert(jJSON.stringify(error));
    });
});
