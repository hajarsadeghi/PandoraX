export default function Notif(msg) {
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