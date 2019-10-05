import { get_users } from './../../api';



let choose_colleage = '',
    search_value = '',
    page_number = 1;


$('#useBadgeBtn').on('click', function() {
    get_users(
        {
        pagin: true,
        data_limit: 15,
        page: 1
    }, (status, response) => {
        if (status) {
            $('.who-to-recognize-container').empty();
            GetUsers(response.data)
            $('#recognitionModal').modal('show');
        }
        else {
            console.log(response)
        }
    })
})


$('#chooseColleague').on('keyup', function() {
    clearTimeout(choose_colleage);
    search_value = $(this).val().toLowerCase();
    choose_colleage = setTimeout(function() {
        get_users({
            search: search_value,
            pagin: true,
            data_limit: 12,
            page: 1
        }, (status, response) => {
            if (status) {
                $('.who-to-recognize-container').empty();
                GetUsers(response.data)
            }
            else {
                console.log(response)
            }
        })
    }, 500) 
})

// ... load data on scroll in privacy modal
$('#recognitionModal .modal-body').on('scroll', () => {
    if ($('#recognitionModal .modal-body').scrollTop() + $('#recognitionModal .modal-body').innerHeight() >= $('#recognitionModal .modal-body')[0].scrollHeight) {
        page_number++
        get_users({
            search: search_value,
            pagin: true,
            data_limit: 12,
            page: page_number
        }, (status, response) => {
            if (status) {
                GetUsers(response.data)
            }
            else {
                console.log(response)
            }
        })
    }
})

function GetUsers(users) {
    for (let i = 0; i < users.length; i++) {
        $('.who-to-recognize-container').append(
            '<div class="who-to-recognize-row d-flex my-2" user_id="'+ users[i].id +'">' +
                '<div class="px-3 align-self-center">' +
                    '<div class="media">' +
                        '<span class="avatar avatar-sm rounded-circle bg-white shadow-sm">' +
                            '<img class="img-fluid" src="'+ user_picture +'" alt="profile picture" /> ' +
                            '<span class="text-dark"></span> ' +
                        '</span> ' +
                        '<div class="media-body ml-2">' +
                            '<span class="username mb-0 text-sm font-weight-bold">'+ users[i].full_name +'</span> ' +
                            '<small class="occupation text-muted d-block"></small>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="flex-grow-1 align-self-center mt-2">' +
                    '<div class="text-right">' +
                        '<span class="select-row-radio"></span> ' +
                    '</div>' +
                '</div>' +
            '</div>'
        )
    }
}