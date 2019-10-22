import { toggleLike } from './../../api';


$(document).ready(function() {
    LottieAnimation(['rewardBadge'])
})

export const showFeed = (feed) => {
    let profile = '',
        recognition = '',
        recognitition_user_profile = '',
        liked_icon = '',
        lottie_array = [];

    for (let i = 0; i < feed.length; i++) {
        recognition = '';
        
        if (feed[i].user.profile_picture) {
            profile = '<img class="img-fluid profile-pic" src="'+ feed[i].user.profile_picture +'" alt="profile picture" />'
        }
        else {
            profile = '<span class="text-dark profile-pic-text border">'+ feed[i].user.name_chars +'</span>'
        }

        if (feed[i].recognition) {

            lottie_array.push('rewardBadge_' + feed[i].id);
            if (feed[i].recognition.to_user.profile_picture) {
                recognitition_user_profile = '<img class="img-fluid mx-auto profile-pic" src="'+ feed[i].recognition.to_user.profile_picture +'" alt="profile picture" />';
            }
            else {
                recognitition_user_profile = '<span class="avatar avatar-sm rounded-circle bg-white shadow-sm align-self-center">' +
                                                '<span class="text-dark mx-auto my-1">'+ feed[i].recognition.to_user.name_chars +'</span>' +
                                            '</span>'
            }
            recognition = '<div class="post-recognition-container">' +
                            '<div class="d-flex justify-content-center align-items-center post-recognition">' +
                                '<div class="selected-badge-info mx-2">' +
                                    '<div class="card badge-card selected-badge-card border-1 p-1">' +
                                        '<img class="img-fluid mx-auto" src="'+ feed[i].recognition.badge.icon +'" alt="badge icon">' +
                                        '<div class="badge-label text-center">' +
                                            '<h5 class="card-title text-muted my-1">' +
                                                '<span>'+ feed[i].recognition.badge.name +'</span>' +
                                                '<small class="pl-1">'+ feed[i].recognition.badge.point_amount +'</small>' +
                                            '</h5>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="lottie-animation" id="rewardBadge_'+ feed[i].id +'"></div>' +
                                '<div class="selected-badge-info mx-2">' +
                                    '<div class="card user-card selected-badge-card border-1 p-1">' +
                                        recognitition_user_profile +
                                       '<div class="badge-label text-center">' +
                                            '<h5 class="card-title text-muted my-1">'+ feed[i].recognition.to_user.full_name +'</h5>' +
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
                        '<div>' + profile + '</div>' +
                        '<div class="flex-grow-1 px-2">' +
                            '<h4 class="font-weight-bold m-0">'+ feed[i].user.full_name +'</h4>' +
                            '<small class="text-muted">'+ feed[i].timestamp +'</small>' +
                        '</div>' +
                    '</div>' +
                    '<div class="card-text"> ' +
                        '<div class="post-context px-3">' +
                            '<p>' + feed[i].text + '</p>' +
                        '</div>' +
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
                                    '<small class="cmts" data-toggle="tooltip" data-html="true" title="">' +
                                        '<a href="" data-toggle="collapse" data-target="#commentsContainer" aria-expanded="false" aria-controls="commentsContainer">' + feed[i].comments_count + ' comments' + '</a>' +
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
                                    '<a class="float-right" href="" data-toggle="collapse" data-target="#commentsContainer" aria-expanded="false" aria-controls="commentsContainer">' +
                                        '<span class="material-icons float-left">' +
                                            'insert_comment' +
                                        '</span>' +
                                        '<span class="px-1">Comment</span>' +
                                    '</a>' +
                                '</div>' +
                            '</div>' +
                        //    '<div class="collapse" id="commentsContainer">' +
                        //         '<hr class="my-3" />' +
                        //         '<div class="comment-row d-flex align-items-center mx-3 pb-3">' +
                        //             '<div>' +
                        //                 {% if request.user.profile_picture %}
                        //                     <img class="img-fluid profile-pic" src="{{request.user.profile_picture.url}}" alt="profile picture" />
                        //                 {% else %}
                        //                     <span class="text-dark profile-pic-text border">{{request.user.name_chars}}</span>
                        //                 {% endif %}
                        //             </div>
                        //             <div class="flex-grow-1">
                        //                 <div class="add-comment post-content border ml-2" contenteditable="true" data-placeholder="{% trans 'Write a comment...' %}"></div>
                        //             </div>
                        //         </div>
                        //         <div class="comment-row pb-3">
                        //             <div class="d-flex mx-3">
                        //                 <div>
                        //                     <span class="text-dark profile-pic-text border">{{request.user.name_chars}}</span>
                        //                 </div>
                        //                 <div class="ml-2">
                        //                     <div class="comment-text border p-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi sequi provident nemo at quas error ipsum obcaecati vero minima eaque explicabo hic, porro ab! Dolorum minus sunt impedit aliquid dignissimos.</div>
                        //                     <small>
                        //                         <a class="pr-2" href="">Like</a>
                        //                         <a class="pr-2" href="">Reply</a>
                        //                         <span class="text-muted">15h</span>
                        //                     </small>
                        //                     <div class="replies">
                        //                         <div class="d-flex">
                        //                             <div class="mr-1">
                        //                                 <div class="text-dark profile-pic-text border">{{request.user.name_chars}}</div>
                        //                             </div>
                        //                             <div class="flex-grow-1">
                        //                                 <div class="comment-text border p-2">This is a test reply for your comment.</div>
                        //                                 <small>
                        //                                     <a class="pr-2" href="">Like</a>
                        //                                     <a class="pr-2" href="">Reply</a>
                        //                                     <span class="text-muted">15h</span>
                        //                                 </small>
                        //                             </div>
                        //                         </div>
                        //                         <div class="comment-row d-flex align-items-center pb-3">
                        //                             <div>
                        //                                 {% if request.user.profile_picture %}
                        //                                     <img class="img-fluid profile-pic" src="{{request.user.profile_picture.url}}" alt="profile picture" />
                        //                                 {% else %}
                        //                                     <span class="text-dark profile-pic-text border">{{request.user.name_chars}}</span>
                        //                                 {% endif %}
                        //                             </div>
                        //                             <div class="flex-grow-1">
                        //                                 <div class="add-comment post-content border ml-2" contenteditable="true" data-placeholder="{% trans 'Write a comment...' %}"></div>
                        //                             </div>
                        //                         </div>
                        //                     </div>
                        //                 </div>
                        //             </div>
                        //         </div>
                        //         <div class="comment-row pb-3">
                        //             <div class="d-flex mx-3">
                        //                 <div>
                        //                     <span class="text-dark profile-pic-text border">HB</span>
                        //                 </div>
                        //                 <div class="ml-2">
                        //                     <div class="comment-text border p-2">this is a test!</div>
                        //                     <small>
                        //                         <a class="pr-2" href="">Like</a>
                        //                         <a class="pr-2" href="">Reply</a>
                        //                         <span class="text-muted">15h</span>
                        //                     </small>
                        //                 </div>
                        //             </div>
                        //         </div>
                        //         <hr class="m-0" />
                        //         <div class="d-flex view-more-comments align-items-center px-3 py-1">
                        //             <div>
                        //                 <a class="view-more-comments-link" href="">View more comments</a>
                        //             </div>
                        //             <div class="flex-grow-1">
                        //                 <img class="d-none" src="{% static 'image/load_more_comments.gif' %}" />
                        //             </div>
                        //         </div>
                        //         <div class="write-a-comment align-items-center px-3 py-1">
                        //             <a class="write-a-comment-link" href="">Write a comment</a>
                        //         </div>
                        //     </div>
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        ) 
        initializeUnitegallery($("#gallery_" + feed[i].id))
    }
    // ... load animation using lottie ...
    LottieAnimation(lottie_array);
}

// ... toggle like
export const toggleLikeAction = (e) => {
    e.preventDefault(e)

    let like_link = $(e.target).closest('.like-link')
    toggleLike(like_link.closest('.feed').attr('feed-id'), (status, res) => {
        if (status) {
            like_link.closest('.feed').find('.like-count').text(res.like_count + ' likes')
            if (res.like_count === 1) {
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
