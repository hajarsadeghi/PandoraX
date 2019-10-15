import { hideTintedBackdrop } from './../../helper'; 
// import { get_users } from './../../api';



$('.post-toggled').on('click', function() {
    // ... post collapse via js
    if ($('.post-toggled').attr('aria-expanded') == 'false') {
        // // ... on type event
        // let textArea = document.querySelectorAll('.emojionearea-editor');
        // textArea.forEach(function(elem) {
        //     elem.addEventListener('keyup', function() {
        //         postTyping($(this), $(this).text())
        //     })
        // })
        // ... collapse
        $('.post-toggled').attr('aria-expanded', 'true');
        $('.post-expanded').collapse('show');
        $('.tinted').css({'visibility':'visible', 'opacity': '1'});
    }
});
// ... post backdrop
$('.tinted').on('click', function() {
    hideTintedBackdrop()
});

// $('#mention').on('click', function() {
//     insertTextAtCursor('@')
//     // $('#RegularPostContent').find('.emojionearea-editor').insertAfter('<a href="#">@</a>');
//     // $('@').insertAfter('#RegularPostContent .emojionearea-editor')
// })

// function postTyping(elem, value) {
//         // console.log(value,'====value')
       
//     if (value.charAt(value.length - 1) == '@') {
//         let valueBeforeMention = value.slice(0, value.length - 1);
//         // console.log('this is @')
//         elem.html(valueBeforeMention +  '<a href="#">@</a>')
//         // get_users({
//         //     search: '',
//         //     pagin: true,
//         //     data_limit: 15,
//         //     page: 1,
//         //     exclude_myself: true
//         // }, (status, response) => {
//         //     if (status) {
//         //         console.log(response)
//         //     }
//         // })
//     }
// }

// function insertTextAtCursor(text) {
//     var sel, range;
//     if (window.getSelection) {
//         sel = window.getSelection();
//         if (sel.getRangeAt && sel.rangeCount) {
//             range = sel.getRangeAt(0);
//             range.deleteContents();
//             range.insertNode( document.createTextNode(text) );
//         }
//     } else if (document.selection && document.selection.createRange) {
//         document.selection.createRange().text = text;
//     }
// }