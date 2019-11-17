import { postComment, viewComment, likeComment } from './../../api';
import { comments, replies, initializeEmoji } from './feed';



$(document).ready(function() {
    // ... comment and reply
    $(document).on('keydown change', '.comment-content', function(e) {
        let $this = $(this),
            activityId = $this.closest('.feed').attr('feed-id'),
            elemId = $($this.siblings('textarea.comment-content')).attr('id'),
            text = $($('#' + elemId)[0]).siblings('div.textarea-control').text();
            // console.log($($('#' + $id)[0]).siblings('div.textarea-control').html().replace(/<\/div>/g,"\n"))
        if (e.code === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            postComment(
                activityId,
                {
                    parent_id: $this.hasClass('reply-content') ? $this.closest('.comment-row').attr('comment-id') : null,
                    text: text
                },
                (status) => {
                if (status) {
                    $($('#' + elemId)[0]).siblings('div.textarea-control').html('')
                    if ($this.hasClass('reply-content')) {
                        showReplies($this)            
                    }
                    else {
                        showComments($this);
                    }
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
                        comments(response.data, user_profile, activityId, () => {
                            initializeEmoji();
                            $this.closest('.likes-and-comments').find('.view-more-comments-link').attr('max-comments', response.max_page)
                            if (response.max_page <= 1) {
                                $this.closest('.likes-and-comments').find('.cmts-load-more').removeClass('d-flex')
                                $this.closest('.likes-and-comments').find('.cmts-load-more').addClass('d-none')   
                            }
                            else {
                                $this.closest('.likes-and-comments').find('.cmts-load-more').removeClass('d-none')
                                $this.closest('.likes-and-comments').find('.cmts-load-more').addClass('d-flex')  
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
        showReplies($(this))
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
        let $this = $(this),
            $this_reply = $this.closest('.comment-row').find('.reply-row');
        $(document).find('.reply-row').not($this_reply).removeClass('d-flex')
        $(document).find('.reply-row').not($this_reply).addClass('d-none')
        $this.closest('.comment-row').find('.reply-row').removeClass('d-none')
        $this.closest('.comment-row').find('.reply-row').addClass('d-flex')
    })
    // ... load more comments & replies
    $(document).on('click', '.view-more-comments-link', function() {
        console.log('link clicked')
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

            console.log(Number(pagin),'===pagin')
            console.log(Number(max_comments),'====max comments')

        if (Number(max_comments) === Number(pagin)) {
            console.log('hi')
            $this.closest('.view-more-comments').removeClass('d-flex')
            $this.closest('.view-more-comments').addClass('d-none') 
        }
        if (Number(pagin) < Number(max_comments)) {
            $this.closest('.view-more-comments').find('img').removeClass('invisible');
            viewComment(
                '/api/activity/'+ activityId +'/comment/?' + $.param(comment_obj),
                (status, response) => {
                    if (status) {
                        $this.attr('pagin', Number(pagin) + 1)
                        
                        $this.hasClass('view-more-replies-link') ?
                        replies($this.closest('.comment-row').find('.replies .replies-box'),response.data, () => {}): 
                        comments(response.data, user_profile, activityId, () => {
                            initializeEmoji();
                        });

                        $this.closest('.view-more-comments').find('img').addClass('invisible');
                    }
                })   
        }
    })
    // ... call comments 
    function showComments($this) {
        let activityId = $this.closest('.feed').attr('feed-id');
        viewComment(
            '/api/activity/'+ activityId +'/comment/?' + $.param({
                pagin: true,
                data_limit: 3,
                page: 1
            }),
            (status, response) => {
            if (status) {
                $('#commentsContainer_' + activityId).find('.cmts-container').html('')
                $this.closest('.likes-and-comments').find('.cmt-count').text(response.total_count + ' comments')
                comments(response.data, user_profile, activityId, () => {
                    initializeEmoji();
                })
                if (response.max_page > $this.closest('.likes-and-comments').find('.view-more-comments-link').attr('pagin')) {
                    $this.closest('.likes-and-comments').find('.cmts-load-more').removeClass('d-none')
                    $this.closest('.likes-and-comments').find('.cmts-load-more').addClass('d-flex') 
                }
                $this.closest('.likes-and-comments').find('.view-more-comments-link').attr('pagin', 1)
            }
        })
    }

    // ... call replies
    function showReplies($this) {
        let activityId = $this.closest('.feed').attr('feed-id'),
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
                    $this.closest('.comment-row').find('.comment-text .reply-cmts-badge span').text(response.total_count);
                    $this.closest('.comment-row').find('.comment-text .reply-cmts-badge').removeClass('d-none')
                    $this.closest('.comment-row').find('.comment-text .reply-cmts-badge').addClass('d-flex') 
                    $this.closest('.comment-row').find('.view-more-replies-link').attr('max-comments', response.max_page)
                    replies($this.closest('.comment-row').find('.replies .replies-box'),response.data, () => {})
                    if (response.max_page > $this.closest('.comment-row').find('.view-more-replies-link').attr('pagin')) {
                        $this.closest('.comment-row').find('.view-more-comments').removeClass('d-none')
                        $this.closest('.comment-row').find('.view-more-comments').addClass('d-flex') 
                    }
                }
            })
    }
})
