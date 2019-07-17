// ... login form transition ...
$(document).on('keyup','.login-input',function() {
    if ($(this).val()) {
        $(this).addClass('has-val');
    }
    else {
        $(this).removeClass('has-val');
    }
})

// ... load animation using lottie ...
lottie.loadAnimation({
    container: document.getElementById('animation'),
    path: anim,
    renderer: 'svg',
    autoplay: true,
    loop: true
});

$(document).on('click','.sign-up-link',function() {
    $('.login-form').removeClass('d-block');
    $('.login-form').addClass('d-none');
    $('.register-form').removeClass('d-none');
    $('.register-form').addClass('d-block');
});

$(document).on('click','.login-link',function() {
    $('.register-form').removeClass('d-block');
    $('.register-form').addClass('d-none');
    $('.login-form').removeClass('d-none');
    $('.login-form').addClass('d-block');
});