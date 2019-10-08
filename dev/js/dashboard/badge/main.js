import { 
        get_badge_images,
        get_badge_list,
        add_new_badge
        } 
        from './../../api';
import { load_badges } from './../../helper/badges';
import { InitializeBadgeDropzone } from './../../helper/dropzone';



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
InitializeBadgeDropzone((status, res) => {
    if (status) {
        badge_obj.icon_id = res.id
        badge_obj.icon_src = res.src;
        $("#previewImg").attr( "src", res.src)
    }
});
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
        $(".preview h5").text("Badge name ...");
    }
})
$("#badgeDescription").on('input',function(e){
    $(".preview .description").text($("#badgeDescription").val());
    badge_obj.description = $(this).val();
    if ($("#badgeDescription").val().length < 1){
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




