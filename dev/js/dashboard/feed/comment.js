import { postComment, viewComment, likeComment } from './../../api';
import { comments, replies, initializeEmoji } from './feed';



$(document).ready(function() {
    // ... comment and reply
    $(document).on('keyup change', '.comment-content', function(e) {
        let $this = $(this),
            activityId = $this.closest('.feed').attr('feed-id'),
            elemId = $($this.siblings('textarea.comment-content')).attr('id'),
            text = $($('#' + elemId)[0]).siblings('div.textarea-control').text();
            // console.log($($('#' + $id)[0]).siblings('div.textarea-control').html().replace(/<\/div>/g,"\n"))
        if (e.code === 'Enter') {
            postComment(
                activityId,
                {
                    parent_id: $this.hasClass('reply-content') ? $this.closest('.comment-row').attr('comment-id') : null,
                    text: text
                },
                (status) => {
                if (status) {
                    $($('#' + elemId)[0]).siblings('div.textarea-control').html('')
                    viewComment(
                        '/api/activity/'+ activityId +'/comment/',
                        (status, response) => {
                            if (status) {
                                $('#commentsContainer_' + activityId).find('.cmts-container').html('')
                                comments(response.data, undefined, activityId, () => {
                                    initializeEmoji();
                                })
                            }
                        })
                }
            })
        }
    }) 
    // ... view comments
    $(document).on('click','.open-cmts', function(e) {
        let $this = $(this),
            activityId = $this.closest('.feed').attr('feed-id'),
            $collapseElem = $this.closest('.feed').find('.comments-container');
        if (!$collapseElem.hasClass('show')) {
            $this.closest('.feed').find('.cmts-container').empty()
            viewComment(
                '/api/activity/'+ activityId +'/comment/?' + $.param({
                    pagin: true,
                    data_limit: 3,
                    page: 1
                }),
                (status, response) => {
                    if (status) {
                        comments(response.data, undefined, activityId, () => {
                            initializeEmoji();
                            $this.closest('.likes-and-comments').find('.view-more-comments-link').attr('max-comments', response.max_page)
                            if (response.max_page <= 1) {
                                $this.closest('.likes-and-comments').find('.view-more-comments').removeClass('d-flex')
                                $this.closest('.likes-and-comments').find('.view-more-comments').addClass('d-none')   
                            }
                            $collapseElem.collapse('show');
                        })
                    }
                })
        }
        else {
            $collapseElem.collapse('hide')
            $this.closest('.feed').find('.view-more-comments-link').attr('pagin', 1)
            $this.closest('.feed').find('.view-more-comments-link').attr('max-comments', 1)
        }
    })
    // ... view replies
    $(document).on('click', '.reply-cmts-badge', function () {
        let $this = $(this),
            activityId = $this.closest('.feed').attr('feed-id'),
            parent_id = $this.closest('.comment-row').attr('comment-id');
        viewComment(
            '/api/activity/'+ activityId +'/comment/?' + $.param({
                parent_id,
                pagin: true,
                data_limit: 3,
                page: 1
            }),
            (status, response) => {
                if (status) {
                    $this.closest('.comment-row').find('.replies .replies-box').empty();
                    $this.closest('.comment-row').find('.view-more-replies-link').attr('max-comments', response.max_page)
                    if (response.max_page > $this.closest('.comment-row').find('.view-more-replies-link').attr('pagin')) {
                        $this.closest('.comment-row').find('.view-more-comments').removeClass('d-none')
                        $this.closest('.comment-row').find('.view-more-comments').addClass('d-flex') 
                    }
                    replies($this.closest('.comment-row').find('.replies .replies-box'),response.data, () => {})
                }
            })
    })
    // ... like comment
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
    // ... show reply box
    $(document).on('click', '.reply-cmt', function() {
        let $this = $(this);
        $this.closest('.comment-row').find('.reply-row').removeClass('d-none')
        $this.closest('.comment-row').find('.reply-row').addClass('d-flex')
    })
    // ... load more comments & replies
    $(document).on('click', '.view-more-comments-link', function() {
        let $this = $(this),
            activityId = $this.closest('.feed').attr('feed-id'),
            pagin = $this.attr('pagin'),
            max_comments = $this.attr('max-comments'),
            comment_obj = {
                pagin: true,
                data_limit: 3,
                page: Number(pagin) + 1
            }
            $this.hasClass('view-more-replies-link') ? comment_obj.parent_id = $this.closest('.comment-row').attr('comment-id') : null;

        if (pagin < max_comments) {
            $this.closest('.view-more-comments').find('img').removeClass('invisible');
            viewComment(
                '/api/activity/'+ activityId +'/comment/?' + $.param(comment_obj),
                (status, response) => {
                    if (status) {
                        $this.attr('pagin', Number(pagin) + 1)
                        
                        $this.hasClass('view-more-replies-link') ?
                        replies($this.closest('.comment-row').find('.replies .replies-box'),response.data, () => {}): 
                        comments(response.data, undefined, activityId, () => {
                            initializeEmoji();
                        });

                        if (response.max_page == $this.attr('pagin')) {
                            $this.closest('.view-more-comments').removeClass('d-flex')
                            $this.closest('.view-more-comments').addClass('d-none') 
                        }
                        

                        $this.closest('.view-more-comments').find('img').addClass('invisible');
                    }
                })   
        }
    })
})
