export const load_badges = (badges) => {
    for (var i = 0; i < badges.length; i++){
        let has_hover_section = 'd-none',
            has_disabled_section = 'd-none',
            has_disabled_class = '';
        badges[i].has_credit ?
        (has_hover_section = 'd-block', has_disabled_class = '') :
        (has_disabled_section = 'd-block', has_disabled_class = 'insufficient-credit');


        $('#created_badge_table_keeper').append(
            ' <div class="card card-stats mb-4 mb-xl-0 badge-card '+ has_disabled_class +'" ' +
                'badge-name   ="'+ badges[i].name +'"'  +
                'badge-id     ="'+ badges[i].id +'"' +
                'badge-points ="'+ badges[i].point_amount +'"' +
                'badge-src    ="'+ badges[i].icon +'"' +
                'badge-des    ="'+ badges[i].description +'"' +
                'has-credit   ="'+ badges[i].has_credit +'">' +
                '<img src     ="'+ badges[i].icon +'" alt="badge icon">' +
                '<div class="badge-label">' +
                    '<h4 class="card-title text-uppercase text-muted mb-0">'+ badges[i].name +'</h4>' +
                        badges[i].point_amount +
                        '<small class="px-1 text-muted">pts</small>' +
                    '</h3>' +
                '</div>' +
                '<div class="hover-part pr-2 pl-2 '+ has_hover_section +'">' +
                    '<p class="mt-3 mb-1 text-white text-md description">'+ badges[i].description +'</p>' +
                    '<span class="hover-down">' +
                        '<div class="down-details">' +
                            '<i class="material-icons text-muted text-sm text-white">account_circle</i>' +
                            '<span class="mt-0 mb-0 text-muted text-sm text-white" >'+ badges[i].creator.full_name +'</span>' +
                        '</div>' +
                        '<div class="down-details">' +
                            '<i class="material-icons text-light text-sm">event</i>' +
                            '<span class="text-muted text-sm text-white">'+ badges[i].created_date +'</span>' +
                        '</div>' +
                    '</span>' +
                '</div>' +
                '<div class="badge-is-disabled '+ has_disabled_section +'"></div>' +
            '</div>'
        )
    }
}