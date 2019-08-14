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
    $('.space-row').removeClass('d-flex');
    $('.space-row').addClass('d-none');
});

$('#spaceNameBtn').click(function() {
    $('.space-info-container').removeClass('d-none');
    $('.space-info-container').addClass('d-flex');    
});

$('#spaceInfoBtn').click(function() {
    $('.space-teammates-container').removeClass('d-none'); 
    $('.space-teammates-container').addClass('d-flex');    
});

$('#addTeammatesBtn').click(function() {
    $('.space-alert-container').removeClass('d-none');  
    $('.space-alert-container').addClass('d-flex');    
});

$('#tadaBtn').click(function() {
    window.location.replace('/');  
});



