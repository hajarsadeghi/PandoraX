import Dropdown from './../helper/dropdown.js';



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

// ... dropdown ...
const dropdown = new Dropdown({root: '.dropdown-container'});

