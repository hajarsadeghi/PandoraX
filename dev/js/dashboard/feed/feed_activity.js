
import { getFeed, toggleLike } from './../../api';
import { showFeed } from './feed'


$(document).ready(function() {
    // ... show feed
    getFeed((status, response) => {
        if (status) {
            $('.feed-activity').html('');
            showFeed(response.data);
            $('.like-link').bind('click', event => toggleLikeAction(event))
        }
    })
    
    // ... toggle like
    function toggleLikeAction(e) {
        e.preventDefault(e)

        let like_link = $(e.target).closest('.like-link')
        toggleLike({
            activity_id: like_link.closest('.feed').attr('feed-id'),
            status: like_link.attr('is-liked') ? 'liked' : 'disliked',
            like_cound: 1
        }, (status, res) => {
            if (status) {
                like_link.closest('.feed').find('.like-count').text(res.like_count + ' likes')
                if (res.like_count === 1) {
                    like_link.find('span:first-child').removeClass('material-icons-outlined');
                    like_link.find('span:first-child').addClass('material-icons')
                }
                else {
                    like_link.find('span:first-child').removeClass('material-icons');
                    like_link.find('span:first-child').addClass('material-icons-outlined')
                }
            }
        })
    }

    $('.view-more-comments-link').click(() => {
        $('.view-more-comments').find('img').removeClass('d-none');
    });
})
