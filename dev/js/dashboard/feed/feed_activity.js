
import { getFeed } from './../../api';
import { showFeed } from './feed'


getFeed((status, response) => {
    if (status) {
        $('.feed-activity').html('');
        showFeed(response.data);
    }
})
$('.view-more-comments-link').click(() => {
    $('.view-more-comments').find('img').removeClass('d-none');
});

