import { toggleLike } from './../../api';


$(document).ready(function() {
    LottieAnimation(['rewardBadge'])
})

let user_self_profile = '';
export const showFeed = (feed) => {
    let profile = '',
        recognition = '',
        recognitition_user_profile = '',
        liked_icon = '',
        lottie_array = [];

    user_profile.has ?
    user_self_profile = '<img class="img-fluid profile-pic" src="'+ user_profile.src +'" alt="profile picture" />':
    user_self_profile = '<span class="text-dark profile-pic-text border">'+ user_profile.initials +'</span>'

    for (let i = 0; i < feed.length; i++) {
        recognition = '';
        
        feed[i].user.profile_picture ?
        profile = '<img class="img-fluid profile-pic" src="'+ feed[i].user.profile_picture +'" alt="profile picture" />':
        profile = '<span class="text-dark profile-pic-text border">'+ feed[i].user.name_chars +'</span>'

        if (feed[i].recognition) {

            lottie_array.push('rewardBadge_' + feed[i].id);
            feed[i].recognition.to_user.profile_picture ?
            recognitition_user_profile =    '<img class="img-fluid mx-auto profile-pic" src="'+ feed[i].recognition.to_user.profile_picture +'" alt="profile picture" />' :
            recognitition_user_profile =    '<span class="avatar avatar-sm rounded-circle bg-white shadow-sm align-self-center">' +
                                                '<span class="text-dark mx-auto my-1">'+ feed[i].recognition.to_user.name_chars +'</span>' +
                                            '</span>'

            recognition = '<div class="post-recognition-container">' +
                            '<div class="d-flex justify-content-center align-items-center post-recognition">' +
                                '<div class="selected-badge-info mx-2">' +
                                    '<div class="card badge-card selected-badge-card border-1 p-1">' +
                                        '<div class="row h-100">' +
                                            '<div class="col-12 align-self-start text-center">' +
                                                '<img class="img-fluid mx-auto" src="'+ feed[i].recognition.badge.icon +'" alt="badge icon">' +
                                            '</div>' +
                                            '<div class="col-12 badge-label align-self-end text-center">' +
                                                '<h5 class="card-title text-muted my-1">' +
                                                    '<span>'+ feed[i].recognition.badge.name +'</span>' +
                                                    '<small class="pl-1">'+ feed[i].recognition.badge.point_amount +'</small>' +
                                                '</h5>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="lottie-animation" id="rewardBadge_'+ feed[i].id +'"></div>' +
                                '<div class="selected-badge-info mx-2">' +
                                    '<div class="card user-card selected-badge-card border-1 p-1">' +
                                        '<div class="row h-100">' +
                                            '<div class="col-12 align-self-start text-center">' +
                                                '<a href="'+ feed[i].recognition.to_user.url +'">' + recognitition_user_profile + '</a>' +
                                            '</div>' +
                                            '<div class="col-12 badge-label text-center align-self-end">' +
                                                '<a href="'+ feed[i].recognition.to_user.url +'">' +
                                                    '<h5 class="card-title text-muted my-1">'+ feed[i].recognition.to_user.full_name +'</h5>' +
                                                    '</a>' +
                                            '</div>' +
                                       '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' 
        }
        else {
            let imgs = '';
            for (let j = 0; j < feed[i].media.length; j++) {
                imgs += '<img class="img-responsive" alt="img" width="100%" height="auto" src="'+ feed[i].media[j] +'"  data-image="'+ feed[i].media[j] +'" data-description="Description">' 
            }
            recognition =   '<div class="row">' +
                                '<div class="col-12">' +
                                    '<div id="gallery_'+ feed[i].id +'" class="gallery">'+ imgs +'</div>' +
                                '</div>' +
                            '</div>';
        }

        if (feed[i].is_liked) {
            liked_icon = 'material-icons'
        }
        else {
            liked_icon = 'material-icons-outlined'
        }

        $('.feed-activity').append(
            '<div class="card shadow feed mb-3" feed-id="'+ feed[i].id +'">' +
                '<div class="card-body p-0">' +
                    '<div class="card-title d-flex mb-0 p-3">' +
                        '<a href="'+ feed[i].user.url +'">' + profile + '</a>' +
                        '<div class="flex-grow-1 px-2">' +
                            '<a href="'+ feed[i].user.url +'">' +
                                '<h4 class="font-weight-bold m-0">'+ feed[i].user.full_name +'</h4>' +
                            '</a>' +
                            '<small class="text-muted">'+ moment(feed[i].timestamp).fromNow() +'</small>' +
                        '</div>' +
                    '</div>' +
                    '<div class="card-text"> ' +
                        '<div class="post-context px-3">' + feed[i].text + '</div>' +
                        recognition +
                        '<div class="likes-and-comments">' +
                            '<div class="row border-bottom mx-3 py-2">' +
                                '<div class="col">' +
                                    '<small data-toggle="tooltip" data-html="true" title="" class="like-count small-link" activity_id="'+ feed[i].id +'">' +
                                        feed[i].likes_count + ' likes' +
                                    '</small>' +
                                    '<span class="mutual-likes d-none d-lg-inline-block">' +
                                        // {% if request.user.profile_picture %}
                                        //     <img class="img-fluid profile-pic" src="{{request.user.profile_picture.url}}" alt="profile picture" />
                                        //     <img class="img-fluid profile-pic d-inline-block" src="{{request.user.profile_picture.url}}" alt="profile picture" />
                                        //     <img class="img-fluid profile-pic d-inline-block" src="{{request.user.profile_picture.url}}" alt="profile picture" />
                                        // {% else %}
                                        //     <span class="text-dark profile-pic border">HB</span>
                                        //     <span class="text-dark profile-pic border">HB</span>
                                        //     <span class="text-dark profile-pic border">HB</span>
                                        // {% endif %}
                                    '</span>' +
                                '</div>' +
                                '<div class="col text-right">' +
                                    '<small class="small-link cmt-count open-cmts" data-toggle="tooltip" data-html="true" title="">' +
                                        feed[i].comments_count + ' comments' +
                                   '</small>' +
                                '</div>' +
                            '</div>' +
                            '<div class="row m-3">' +
                                '<div class="col">' +
                                    '<div class="like-link" is-liked="'+ feed[i].is_liked +'">' +
                                        '<span class="'+ liked_icon +' float-left">' +
                                            'thumb_up' +
                                        '</span>' +
                                        '<span class="px-1">Like</span>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="col">' +
                                    '<div class="float-right comment-link open-cmts">' +
                                        '<span class="material-icons float-left">' +
                                            'insert_comment' +
                                        '</span>' +
                                        '<span class="px-1">Comment</span>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="collapse comments-container" id="commentsContainer_'+ feed[i].id +'">' +
                                '<hr class="my-3" />' +
                                '<div class="comment-row d-flex align-items-center mx-3 pb-3">' +
                                    '<a href="'+ user_profile.url +'">' + user_self_profile +'</a>' +
                                    '<div class="flex-grow-1">' +
                                        '<div class="emoji-picker-container add-comment border ml-2">' +
                                            '<textarea id="commentOnPost_'+ feed[i].id +'" class="comment-content main-comment-content px-3 form-control textarea-control" rows="3" data-placeholder="'+ write_cmt_placeholder +'" data-emojiable="true" data-emoji-input="unicode"></textarea>' +
                                        '</div>' +
                                        // '<div class="add-comment post-content border ml-2" contenteditable="true" data-placeholder="Write a comment..."></div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="cmts-container">' +
                                    // comments(feed[i], profile, feed[i].id) +
                                '</div>' +
                                '<hr class="m-0" />' +
                                '<div class="d-flex view-more-comments cmts-load-more align-items-center px-3">' +
                                    '<div>' +
                                        '<span class="cmt-links view-more-comments-link" pagin="1" max-comments="1">View more comments</span>' +
                                    '</div>' +
                                    '<div class="flex-grow-1">' +
                                        '<img class="invisible" src="'+ load_more_src +'" />' +
                                    '</div>' +
                                '</div>' +
                                ' <div class="write-a-comment align-items-center px-3">' +
                                    '<a class="write-a-comment-link" href="#commentsContainer_'+ feed[i].id +'">Write a comment</a>' +
                                '</div>' +
                            ' </div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        ) 
        initializeUnitegallery($("#gallery_" + feed[i].id))
    }
    // ... load animation using lottie ...
    LottieAnimation(lottie_array);
    initializeEmoji();
}

export function comments(comments, user_profile, activity_id, callback) {
    let commenter_profile = '',
        comment_row = '',
        cmt_likes = '',
        cmt_like_class = '',
        cmt_reply = '';

    comments.forEach(cmt => {
        // ... logged in user profile picture
        cmt.user.profile_picture ?
        commenter_profile = '<img class="img-fluid profile-pic" src="'+ cmt.user.profile_picture +'" alt="profile picture" />' :
        commenter_profile = '<span class="text-dark profile-pic-text border">'+ cmt.user.name_chars +'</span>'
        // ... material icon class
        cmt.is_liked ?
        cmt_like_class = '':
        cmt_like_class = ' material-icons-outlined ';
        // ... comment like count element
        cmt.likes_count ?
        cmt_likes = '<span class="d-flex cmts-badge like-cmts-badge mx-1">' +
                        '<i class="material-icons '+ cmt_like_class +' md-18 like css">thumb_up</i>' +
                        '<span>'+ cmt.likes_count +'</span>' +
                    '</span>' :
        cmt_likes = '<span class="d-none cmts-badge like-cmts-badge mx-1 like css">' +
                        '<i class="material-icons '+ cmt_like_class +' md-18">thumb_up</i>' +
                        '<span>'+ cmt.likes_count +'</span>' +
                    '</span>';
        // ... comment reply count element
        cmt.reply_count ?
        cmt_reply = '<span class="d-flex cmts-badge reply-cmts-badge mx-1">' +
                        '<i class="material-icons material-icons-outlined md-18">mode_comment</i>' +
                        '<span>'+ cmt.reply_count +'</span>' +
                    '</span>' :
        cmt_reply = '<span class="d-none cmts-badge reply-cmts-badge mx-1">' +
                        '<i class="material-icons material-icons-outlined md-18">mode_comment</i>' +
                        '<span>'+ cmt.reply_count +'</span>' +
                    '</span>';
        
        comment_row += '<div class="comment-row pb-1" comment-id="'+ cmt.id +'">' +
                            '<div class="d-flex mx-3">' +
                                ' <a href="'+ cmt.user.url +'">' + commenter_profile + '</a>' +
                                '<div class="flex-grow-1 ml-2">' +
                                    '<div class="comment-text border p-1 mb-2">'+
                                        '<span>'+ cmt.text +'</span>' +
                                        '<div class="d-flex float-right mt-3">' +
                                            cmt_reply +
                                            cmt_likes +
                                        '</div>' +
                                     '</div>' +
                                    '<small>' +
                                        '<span class="cmt-links like-cmt pr-2">Like</span>' +
                                        '<span class="cmt-links reply-cmt pr-2">Reply</span>' +
                                        '<span class="text-muted">'+ moment(cmt.timestamp).fromNow() +'</span>' +
                                    '</small>' +
                                    '<div class="replies">' +
                                        '<div class="d-none reply-row align-items-center pb-3 animated fadeIn">' +
                                            '<a href="'+ user_profile.url +'">' + user_self_profile +'</a>' +
                                            ' <div class="flex-grow-1">' +
                                                '<div class="emoji-picker-container add-reply border ml-2">' +
                                                    '<textarea id="replyOnCmt_'+ cmt.id +'" class="reply-content comment-content px-3 form-control textarea-control" rows="3" data-placeholder="'+ write_cmt_placeholder +'" data-emojiable="true" data-emoji-input="unicode"></textarea>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="replies-box"></div>' +
                                        '<div class="d-none view-more-comments align-items-center px-3">' +
                                            '<div>' +
                                                '<small class="cmt-links view-more-comments-link view-more-replies-link text-muted" pagin="1" max-comments="0">View more replies</small>' +
                                            '</div>' +
                                            '<div class="flex-grow-1">' +
                                                '<img class="invisible" src="'+ load_more_src +'" />' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>'
    })

    $('#commentsContainer_' + activity_id).find('.cmts-container').append(comment_row);
    callback()
}

export function replies(container, comments, callback) {
    let replies = '',
        commenter_profile = '';
    comments.forEach(cmt => {
        cmt.user.profile_picture ?
        commenter_profile = '<img class="img-fluid profile-pic" src="'+ cmt.user.profile_picture +'" alt="profile picture" />' :
        commenter_profile = '<span class="text-dark profile-pic-text border">'+ cmt.user.name_chars +'</span>'

        replies += '<div class="d-flex">' +
                        '<a href="'+ user_profile.url +'" class="mr-1">' +
                            commenter_profile +
                        '</a>' +
                        '<div class="flex-grow-1">' +
                            '<div class="comment-text border px-2 py-1">'+ cmt.text +'</div>' +
                            '<small>' +
                                '<a class="pr-2" href="">Like</a>' +
                                '<a class="pr-2" href="">Reply</a>' +
                                '<span class="text-muted">'+ moment(cmt.timestamp).fromNow() +'</span>' +
                            '</small>' +
                        '</div>' +
                    '</div>'
    })
    container.append(replies);
    callback()
}

export function initializeEmoji() {
    // Initializes and creates emoji set from sprite sheet
    window.emojiPicker = new EmojiPicker({
        emojiable_selector: '[data-emojiable=true]',
        assetsPath: assets_path,
        popupButtonClasses: 'fa fa-smile-o'
    });
    // Finds all elements with `emojiable_selector` and converts them to rich emoji input fields
    // You may want to delay this step if you have dynamically created input fields that appear later in the loading process
    // It can be called as many times as necessary; previously converted input fields will not be converted again
    window.emojiPicker.discover();
    $('.post-content').attr('data-placeholder', post_placeholder)
}

// ... toggle like
export const toggleLikeAction = (e) => {
    e.preventDefault(e)

    let like_link = $(e.target).closest('.like-link')
    
    if (!like_link.hasClass('disabled')) {
        like_link.addClass('disabled');
        toggleLike(like_link.closest('.feed').attr('feed-id'), (status, res) => {
            like_link.removeClass('disabled');
            if (status) {
                like_link.closest('.feed').find('.like-count').text(res.like_count + ' likes')
                if (res.status === 'liked') {
                    like_link.attr('is-liked', true);
                    like_link.find('span:first-child').removeClass('material-icons-outlined');
                    like_link.find('span:first-child').addClass('material-icons')
                }
                else {
                    like_link.find('span:first-child').removeClass('material-icons');
                    like_link.find('span:first-child').addClass('material-icons-outlined')
                }
            }
        })
    }
}

const LottieAnimation = (array) => {
    for (let i = 0; i < array.length; i++) {
        lottie.loadAnimation({
            container: document.getElementById(array[i]),
            path: reward_badge,
            renderer: 'svg',
            autoplay: true,
            loop: true
        }); 
    }   
}

const initializeUnitegallery = (elem) => {
    elem.unitegallery({
        gallery_theme: "tiles",
        tiles_justified_row_height: 120,
        tiles_type: "justified"				
    });
}
