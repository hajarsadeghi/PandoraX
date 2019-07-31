import Dropdown from './../helper/dropdown.js';



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

$('.space-btn').click(function() {
    $('.space-box').removeClass('d-block');
    $('.space-box').addClass('d-none');
});

$('#spaceNameBtn').click(function() {
    $('#spaceInfoBox').addClass('d-block');    
});

$('#spaceInfoBtn').click(function() {
    $('#spaceTeammatesBox').addClass('d-block');    
});

$('#addTeammatesBtn').click(function() {
    $('#spaceAlertBox').addClass('d-block');    
});



