
import { getFeed, toggleLike } from './../../api';
import { showFeed } from './feed'


getFeed((status, response) => {
    if (status) {
        $('.feed-activity').html('');
        showFeed(response.data);
    }
})

$(document).ready(function() {
    // ... toggle like
    $('.like-link').on('click', function(e) {
        e.preventDefault()

        let like_link = $(this).closest('.like-link')
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
    })

    $('.view-more-comments-link').click(() => {
        $('.view-more-comments').find('img').removeClass('d-none');
    });
})
