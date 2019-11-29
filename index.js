const inputElement = document.getElementById("input");
const files = document.getElementById("files");
inputElement.addEventListener("click", handleFiles, false);
console.log(files);
function handleFiles(e) {
    e.preventDefault();
    window.ReactNativeWebView.postMessage('file_upload');
}
const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
}
document.addEventListener("message", function(event) {
    const fileData = JSON.parse(event.data);
    const dataURI = `data:image/*;base64, ${fileData.data}`

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
