export function Notif(msg) {
    iziToast.show({
        message: msg,
        backgroundColor: '#4a5cc5',
        messageColor: '#ffffff',
        progressBarColor: '#ffffff',
        position: 'topRight'
    });
}

$( ".dropdown-input.industry" ).on('focus', function() {
    if (!$('.industry-dropdown').hasClass('d-block')) {
        $(this).next().addClass('open')
    }
});

$( ".dropdown-input.industry" ).on('blur', function() {
    if ($('.industry-dropdown').hasClass('d-block')) {
        $('.dropdown-caret').removeClass('open');
    }
});

// ... email validation
export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
// ... reset post after is added
export function hideTintedBackdrop() {
    if ($('.post-toggled').attr('aria-expanded') == 'true') {
        $('.post-toggled').attr('aria-expanded', 'false');
        $('.post-expanded').collapse('hide');
        $('.emojionearea-button').css('visibility', 'hidden')
        $('.tinted').css({'visibility':'hidden', 'opacity': '0'});
    }
}

// export function LottieAnimation(arr, badge) {
//     for (let i = 0; i < arr.length; i++) {
//         lottie.loadAnimation({
//             container: document.getElementById(arr[i]),
//             path: badge,
//             renderer: 'svg',
//             autoplay: true,
//             loop: true
//         });   
//     }
// }