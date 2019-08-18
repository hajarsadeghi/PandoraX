$(document).ready(function() {
    // ... initialize emoji
    $("#postContent").emojioneArea();
    $("#postContent").data("emojioneArea").enable();

    $('#postToggled').on('click', () => {
        if (!$('#postToggled').attr('area-expanded')) {
            $('#postToggled').attr('aria-expanded', 'true');
            $('#postExpanded').collapse('show');
            $('.tinted').css({'visibility':'visible', 'opacity': '1'});
        }
    });

    $('.tinted').on('click', () => {
        if ($('#postToggled').attr('aria-expanded')) {
            $('#postToggled').attr('aria-expanded', 'false');
            $('#postExpanded').collapse('hide');
            $('.tinted').css({'visibility':'hidden', 'opacity': '0'});
        }
    })
});