$(document).ready(function() {
    // ... initialize emoji
    $(".post-content").emojioneArea();
    $(".post-content").data("emojioneArea").enable();
    $('.point-recognition').attr('is-input-visible', false);
    // ... post collapse via js
    $('.post-toggled').on('click', () => {
        if (!$(this).attr('area-expanded')) {
            $(this).attr('aria-expanded', 'true');
            $(this).find('.post-expanded').collapse('show');
            $('.tinted').css({'visibility':'visible', 'opacity': '1'});
        }
    });
    // ... post backdrop
    $('.tinted').on('click', () => {
        if ($(this).attr('aria-expanded')) {
            $(this).attr('aria-expanded', 'false');
            $(this).find('.post-expanded').collapse('hide');
            $('.tinted').css({'visibility':'hidden', 'opacity': '0'});
            $('.selected-badge-container,.post-recognition').addClass('d-none');
            $('.use-badge-section').removeClass('d-none');
        }
    });
    // ... load data on scroll in privacy modal
    $('#privacyModal .modal-body').on('scroll',() => {
        if ($('.modal-body').scrollTop() + $('.modal-body').innerHeight() >= $('#privacyModal .modal-body')[0].scrollHeight) {
            console.log('end of the scroll')    
        }
    });

    // ... recognition modal

    // ... load animation using lottie ...
    LottieAnimation(['rewardBadge', 'rewardBadge1'])
    
    // ... generate mock badges & users
    clone($('#privacyModal').find(".select-privacy:last-child"), 19);
});

// ... privacy setting 
$('.selected-privacy').on('click', (e) => {
    $(e.target).closest('.selected-privacy').addClass('d-none');
    $('.select-privacy-container').find('.select-row-radio').removeClass('selected');
});

$('#privacyModal .select-privacy').on('click', (e) => {
    $('.select-privacy-container').find('.select-row-radio').removeClass('selected');
    $('.selected-privacy').removeClass('d-none');
    $(e.target).closest('.select-privacy').find('.select-row-radio').toggleClass('selected');
});

// ... custom functions
function clone(target, count) {
    for (var i = 0;i < count;i++){
        let user = target.clone(true);
        user.insertAfter(target);
    }
}

function LottieAnimation(array) {
    for (let i = 0; i < array.length; i++) {
        lottie.loadAnimation({
            container: document.getElementById(array[i]),
            path: reward_badge,
            renderer: 'svg',
            autoplay: true,
            loop: true
        }); 
    }   
}