export default function Notif(msg) {
    iziToast.show({
        message: msg,
        backgroundColor: '#4a5cc5',
        messageColor: '#ffffff',
        progressBarColor: '#ffffff',
        position: 'topRight'
    });
}