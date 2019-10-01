import { get_users } from './../../api';



$('#useBadgeBtn').on('click', function() {
    get_users(
        {
        // search: 'hajar',
        // pagin: true,
        // data_limit: 10,
        // page: 1
    }, (status, response) => {
        if (status) {
            console.log(response,'=====response')
            GetUsers(response.data)
            $('#recognitionModal').modal('show');
        }
        else {
            console.log(response)
        }
    })
})

function GetUsers(users) {
    for (let i = 0; i < users.length; i++) {
        $('.who-to-recognize-container').append(
            '<div class="who-to-recognize-row d-flex my-2" user_id="'+ users[i].id +'">' +
                '<div class="px-3 align-self-center">' +
                    '<div class="media">' +
                        '<span class="avatar avatar-sm rounded-circle bg-white shadow-sm">' +
                                '<img class="img-fluid" src="'+ users[i].profile_picture +'" alt="profile picture" /> ' +
                                '<span class="text-dark"></span> ' +
                        '</span> ' +
                        '<div class="media-body ml-2">' +
                            '<span class="mb-0 text-sm font-weight-bold">'+ users[i].full_name +'</span> ' +
                            '<small class="text-muted d-block"></small>' +
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