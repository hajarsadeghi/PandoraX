import { InitializePostDropzone } from '../../helper/dropzone';
import { regular_post_media_ids } from './variables';
import { hideTintedBackdrop } from './../../helper';
import { new_post } from './../../api';
import { showFeed } from './feed';



InitializePostDropzone((status, res) => {
    if (status) {
        regular_post_media_ids.push(res.id)
    }
})

// ... New Regular post 
$('#myTabContent').on('click', '#regularPostBtn', function() {
    new_post({
        text: $('#myTabContent').find('#RegularPostContent').val(),
        media: regular_post_media_ids
    }, (status) => {
        if (status) {
            getFeed((stat, res) => {
                if (stat) {
                    showFeed(res.data)
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

