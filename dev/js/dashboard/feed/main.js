$(document).ready(function() {
    // ... initialize emoji
    $("#postContent").emojioneArea();
    $("#postContent").data("emojioneArea").enable();
    $('.point-recognition').attr('is-input-visible', false);

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
    });

    

    $('body').on('click',() => {
        if ($('.point-recognition').find('#pointRecognitionInput').val()) {
            $('#pointRecognitionBadge').text($('.point-recognition').find('#pointRecognitionInput').val());
        }
        else {
            $('#pointRecognitionBadge').text('Recognize via Points');
            
        }
    });

    $('#privacyModal .modal-body').on('scroll',() => {
        if ($('.modal-body').scrollTop() + $('.modal-body').innerHeight() >= $('#privacyModal .modal-body')[0].scrollHeight) {
            console.log('end of the scroll')    
        }
    })
});