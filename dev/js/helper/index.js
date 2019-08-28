export default function Notif(msg) {
    iziToast.show({
        message: msg,
        backgroundColor: '#4a5cc5',
        messageColor: '#ffffff',
        progressBarColor: '#ffffff',
        position: 'topRight'
    });
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