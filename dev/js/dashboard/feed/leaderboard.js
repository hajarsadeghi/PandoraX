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
                                        user_profile +
                                        '<div class="user-ranks-name d-inline-block">'+ user.full_name +'</div>' +
                                    '</div>' +
                                    '<div>' +
                                        '<span class="user-ranks-points">'+ user.point_amount +' pts</span>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>');
}