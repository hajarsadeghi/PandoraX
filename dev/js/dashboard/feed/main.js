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
    clone($('#recognitionModal #giveBadge').find(".card-stats:last-child"), 40);

    $('.recognition-btn').on('click',() => {
        $('.recognition-container,.recognition-btn').toggleClass('d-none');
    });

    $('.recognized-person').on('click', (e) => {
        $(e.target).closest('.recognized-person').addClass('d-none');
        $('.who-to-recognize-container').find('.select-row-radio').removeClass('selected');
    });

    $('#recognitionModal').on('click', '.who-to-recognize-row', function(e) {
        let username = $(this).find('.username').text(),
            occupation = $(this).find('.occupation').text(),
            img_src = $(this).find('img').attr('src');
        $('.who-to-recognize-container').find('.select-row-radio').removeClass('selected');
        $('.recognized-person').find('.username').text(username);
        $('.recognized-person').find('.occupation').text(occupation);
        $('.recognized-person').find('img').attr('src', img_src);
        $('.recognized-person').removeClass('d-none');
        $(e.target).closest('.who-to-recognize-row').find('.select-row-radio').toggleClass('selected');
    });

    $('.card-stats').on('click', (e) => {
        let selectedCard = $(e.target).closest('.card-stats');
        $('.card-stats').not(selectedCard).removeClass('selected-badge-border');
        selectedCard.toggleClass('selected-badge-border');

        let selected_user = $('.recognized-person');
        let selected_user_obj = {
            id: 6,
            name: selected_user.attr('username'),
            img: selected_user.find('img').attr('src')
        }
        $('.selected-badge-container').find('.user-card').attr('id', selected_user_obj.id);
        $('.selected-badge-container').find('.user-card img').attr('src', selected_user_obj.img);
        $('.selected-badge-container').find('.user-card .card-title').text(selected_user_obj.name);
        $('.selected-badge-container').removeClass('d-none');

        let selected_badge = $('#giveBadge').find('.selected-badge-border');
        let selected_badge_obj = {
            name: selected_badge.attr('badge-name'),
            id: selected_badge.attr('badge-id'), 
            points: selected_badge.attr('badge-points'),
            src: selected_badge.attr('badge-src'),
            des: selected_badge.attr('badge-des')
        }
        $('.selected-badge-container').find('.badge-card').attr('id', selected_badge_obj.id);
        $('.selected-badge-container').find('.badge-card img').attr('src', selected_badge_obj.src);
        $('.selected-badge-container').find('.badge-card .card-title span').text(selected_badge_obj.name);
        $('.selected-badge-container').find('.badge-card .card-title small').text(selected_badge_obj.points);
        $('.selected-badge-container').removeClass('d-none');
        
        $('.use-badge-section').addClass('d-none')
        $('.post-recognition').removeClass('d-none');
        $('#recognitionModal').modal('hide');
    });
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