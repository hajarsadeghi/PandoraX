import { 
        get_badge_images,
        get_badge_list,
        add_new_badge
        } 
        from './../../api';
import { load_badges } from './../../helper/badges';
let badge_obj = {};

// ... get badge images
get_badge_images((status, response) => {
    if (status) {
        init_albume(response);
    }
    else {
        console.log('error')
    }
})
// ... get badge list
get_badge_list((status, response) => {
    if (status) {
        load_badges(response)
    }
    else {
        console.log('error')
    }
})
//... dropzone
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
    success: (file, respone) => {
        badge_obj.icon_id = respone.id
        badge_obj.icon_src = respone.src;
        $("#previewImg").attr( "src", respone.src)
    }
};
// ... add new budget
$(document).on('click', '#addBadgeBtn', () => {
    add_new_badge( badge_obj, (status, response) => {
        if (status) {
            $('form').find('input').val('');
            badge_obj = {};
        }
        else {
            console.log(error)
        }
    })
})

$('#addBadgeCollapse').on('hidden.bs.collapse', function (e) {
    if ($("#created_badge_list_keeper").css("display")=="none"){
        $("#no_badge_animation").css("display","block");
        $(".no-badge-desc").css("display","block");
    }
    $("#badgeName").val("")
    $("#badgePoints").val("");
    $("#badgeName").siblings(".text-danger").css("display","none");
    $("#badgeName").removeClass("error-field");
    $("#badgePoints").siblings(".text-danger").css("display","none");
    $("#badgePoints").removeClass("error-field");
    $("#addBadgeForm i.collaping-icon").text("add_circle_outline");
});

$("#badgeName").on('input',function(e){
    $(".preview h5").text($("#badgeName").val());
    badge_obj.name = $(this).val();
    if ($("#badgeName").val().length < 1){
        console.log($("#badgeName").val().length)
        $(".preview h5").text("Badge name ...");
    }
})
$("#badgeDescription").on('input',function(e){
    $(".preview .description").text($("#badgeDescription").val());
    badge_obj.description = $(this).val();
    if ($("#badgeDescription").val().length < 1){
        console.log($("#badgeDescription").val().length)
        $(".preview .description").text(" description ... ");
    }
})

$("#badgePoints").on('input',function(e){
    $(".preview .badge-label span").text($("#badgePoints").val());
    badge_obj.point_amount = $(this).val();
    if ($("#badgePoints").val().length<1){
        $(".preview .badge-label span").text("Badge points ...");
    }
})
$("#badgePoints").val("");

$('#addBadgeCollapse').on('shown.bs.collapse', function (e) {
    $("#no_badge_animation").css("display","none");
    $(".no-badge-desc").css("display","none");  
    $("#addBadgeForm i.collaping-icon").text("remove_circle_outline");  
});

$(document).on('click', '.badge-choice', function() {
    badge_obj.icon_id = $(this).find('img').attr('id');
    badge_obj.icon_src = $(this).find('img').attr('src');
    $("#previewImg").attr( "src", badge_obj.icon_src)
})

function init_albume(album) {
    for (var i = 0; i< album.length; i++){
        $('.albume').append(
            '<a href="#" class="badge-choice">' +
                '<img id="'+ album[i].id +'" src="'+ album[i].src +'" alt="badge" />' +
            '</a>'
        )
    }
}




