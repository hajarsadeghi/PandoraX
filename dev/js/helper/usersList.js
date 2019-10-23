export const usersList = (list, callback) => {
    var users = '',
        avatar = '';
    
    list.forEach(li => {
        li.profile_picture ?
        avatar = '<img class="img-fluid" src="'+ li.profile_picture +'" alt="profile picture" />' :
        avatar = '<span class="text-dark">'+ li.name_chars +'</span>'

        users += '<div class="select-privacy align-items-center mb-2">' +
                    '<div class="px-3">' +
                        '<div class="media align-items-center">' +
                            '<span class="avatar avatar-sm rounded-circle bg-white shadow-sm">' + avatar + '</span>' +
                            '<div class="media-body ml-2 d-none d-lg-block">' +
                                '<span class="mb-0 text-sm font-weight-bold">' + li.full_name + '</span>' +
                                '<small class="text-muted d-block">Front-End develoer</small>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>'
    })

    callback(users)
}