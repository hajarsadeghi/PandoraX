import Dropdown from './../helper/dropdown.js';
import Notif from './../helper/index.js';
const API = require('./../api.js');

// ... initialize dropdown ...
new Dropdown({root: '.dropdown-container'});

$('#spaceNameBtn').attr('disabled', true);

// ... login form transition ...
$('.form-input').on('keyup',function() {
    if ($(this).val()) {
        $(this).addClass('has-val');
    }
    else {
        $(this).removeClass('has-val');
    }
});

let check_slug,
    is_slug_changed_manually = false;
$('#companyName').on('keyup', function() {
    if (!is_slug_changed_manually) {
        let slug_value = $(this).val().toLowerCase();
        if (/^[a-zA-Z0-9-_ ]*$/.test(slug_value)) {
            $('#companySlug').val(slug_value.replace(/ +/g, ""));
        }
        
        checkSlug(slug_value.replace(/ +/g, ""));   
    }
});

$('#companySlug').on('keydown', function (e) {
    let key_arr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','-','_','Backspace','Shift','ArrowRight','ArrowLeft','Delete'];
    if (!key_arr.includes(e.key)) {
        return false;
    }
    else {
        is_slug_changed_manually = true;
    }
});

$('#companySlug').on('keyup', function () {
    checkSlug($(this).val().toLowerCase());
});

function checkSlug(slug_value) {

    $('#spaceNameBtn').attr('disabled', true);
    if (slug_value) {
        $('#companySlug').addClass('has-val');
    }
    else {
        $('#companySlug').removeClass('has-val');        
    }

    clearTimeout(check_slug);

    let slug = $('#companySlug').val();
    check_slug = setTimeout(() => {
        if (slug.length > 0) {
            API.create_space(
                '/api/space/check_slug/',
                {slug: slug},
                (status, res) => {
                    if (status) {
                        if (res.valid) {
                            $('#spaceNameBtn').attr('disabled', false);
                            $('.red-border').addClass('d-none');
                        }
                        else {
                            $('.red-border').removeClass('d-none');
                        }
                    }
                }
            );
        }
    }, 750)
}
// ... check company slug
$('#spaceNameBtn').on('click', function() {
    ToggleSpaceBoxes($(this));
});
// ... create slug
$('#createSpaceBtn').on('click', function() {
    
    let space = {
        name: $('#companyName').val(),
        slug: $('#companySlug').val(),
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
        if ($(forms[i]).val().trim()) {
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
    window.location.href = '/dashboard/' + $('#companySlug').val();
});

function ToggleSpaceBoxes($this) {
    const box = '.' + $this.attr('box');
    $('.space-row').removeClass('d-flex');
    $('.space-row').addClass('d-none');
    $(box).addClass('d-flex');
}

$('#addAnother').click(function(event) {
    $('#spaceTeammatesBox').find('.form-group.forms').last().after(`
        <div class="form-group forms">
            <input type="email" class="form-control form-input" aria-describedby="email" autocomplete="off">
            <span class="input-line" data-placeholder="Ex. name@example.com"></span>
        </div>
    `);
});

