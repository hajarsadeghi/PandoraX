
import { getFeed, listOfLikers, getWallet } from './../../api';
import { showFeed, toggleLikeAction } from './feed';
import { usersList } from './../../helper/usersList';


$(document).ready(function() {
    let loading = true,
        feed_max_page = 2;

    // ... show feed
    getFeed({
        pagin: true,
        data_limit: 3,
        page: feed_pagin
    }, (status, response) => {
        if (status) {
            $('.feed-activity').html('');
            showFeed(response.data);
            $('.like-link').bind('click', event => toggleLikeAction(event))
        }
    })
  
    // ... load more feed on scroll down
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() > ($(document).height() - 2)) {
            if (loading && feed_pagin < feed_max_page) {
                feed_pagin = feed_pagin + 1;
                loading = false;
                // ... show feed
                getFeed({
                    pagin: true,
                    data_limit: 3,
                    page: feed_pagin
                }, (status, response) => {
                    if (status) {
                        feed_max_page = response.max_page;
                        loading = true;
                        showFeed(response.data);
                        $('.like-link').bind('click', event => toggleLikeAction(event))
                    }
                })
            }
        }
    });

    $(document).on('click', '.like-count', function(e) {
        listOfLikers(
            $(this).attr('activity_id')
            , (status, response) => {
            if (status) {
                usersList(response.data, (users) => {
                    $('#likersModal').find('.modal-body').html(users);
                    $('#likersModal').modal('show');
                })
            }
        })
    })

    $(document).on('click', '.emoji-picker', function() {
        let $this = $(this),
            $this_emoji = $this.prev();
        $(document).find('.emoji-menu').not($this_emoji).css('display', 'none');
    })
    
    // ... Web Socket 
    var feedWebSocket = new WebSocket('ws://localhost/ws/feed/'+ space_slug +'/');
    feedWebSocket.onmessage = function(event) {
        setTimeout(function() {
            if (JSON.parse(event.data).type === 'new_activity' && JSON.parse(event.data).data.id !== $('.feed-activity').find('.feed:first-child').attr('feed-id')) {
                if ($(window).scrollTop() > $(window).height()) {
                    $('.feed-web-socket').removeClass('d-none');
                }
                else {
                    loadFeedFromStart()
                }
            }
        }, 500)
    };
})

$(document).on('click', '.feed-web-socket', function() {
    loadFeedFromStart()
})

function loadFeedFromStart() {
    // ... show feed
    getFeed({
        pagin: true,
        data_limit: 3,
        page: 1
    }, (status, response) => {
        if (status) {
            $('.feed-web-socket').addClass('d-none')
            $('.feed-activity').html('');
            showFeed(response.data);
            $('.like-link').bind('click', event => toggleLikeAction(event))

            let login_user_id = $('.user-info-dropdown').attr('user-id');
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].recognition && (Number(response.data[i].recognition.to_user.id) === Number(login_user_id))) {
                    getWallet((status, response) => {
                        if (status) {
                            $('.wallet').find('#budgetPoints').text(response.budget_point_amount);
                            $('.wallet').find('#earnedPoints').text(response.earned_point_amount);
                        }
                    })
                }
                break;
            }
        }
    })
}



