 // ... leatherboard
 let topRanks = [
    {
        fullName: 'Tina Smith',
        firstName: 'Tina',
        lastName: 'Smith',
        points: '1065',
        img: null
    },
    {
        fullName: 'Ross Gellar',
        firstName: 'Ross',
        lastName: 'Geller',
        points: '985',
        img: null
    },
    {
        fullName: 'Rachel Green',
        firstName: 'Rachel',
        lastName: 'Green',
        points: '754',
        img: null
    },
    {
        fullName: 'Joey Tribbiani',
        firstName: 'Joey',
        lastName: 'Tribbiani',
        points: '445',
        img: null
    },
    {
        fullName: 'Chandler Bing',
        firstName: 'Chandler',
        lastName: 'Bing',
        points: '440',
        img: null
    },
    {
        fullName: 'Monica Geller',
        firstName: 'Monica',
        lastName: 'Geller',
        points: '350',
        img: null
    },
    {
        fullName: 'Pheobe Buffay',
        firstName: 'Pheobe',
        lastName: 'Buffay',
        points: '245',
        img: null
    },
    {
        fullName: 'Emily Waltham',
        firstName: 'Emily',
        lastName: 'Waltham',
        points: '205',
        img: null
    },
    {
        fullName: 'Jill Green',
        firstName: 'Jill',
        lastName: 'Green',
        points: '158',
        img: null
    },
    {
        fullName: 'Janice Hosenstein',
        firstName: 'Janice',
        lastName: 'Hosenstein',
        points: '125',
        img: null
    }
];
for (let i = 0; i < topRanks.length; i++) {
    $('.top-ten-container').append(cardBoards(i, topRanks[i]));
}

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

    return ('<div class="card '+ color_class +' m-2 ">' +
                            '<div class="card-body p-3">' +
                                '<div class="d-flex">' +
                                    '<div class="flex-grow-1">' +
                                        '<span class="index font-weight-bold">#'+ Number(index + 1) +'</span>' +
                                        '<div class="text-dark user-ranks-img border d-inline-block mx-3">'+ user.firstName.charAt(0) + user.lastName.charAt(0) +'</div>' +
                                        '<span class="user-ranks-name">'+ user.fullName +'</span>' +
                                    '</div>' +
                                    '<div>' +
                                        '<span class="user-ranks-points">'+ user.points +' pts</span>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>');
}