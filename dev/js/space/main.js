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

