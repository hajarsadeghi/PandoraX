import { InitializePostDropzone } from '../../helper/dropzone';
import { regular_post_media_ids } from './variables';
import { hideTintedBackdrop } from './../../helper';
import { getFeed, newPost } from './../../api';
import { showFeed, toggleLikeAction } from './feed';



InitializePostDropzone((status, res) => {
    if (status) {
        regular_post_media_ids.push(res.id)
    }
})

// ... New Regular post 
$('#myTabContent').on('click', '#regularPostBtn', function() {
    newPost({
        text: $('#myTabContent').find('#RegularPostContent').val(),
        media: regular_post_media_ids
    }, (status) => {
        if (status) {
            feed_pagin = 1;
            getFeed({
                pagin: true,
                data_limit: 3,
                page: feed_pagin
            },(stat, res) => {
                if (stat) {
                    $('.feed-activity').html('');
                    showFeed(res.data)
                    $('.like-link').bind('click', event => toggleLikeAction(event))
                    resetRegularPost();
                }
            })
        }
    })
})

function resetRegularPost() {
    regular_post_media_ids.push([]);
    $('#RegularPostContent').val('');
    $('#postUpload').find('.dropzone').removeClass('.dz-preview');
    $('#postUpload').find('.dz-preview').remove();
    hideTintedBackdrop();
}

