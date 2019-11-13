export const InitializeBadgeDropzone = function(callback) {
    Dropzone.autoDiscover = true;
    Dropzone.options.badgeFileDropzone = {
        url: '/api/badge/icon/',
        paramName: 'image',
        headers: {
            'Space-Id':space_id
        },
        dictResponseError: 'Couldnt upload the file!',
        dictCancelUpload: 'Remove image',
        acteptedFiles: 'image/*',
        addRemoveLinks: true,
        transformFile: function(file, done) {
            // Create Dropzone reference for use in confirm button click handler
            var myDropZone = this;
            // Create the image editor overlay
            var editor = document.createElement('div');
            editor.style.position = 'fixed';
            editor.style.left = 0;
            editor.style.right = 0;
            editor.style.top = 0;
            editor.style.bottom = 0;
            editor.style.zIndex = 9999;
            editor.style.backgroundColor = '#000';
            document.body.appendChild(editor);

            // Create confirm button at the top left of the viewport
            var buttonConfirm = document.createElement('button');
            buttonConfirm.style.position = 'absolute';
            buttonConfirm.style.left = '10px';
            buttonConfirm.style.top = '10px';
            buttonConfirm.style.zIndex = 9999;
            buttonConfirm.textContent = 'Confirm';
            buttonConfirm.className += ' btn btn-secondary btn-sm';
            editor.appendChild(buttonConfirm);
            buttonConfirm.addEventListener('click', function() {
                // Get the canvas with image data from Cropper.js
                var canvas = cropper.getCroppedCanvas({
                    width: 256,
                    height: 256
                });
                // Turn the canvas into a Blob (file object without a name)
                canvas.toBlob(function(blob) {
                    // Create a new Dropzone file thumbnail
                    myDropZone.createThumbnail(
                        blob,
                        myDropZone.options.thumbnailWidth,
                        myDropZone.options.thumbnailHeight,
                        myDropZone.options.thumbnailMethod,
                        false, 
                        function(dataURL) {
                        
                        // Update the Dropzone file thumbnail
                        myDropZone.emit('thumbnail', file, dataURL);
                        // Return the file to Dropzone
                        done(blob);
                    });
                });
                // Remove the editor from the view
                document.body.removeChild(editor);
            });

            // Create an image node for Cropper.js
            var image = new Image();
            image.src = URL.createObjectURL(file);
            editor.appendChild(image);
            
            // Create Cropper.js
            var cropper = new Cropper(image, { aspectRatio: 1 });
        },
        success: (file, response) => {
            callback(true, response);
        }
    };
}

export const InitializePostDropzone = function(callback) {
    Dropzone.autoDiscover = true;
    Dropzone.options.postFileDropzone = {
        url: '/api/activity/upload_media/',
        paramName: 'image',
        headers: {
            'Space-Id':space_id
        },
        dictResponseError: 'Couldnt upload the file!',
        dictCancelUpload: 'Remove image',
        acteptedFiles: 'image/*',
        addRemoveLinks: true,
        dictCancelUploadConfirmation: 'upload is canceled',
        // complete: (file, response) => {
        //     $(file.previewElement).find('.dz-remove').html('<i class="material-icons">cancel</i>')
        //     $(file.previewElement).addClass('dz-complete');
        // },
        success: (file, response) => {
            $(file.previewElement).find('.dz-remove').html('<i class="material-icons">cancel</i>')
            $(file.previewElement).addClass('dz-complete');
            callback('added', file.previewElement, response, null);
        },
        removedfile: (file) => {
            callback('removed', file.previewElement, null, $(file.previewElement).attr('img-id'))
            file.previewElement.remove()
        },
    };

    
}