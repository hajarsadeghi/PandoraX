$(document).ready(() => {
    var fileInput = document.querySelector('input[type=file]');
    var filenameContainer = document.querySelector('#test');
    var dropzone = document.querySelector('target');


    fileInput.addEventListener('change', function(ev) {
        console.log(ev.target.value,'value')
        console.log(ev.target.files[0], 'on change')
        var data = new FormData();
        data.append('file', ev.target.files[0]);
        filenameContainer.innerText = fileInput.value.split('\\').pop();
    });

    fileInput.addEventListener('dragenter', function() {
        console.log('on drag enter')
    });
})