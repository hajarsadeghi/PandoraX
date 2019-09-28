import Dropdown from './../helper/dropdown.js';
import { Notif, validateEmail } from './../helper';
import {create_space} from './../api.js';

// ... initialize dropdown ...
new Dropdown({root: '.dropdown-container'});

$('.space-btn').not(':last-child').attr('disabled', true);

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
            create_space(
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

$('.industry-dropdown, .members-count').on('click change keyup', function() {

    let industry_id = $('.industry').attr('id'),
        members = $('.members-count').val();

    if (Boolean(industry_id && members)) {
        $('#createSpaceBtn').attr('disabled', false);
    }
    else {
        $('#createSpaceBtn').attr('disabled', true);
    }
})

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
        create_space(
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

$('#spaceTeammatesBox input.form-input').on('keyup', function() {

    let teammates_emails = $('#spaceTeammatesBox input.form-input'),
        has_email = true;

    for (let i = 0; i < teammates_emails.length; i++) {
        if (!$(teammates_emails[i]).val() || !validateEmail($(teammates_emails[i]).val())) {
            has_email = false;
        }
    }
    if (has_email) {
        $('#addTeammatesBtn').attr('disabled', false)
    }
    else {
        $('#addTeammatesBtn').attr('disabled', true)
    }
})

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
        create_space(
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

$('#addAnother').click(function() {
    console.log($('#spaceTeammatesBox').innerHeight(), '========height before')
    $('#spaceTeammatesBox').find('.form-group.forms').last().after(`
        <div class="form-group forms">
            <input type="email" class="form-control form-input" aria-describedby="email" autocomplete="off">
            <span class="input-line" data-placeholder="Ex. name@example.com"></span>
        </div>
    `);
    $('#spaceTeammatesBox').css('height', $('#spaceTeammatesBox').innerHeight())
    let height_diff = Math.round($('.container-fluid').innerHeight() - $('nav').innerHeight() - $('#spaceTeammatesBox').innerHeight())
    console.log(height_diff,'====diff')
    if (height_diff < 145) {
        $('#spaceTeammatesBox').css('overflow-y', 'scroll');
    }
});

