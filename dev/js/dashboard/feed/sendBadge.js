import { getUsers, getBadgeList, newPost, getFeed, getLeaderboard } from './../../api';
import { load_badges } from './../../helper/badges';
import { hideTintedBackdrop } from './../../helper';
import { showFeed, toggleLikeAction } from './feed';
import { topRecords } from './leaderboard';




let choose_colleage = '',
    search_value = '',
    page_number = 1;


$('#useBadgeBtn').on('click', function() {
    let users_res = false,
        badges_res = false;
    $('#giveBadge').find('#created_badge_table_keeper').empty();
    getUsers(
        {
        pagin: true,
        data_limit: 15,
        page: 1,
        exclude_myself: true
    }, (status, response) => {
        if (status) {
            users_res = true;
            $('.who-to-recognize-container').empty();
            getUsersList(response.data)
            openModal(users_res, badges_res)
        }
        else {
            console.log(response)
        }
    })

    getBadgeList((status, res) => {
        if (status) {
            badges_res = true;
            load_badges(false, res);
            openModal(users_res, badges_res)
        }
        else {
            console.log(res)
        }
    })
})

$('#chooseColleague').on('keyup', function() {
    clearTimeout(choose_colleage);
    page_number = 1;
    search_value = $(this).val().toLowerCase();
    choose_colleage = setTimeout(function() {
        getUsers({
            search: search_value,
            pagin: true,
            data_limit: 12,
            page: 1
        }, (status, response) => {
            if (status) {
                $('.who-to-recognize-container').empty();
                getUsersList(response.data)
            }
            else {
                console.log(response)
            }
        })
    }, 500) 
})

// ... load data on scroll in privacy modal
$('#recognitionModal .modal-body').on('scroll', () => {
    if ($('#recognitionModal .modal-body').scrollTop() + $('#recognitionModal .modal-body').innerHeight() + 1 >= $('#recognitionModal .modal-body')[0].scrollHeight) {
        page_number++
        getUsers({
            search: search_value,
            pagin: true,
            data_limit: 12,
            page: page_number
        }, (status, response) => {
            if (status) {
                getUsersList(response.data)
            }
            else {
                console.log(response)
            }
        })
    }
})

$('.recognition-btn').on('click',() => {
    $('.recognition-container,.recognition-btn').toggleClass('d-none');
});

$('.recognized-person').on('click', (e) => {
    $(e.target).closest('.recognized-person').addClass('d-none');
    $('.recognition-btn').attr('disabled', true);
    $('.who-to-recognize-container').find('.select-row-radio').removeClass('selected');
});

$('#recognitionModal').on('click', '.who-to-recognize-row', function(e) {
    let user_id     = $(this).attr('user_id'),
        username    = $(this).find('.username').text(),
        occupation  = $(this).find('.occupation').text(),
        img_src     = $(this).find('img').attr('src') ? $(this).find('img').attr('src') : null,
        user_initial= $(this).attr('user_initials');

    $('.recognized-person').find('.username').text(username);
    $('.recognized-person').find('.occupation').text(occupation);
    img_src ?
    $('.recognized-person').find('.avatar').html('<img class="img-fluid" src="'+ img_src +'" alt="profile picture" />') :
    $('.recognized-person').find('.avatar').html('<span class="text-dark initials">'+ user_initial +'</span> ')

    $('.recognized-person').attr('user_id', user_id);
    $('.recognized-person').attr('username', username);
    $('.recognized-person').attr('occupation', occupation);
    $('.recognized-person').attr('img-src', img_src)
    $('.recognized-person').attr('user_initials', user_initial)
    
    $('.who-to-recognize-container').find('.select-row-radio').removeClass('selected');
    $(e.target).closest('.who-to-recognize-row').find('.select-row-radio').toggleClass('selected');
    $('.recognition-btn').attr('disabled', false);
    $('.recognized-person').removeClass('d-none');
});

$('#recognitionModal').on('click', '.card-stats', function(e) {
    let $this = $(this),
        selectedCard = $this.closest('.card-stats');
    if ($this.attr('has-credit') === 'true') {
        $('.card-stats').not(selectedCard).removeClass('selected-badge-border');
        selectedCard.toggleClass('selected-badge-border');

        let selected_user = $('.recognized-person');
        let selected_user_obj = {
            id:     selected_user.attr('user_id'),
            name:   selected_user.attr('username'),
            img_src:    selected_user.attr('img-src'),
            user_initials: selected_user.attr('user_initials')
        }
        $('.selected-badge-container').find('.user-card').attr('user_id', selected_user_obj.id);
        $('.selected-badge-container').find('.user-card .card-title').text(selected_user_obj.name);
        selected_user_obj.img_src ?
            $('.selected-badge-container').find('.user-card .avatar').html('<img class="img-fluid mx-auto" src="'+ selected_user_obj.img_src +'" alt="badge icon">') :
            $('.selected-badge-container').find('.user-card .avatar').html('<span class="text-dark initials">'+ selected_user_obj.user_initials +'</span>')

        let selected_badge = $('#giveBadge').find('.selected-badge-border');
        let selected_badge_obj = {
            name:   selected_badge.attr('badge-name'),
            id:     selected_badge.attr('badge-id'), 
            points: selected_badge.attr('badge-points'),
            src:    selected_badge.attr('badge-src'),
            des:    selected_badge.attr('badge-des')
        }
        $('.selected-badge-container').find('.badge-card').attr('badge_id', selected_badge_obj.id);
        $('.selected-badge-container').find('.badge-card img').attr('src', selected_badge_obj.src);
        $('.selected-badge-container').find('.badge-card .card-title span').text(selected_badge_obj.name);
        $('.selected-badge-container').find('.badge-card .card-title small').text(selected_badge_obj.points);
        $('.selected-badge-container').removeClass('d-none');
        
        $('.use-badge-section').addClass('d-none')
        $('.selected-badge-info').removeClass('d-none');
        $('.post-recognition').removeClass('d-none');
        $('#recognitionModal').modal('hide');   
        $('#recognitionModal').find('#recognizeWho, #nextBtn').removeClass('d-none');
        $('#recognitionModal').find('#giveBadge, #previouseBtn').addClass('d-none')
    }
});

