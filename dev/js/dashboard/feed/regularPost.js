import { InitializePostDropzone } from '../../helper/dropzone';
import { hideTintedBackdrop } from './../../helper';
import { getFeed, newPost } from './../../api';
import { showFeed, toggleLikeAction } from './feed';



InitializePostDropzone((status, elem, res, removed_img_id) => {
    if (status === 'added') {
        $(elem).attr('img-id', res.id)
        regular_post_media_ids.push(res.id)
    }
    else if (status === 'removed') {
        let index = regular_post_media_ids.indexOf(Number(removed_img_id));
        index > -1 ? regular_post_media_ids.splice(index, 1) : null;
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

export function resetRegularPost() {
    regular_post_media_ids.push([]);
    $('#RegularPostContent').val('');
    $('.regular-post-content').text('');
    $('#postUpload').find('.dropzone').removeClass('dz-started');
    $('#postUpload').find('.dz-preview').remove();
    $('#postUpload').collapse('hide');
    hideTintedBackdrop();
}

