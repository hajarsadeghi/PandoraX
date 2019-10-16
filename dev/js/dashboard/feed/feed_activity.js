
import { getFeed } from './../../api';
import { showFeed, toggleLikeAction } from './feed'


$(document).ready(function() {
    // ... show feed
    getFeed((status, response) => {
        if (status) {
            $('.feed-activity').html('');
            showFeed(response.data);
            $('.like-link').bind('click', event => toggleLikeAction(event))
        }
    })
    
    $('.view-more-comments-link').click(() => {
        $('.view-more-comments').find('img').removeClass('d-none');
    });
})
