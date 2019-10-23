import { postComment, viewComment } from './../../api';
import { comments } from './feed';



$(document).ready(function() {
    $(document).on('keyup change', '.comment-content', function(e) {
        let $this = $(this),
            activityId = $this.closest('.feed').attr('feed-id'),
            elemId = $($this.siblings('textarea.comment-content')).attr('id'),
            text = $($('#' + elemId)[0]).siblings('div.textarea-control').text();
            // console.log($($('#' + $id)[0]).siblings('div.textarea-control').html().replace(/<\/div>/g,"\n"))
        if (e.code === 'Enter') {
            postComment(
                activityId,{
                text: text
            },(status) => {
                if (status) {
                    $($('#' + elemId)[0]).siblings('div.textarea-control').html('')
                    viewComment(activityId,
                        (status, response) => {
                            if (status) {
                                $('#commentsContainer_' + activityId).find('.cmts-container').html('')
                                comments(response.data, undefined, activityId)
                            }
                        })
                }
            })
        }
    })  
    // ... view comments
    $(document).on('click','.open-cmts', function(e) {
        let activityId = $(this).closest('.feed').attr('feed-id'),
            $collapseElem = $(this).closest('.feed').find('.comments-container');
        if (!$collapseElem.hasClass('show')) {
            viewComment(activityId,
                (status, response) => {
                    if (status) {
                        comments(response.data, undefined, activityId, () => {
                            $collapseElem.collapse('show')
                        })
                    }
                })
        }
        else {
            $collapseElem.collapse('hide')
        }
    })
})