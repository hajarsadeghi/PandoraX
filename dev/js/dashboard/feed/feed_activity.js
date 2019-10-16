
import { getFeed } from './../../api';
import { showFeed, toggleLikeAction } from './feed'


$(document).ready(function() {
    let loading = true;

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
            if (loading) {
                feed_pagin = feed_pagin + 1;
                loading = false;
                // ... show feed
                getFeed({
                    pagin: true,
                    data_limit: 3,
                    page: feed_pagin
                }, (status, response) => {
                    if (status) {
                        loading = true;
                        showFeed(response.data);
                        $('.like-link').bind('click', event => toggleLikeAction(event))
                    }
                })
            }
        }
    });

    $('.view-more-comments-link').click(() => {
        $('.view-more-comments').find('img').removeClass('d-none');
    });
})
