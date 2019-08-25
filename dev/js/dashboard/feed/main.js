$(document).ready(function() {
    // ... initialize emoji
    $(".post-content").emojioneArea();
    $(".post-content").data("emojioneArea").enable();
    $('.point-recognition').attr('is-input-visible', false);

    $('.post-toggled').on('click', () => {
        if (!$(this).attr('area-expanded')) {
            $(this).attr('aria-expanded', 'true');
            $(this).find('.post-expanded').collapse('show');
            $('.tinted').css({'visibility':'visible', 'opacity': '1'});
        }
    });

    $('.tinted').on('click', () => {
        if ($(this).attr('aria-expanded')) {
            $(this).attr('aria-expanded', 'false');
            $(this).find('.post-expanded').collapse('hide');
            $('.tinted').css({'visibility':'hidden', 'opacity': '0'});
        }
    });

    cloneUser();
    function cloneUser() {
        for (var i = 0;i < 20;i++){
            let user = $('#privacyModal').find(".select-privacy:last-child").clone(true);
            user.insertAfter($('#privacyModal').find('.select-privacy:last-child'));
        }
    }

    $('#privacyModal .modal-body').on('scroll',() => {
        if ($('.modal-body').scrollTop() + $('.modal-body').innerHeight() >= $('#privacyModal .modal-body')[0].scrollHeight) {
            console.log('end of the scroll')    
        }
    });

    $('.recognition-btn').on('click',() => {
        $('.recognition-container,.recognition-btn').toggleClass('d-none');
    });

    $('.card-stats').on('click', () => {
        $(this).closest('.card-stats').toggleClass('selected-badge-border');
    });

    // $('body').on('click',() => {
    //     if ($('.point-recognition').find('#pointRecognitionInput').val()) {
    //         $('#pointRecognitionBadge').text($('.point-recognition').find('#pointRecognitionInput').val());
    //     }
    //     else {
    //         $('#pointRecognitionBadge').text('Recognize via Points');
            
    //     }
    // });
});