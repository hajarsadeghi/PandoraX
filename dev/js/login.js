// import lottie from 'lottie-web';
// import data from 'data.json';



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