// ... load data on scroll in privacy modal
$('#privacyModal .modal-body').on('scroll',() => {
    if ($('.modal-body').scrollTop() + $('.modal-body').innerHeight() >= $('#privacyModal .modal-body')[0].scrollHeight) {
        console.log('end of the scroll')    
    }
});

$('.post').on('click', '.selected-badge-info', function() {
    $('.recognized-person').removeClass('d-none');
    if ($(this).find('.card').hasClass('badge-card')) {
        $('#recognizeWho').addClass('d-none');
        $('#giveBadge').removeClass('d-none');
        $('#nextBtn').addClass('d-none');
        $('#previouseBtn').removeClass('d-none')
    }
    else {
        $('#giveBadge').addClass('d-none');
        $('#recognizeWho').removeClass('d-none');
        $('#previouseBtn').addClass('d-none');
        $('#nextBtn').removeClass('d-none')
    }
})

$('.post').on('click', '.remove-recognition', function() {
    resetRecognitionPost();
})

// ... New Recgonition
$('#myTabContent').on('click', '#recognitionPostBtn', function() {
    newPost({
        text: $('#myTabContent').find('#recognitionContent').val(),
        recognition: {
            user: $('#recognitionExpanded').find('.user-card').attr('user_id'),
            badge: $('#recognitionExpanded').find('.badge-card').attr('badge_id')
        }
    }, (status, response) => {
        if (status) {
            feed_pagin = 1;
            $('.wallet').find('#budgetPoints').text(response.wallet.budget_point_amount);
            $('.wallet').find('#earnedPoints').text(response.wallet.earned_point_amount);
            // ... update feed
            getFeed({
                pagin: true,
                data_limit: 3,
                page: feed_pagin
            },(stat, res) => {
                if (stat) {
                    $('.feed-activity').html('');
                    showFeed(res.data)
                    $('.like-link').bind('click', event => toggleLikeAction(event))
                    resetRecognitionPost();
                }
            })
            // ... update leaderboard
            getLeaderboard((status, response) => {
                status ? topRecords(response) : null;
            })
        }
    })
})

// ... generate mock badges & users
clone($('#privacyModal').find(".select-privacy:last-child"), 19);

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



function openModal(status1, status2) {
    if (status1 && status2) {
        $('#recognitionModal').modal('show');        
    }
}

function getUsersList(users) {
    for (let i = 0; i < users.length; i++) {
        let profile = '';
        if (users[i].profile_picture) {
            profile = '<img class="img-fluid" src="'+ users[i].profile_picture +'" alt="profile picture" /> '
        }
        else {
            profile = '<span class="text-dark initials">'+ users[i].name_chars +'</span> ';
        }

        $('.who-to-recognize-container').append(
            '<div class="who-to-recognize-row d-flex my-2" user_id="'+ users[i].id +'" user_initials="'+ users[i].name_chars +'">' +
                '<div class="px-3 align-self-center">' +
                    '<div class="media">' +
                        '<span class="avatar avatar-sm rounded-circle bg-white shadow-sm">' +
                            profile +
                        '</span> ' +
                        '<div class="media-body ml-2">' +
                            '<span class="username mb-0 text-sm font-weight-bold">'+ users[i].full_name +'</span> ' +
                            '<small class="occupation text-muted d-block">'+ users[i].job_title +'</small>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="flex-grow-1 align-self-center mt-2">' +
                    '<div class="text-right">' +
                        '<span class="select-row-radio"></span> ' +
                    '</div>' +
                '</div>' +
            '</div>'
        )
    }
}

export function resetRecognitionPost() {
    $('#recognitionContent').val('');
    $('.recognition-post-content').text('');
    $('#recognitionExpanded').find('.selected-badge-container').addClass('d-none');
    $('#recognitionExpanded').find('.badge-card').removeAttr('badge_id');
    $('#recognitionExpanded').find('.badge-card img').attr('src','');
    $('#recognitionExpanded').find('.badge-card .card-title span, .badge-card .card-title small').html('')
    $('#recognitionExpanded').find('.user-card').removeAttr('user_id');
    $('#recognitionExpanded').find('.user-card img').attr('src','');
    $('#recognitionExpanded').find('.initials').text('');
    $('.selected-badge-container,.post-recognition').addClass('d-none');
    $('.use-badge-section').removeClass('d-none');
    $('#recognitionModal').find('.recognized-person').addClass('d-none');
    $('#recognitionModal').find('#giveBadge .card-stats').removeClass('selected-badge-border');
    hideTintedBackdrop();
}