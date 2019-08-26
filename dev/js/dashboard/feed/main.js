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

    // ... generate mock badges
    cloneUser();

    $('#privacyModal .modal-body').on('scroll',() => {
        if ($('.modal-body').scrollTop() + $('.modal-body').innerHeight() >= $('#privacyModal .modal-body')[0].scrollHeight) {
            console.log('end of the scroll')    
        }
    });

    $('.recognition-btn').on('click',() => {
        $('.recognition-container,.recognition-btn').toggleClass('d-none');
    });

    $('.card-stats').on('click', (e) => {
        let selectedCard = $(e.target).closest('.card-stats');
        console.log(selectedCard,'----selectedCard')
        $('.card-stats').not(selectedCard).removeClass('selected-badge-border');
        selectedCard.toggleClass('selected-badge-border');
    });

    $('#selectBadgeBtn').on('click', () => {
        
        let selected_badge = $('#giveBadge').find('.selected-badge-border');
        let selected_badge_obj = {
            name: selected_badge.attr('badge-name'),
            id: selected_badge.attr('badge-id'), 
            points: selected_badge.attr('badge-points'),
            src: selected_badge.attr('badge-src'),
            des: selected_badge.attr('badge-des')
        }

        $('.selected-badge-container').html('');
        $('.selected-badge-container').html(
            '<hr class="my-3" />' +
            '<div class="d-flex selected-badge-info align-items-start">' + 
                '<div class="card selected-badge-card border-1 p-1" data-toggle="modal" data-target="#recognitionModal" id="' + selected_badge_obj.id + '"> ' +
                    '<img class="img-fluid" src="'+ selected_badge_obj.src +'" alt="badge icon">' +
                    '<div class="badge-label text-center">' +
                        '<h5 class="card-title text-uppercase text-muted mb-0">' + selected_badge_obj.name + '</h5>' +
                        '<span class="h5 font-weight-bold mb-0"> '+ selected_badge_obj.points +' </span>' +
                    '</div>' +
                '</div>' +
                '<div class="d-inline-block px-2 flex-grow-1">' +
                    '<p> descreption: ' + selected_badge_obj.des + '</p>' +
                '</div>' +
            '</div>'
        );
        
        $('.post-recognition').removeClass('d-none');
        $('.use-badge-section').addClass('d-none')
        $('#recognitionModal').modal('hide');
    });

    function cloneUser() {
        for (var i = 0;i < 20;i++){
            let user = $('#privacyModal').find(".select-privacy:last-child").clone(true);
            user.insertAfter($('#privacyModal').find('.select-privacy:last-child'));
        }
    }

    // $('body').on('click',() => {
    //     if ($('.point-recognition').find('#pointRecognitionInput').val()) {
    //         $('#pointRecognitionBadge').text($('.point-recognition').find('#pointRecognitionInput').val());
    //     }
    //     else {
    //         $('#pointRecognitionBadge').text('Recognize via Points');
            
    //     }
    // });
});