 import { getLeaderboard } from './../../api';


 $(document).ready(function() {
    $(document).on('click','.leader-board-header', function() {
        let $this = $(this);
        if ($this.attr('aria-expanded') === 'false') {
            getLeaderboard((status, response) => {
                if (status) {
                    $('.top-ten-container').html('');
                    $this.attr('aria-expanded', true);
                    for (let i = 0; i < response.others.length; i++) {
                        $('.top-ten-container').append(cardBoards(i, response.others[i]));
                    }
                    $('.leader-board-header').find('.collapse').collapse('show');
                }
            })
        }
        else {
            $('.leader-board-header').find('.collapse').collapse('hide')
            $this.attr('aria-expanded', false)
        }
    })
})

function cardBoards(index, user) {
    let color_class = '';
    if (index == 0) {
        color_class = 'number-one';
    }
    else if (index == 1) {
        color_class = 'number-two';
    }
    else if (index == 2) {
        color_class = 'number-three';
    }
    else {
        color_class = 'number-n';
    }

    let user_profile = '';
    if (user.profile_picture) {
        user_profile =  '<img class="img-fluid mx-2 profile-pic" src="'+ user.profile_picture +'" alt="profile picture" />'
    }
    else {
        user_profile =  '<span class="avatar avatar-sm rounded-circle bg-white shadow-sm align-self-center mx-2">' +
                            '<span class="text-dark mx-auto my-1">'+ user.name_chars +'</span>' +
                        '</span>'
    }

    return ('<div class="card '+ color_class +' m-2 " user_id="'+ user.id +'">' +
                            '<div class="card-body p-3">' +
                                '<div class="d-flex align-items-center">' +
                                    '<div class="flex-grow-1">' +
                                        '<span class="index font-weight-bold">#'+ Number(index + 1) +'</span>' +
                                        '<a href="'+ user.url +'">' +
                                            user_profile +
                                        '</a>' +
                                        '<div class="user-ranks-name d-inline-block">' + 
                                            '<a href="'+ user.url +'">' +
                                                user.full_name +
                                                '</a>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div>' +
                                        '<span class="user-ranks-points">'+ user.point_amount +' pts</span>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>');
}

export function topRecords(records) {
    
    // ... my rank
    $('.top-u-container').find('.top-u-rank').text('#' + records.my_rank);

    let others = records.others;
    //... number one
    others[0].profile_picture ? 
    $('.top-three-container').find('.top-1').html(
        '<div class="d-inline-block position-relative mx-3 mx-lg-0">' +
            '<img class="img-fluid crown" src="'+ crown_img +'" alt="number one" />' +
            '<img class="img-fluid top top-one top-one-img" src="'+ others[0].profile_picture +'" alt="profile picture" />' +
        '<div>'
        ) : 
    $('.top-three-container').find('.top-1').html(
        '<div class="d-inline-block position-relative mx-3 mx-lg-0">' +
            '<img class="img-fluid crown" src="'+ crown_img +'" alt="number one" />' +
            '<div class="top top-one top-one-name border d-inline-block">'+ others[0].name_chars +'</div>' +
        '</div>'
        )
    // ... number two
    others[1].profile_picture ? 
    $('.top-three-container').find('.top-2').html('<img class="img-fluid top top-two top-two-img" src="'+ others[1].profile_picture +'" alt="profile picture" />') : 
    $('.top-three-container').find('.top-2').html('<div class="top top-two top-two-name border d-inline-block">'+ others[1].name_chars +'</div>')
    // ... number three
    others[2].profile_picture ? 
    $('.top-three-container').find('.top-3').html('<img class="img-fluid top top-three top-three-img" src="'+ others[2].profile_picture +'" alt="profile picture" />') : 
    $('.top-three-container').find('.top-3').html('<div class="top top-three top-three-name border d-inline-block">'+ others[2].name_chars +'</div>')
}