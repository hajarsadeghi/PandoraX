import { postComment, viewComment, likeComment } from './../../api';
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
            $(this).closest('.feed').find('.cmts-container').empty()
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

    $(document).on('click', '.like-cmt', function() {
        let $this = $(this),
            feed_id = $this.closest('.feed').attr('feed-id'),
            comment_id = $this.closest('.comment-row').attr('comment-id');
        likeComment(
            feed_id,
            comment_id,
            (status, response) => {
            if (status) {
                if (response.like_count) {
                    $this.closest('.comment-row').find('.like-cmts-badge').addClass('d-flex')
                    $this.closest('.comment-row').find('.like-cmts-badge').removeClass('d-none')
                    $this.closest('.comment-row').find('.like-cmts-badge span').text(response.like_count);
                    if (response.status === 'liked') {
                        $this.closest('.comment-row').find('.like-cmts-badge i').attr('class', 'material-icons md-18 like css animated')
                    }
                    else {
                        $this.closest('.comment-row').find('.like-cmts-badge i').attr('class', 'material-icons material-icons-outlined md-18 like css')
                    }
                }
                else {
                    $this.closest('.comment-row').find('.like-cmts-badge').removeClass('d-flex')
                    $this.closest('.comment-row').find('.like-cmts-badge').addClass('d-none')
                }
            }
        })
    })

    $(document).on('click', '.reply-cmt', function() {
        let $this = $(this);
        $this.closest('.comment-row').find('.reply-row').removeClass('d-none')
        $this.closest('.comment-row').find('.reply-row').addClass('d-flex')
    })
})