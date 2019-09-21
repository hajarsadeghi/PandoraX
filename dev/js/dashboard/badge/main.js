let badges = [
    {
        src: "data:image/jpeg;base64,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",
        name: "Hero",
        point: "1000",
    },
    {
        src:"data:image/png;base64,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",
        name:"Celever",
        point:"500"
    },
    {
        src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcd0hjGm9IJXI1CEdUfXUiNthJXkw6GkeTi19V92BRJLTF3NEmjw",
        name:"Best",
        point:"600"
    },
    {
        src:"https://images.vexels.com/media/users/3/137458/isolated/preview/e8670e0313b4445e0365b106ad570c6b-flat-badge-label-ribbon-by-vexels.png",
        name:"Havij",
        point:"100"
    },
    {
        src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ67g0V8HL_VM9L3BRCDYOVUAWxtEhQDpgDBomzY2C-3B_GO6Hd",
        name:"Champion",
        point:"2000"
    },
    {
        src:"http://www.pngmart.com/files/9/Award-Badge-PNG-Picture.png",
        name:"Star",
        point:"400"
    },
    {
        src: "https://images.vexels.com/media/users/3/137485/isolated/preview/1e81e1076e981b2f03c3f6b65dbaca6e-ribbon-badge-label-by-vexels.png",
        name:"Gold",
        point: "800"
    },
    {
        src: "data:image/jpeg;base64,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",
        name: "Hero",
        point: "1000",
    },
    {
        src:"data:image/png;base64,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",
        name:"Celever",
        point:"500"
    },
    {
        src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcd0hjGm9IJXI1CEdUfXUiNthJXkw6GkeTi19V92BRJLTF3NEmjw",
        name:"Best",
        point:"600"
    },
    {
        src:"https://images.vexels.com/media/users/3/137458/isolated/preview/e8670e0313b4445e0365b106ad570c6b-flat-badge-label-ribbon-by-vexels.png",
        name:"Havij",
        point:"100"
    },
    {
        src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ67g0V8HL_VM9L3BRCDYOVUAWxtEhQDpgDBomzY2C-3B_GO6Hd",
        name:"Champion",
        point:"2000"
    },
    {
        src:"http://www.pngmart.com/files/9/Award-Badge-PNG-Picture.png",
        name:"Star",
        point:"400"
    },
    {
        src: "https://images.vexels.com/media/users/3/137485/isolated/preview/1e81e1076e981b2f03c3f6b65dbaca6e-ribbon-badge-label-by-vexels.png",
        name:"Gold",
        point: "800"
    },
    {
        src:"http://www.pngmart.com/files/9/Award-Badge-PNG-Picture.png",
        name:"Star",
        point:"400"
    },
    {
        src: "https://images.vexels.com/media/users/3/137485/isolated/preview/1e81e1076e981b2f03c3f6b65dbaca6e-ribbon-badge-label-by-vexels.png",
        name:"Gold",
        point: "800"
    }
];
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
};

init_badges();
init_albume();

$(".card img").hover(function(){
    $(this).siblings(".hover-part").css("top","0")
})
$(".card").mouseleave(function(){
    $(this).find(".hover-part").css("top","-200px")
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
    if ($("#badgeName").val().length < 1){
        console.log($("#badgeName").val().length)
        $(".preview h5").text("Badge name ...");
    }
})
$("#badgeDescription").on('input',function(e){
    $(".preview .description").text($("#badgeDescription").val());
    if ($("#badgeDescription").val().length < 1){
        console.log($("#badgeDescription").val().length)
        $(".preview .description").text(" description ... ");
    }
})

$("#badgePoints").on('input',function(e){
    $(".preview .badge-label span").text($("#badgePoints").val());
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

$("#badgeAlbume img").click(function(){
    $(".preview img").attr( "src",$(this).attr("src"))
})

function init_badges() {
    // let card = $(".badge_card");
    for (var i = 0;i<badges.length;i++){
        let card = $("#created_badge_table_keeper .source").clone();
        card.removeClass("source");
        card.find(".card-title").text(badges[i].name);
        card.find("img").attr("src",badges[i].src);
        card.find(".font-weight-bold").text(badges[i].point);
        card.insertAfter($("#created_badge_table_keeper .source"));
    }
}

function init_albume() {
    for (var i = 0;i<badges.length;i++){
        let card = $("#badgeAlbume .source").clone();
        card.removeClass("source");
        card.css("display","block")
        card.attr("src",badges[i].src);
        card.insertAfter($("#badgeAlbume .source"));
    }
}



