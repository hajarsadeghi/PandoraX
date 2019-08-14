import Dropdown from './../helper/dropdown.js';
import Notif from './../helper/index.js';

const API = require('./../api.js');
// ... initialize dropdown ...
new Dropdown({root: '.dropdown-container'});

// ... login form transition ...
$('.form-input').on('keyup',function() {
    if ($(this).val()) {
        $(this).addClass('has-val');
    }
    else {
        $(this).removeClass('has-val');
    }
});

$('#companyName').on('keyup', function() {
    if ($(this).val()) {
        $('#companySlug').val($(this).val().toLowerCase() + '.bilono.com');
    }
})
// ... check company slug
$('#spaceNameBtn').on('click', function() {

    let slug = $('#companyName').val();

    if (slug.length > 0) {
        API.create_space(
            '/api/space/check_slug/',
            {slug: slug},
            (status, res) => {
                if (status) {
                    if (res.valid) {
                        ToggleSpaceBoxes($(this));
                    }
                    else {
                        alert("Please change your company's slug");
                    }
                }
                else {
                    console.log('error')
                }
            }
        );
    }
    else {
        Notif('Please enter the name of your company');
    }
    
});
// ... create slug
$('#createSpaceBtn').on('click', function() {
    
    let space = {
        name: $('#companyName').val(),
        slug: $('#companyName').val(),
        industry_id: $('.industry').attr('id'),
        members_count: $('.members-count').val()
    }

    if (space.name && space.slug && space.industry_id && space.members_count) {
        API.create_space(
            '/api/space/create/',
            space,
            (status, res) => {
                if (status) {
                    if (res.id) {
                        $('#spaceTeammatesBox').attr('space-id', res.id);
                        ToggleSpaceBoxes($(this));
                    }
                }
                else {
                    console.log('error')
                }
            }
        );
    }
    else {
        Notif('Please provide the company info');
    }
    
});

// ... add team mates
$('#addTeammatesBtn').on('click', function() {
    
    let teammates = {
        space_id: $('#spaceTeammatesBox').attr('space-id'),
        members: []
    };

    let forms = $('#spaceTeammatesBox').find('.form-input');
    for (let i = 0; i < forms.length; i++) {
        if ($(forms[i]).val()) {
            teammates.members.push($(forms[i]).val());
        }
    }
    
    if (teammates.space_id && teammates.members.length) {
        API.create_space(
            '/api/space/invite/',
            teammates,
            (status) => {
                if (status) {
                    ToggleSpaceBoxes($(this));
                }
                else {
                    console.log('error')
                }
            }
        );
    }
    else {
        Notif('Please Provide your teams email address');
    }
    
});

$('#skipTeammates').on('click', function() {
    ToggleSpaceBoxes($(this));
});
$('#tadaBtn').click(function() {
    window.location.replace('/');  
});

function ToggleSpaceBoxes($this) {
    const box = '.' + $this.attr('box');
    $('.space-row').removeClass('d-flex');
    $('.space-row').addClass('d-none');
    $(box).addClass('d-flex');
}



