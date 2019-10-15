import { InitializePostDropzone } from '../../helper/dropzone';
import { regular_post_media_ids } from './variables';
import { hideTintedBackdrop } from './../../helper';
import { new_post } from './../../api';



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
    }, (status, response) => {
        if (status) {
            resetRegularPost();
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

