
import { getFeed, listOfLikers } from './../../api';
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
        if($(window).scrollTop() + $(window).height() > ($(document).height() - 50)) {
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
    var webSocket = new WebSocket('ws://localhost/ws/feed/'+ space_id +'/');
    console.log(webSocket, '=== websocket')
})

