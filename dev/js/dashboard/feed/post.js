import { InitializePostDropzone } from './../../helper/dropzone';
import { get_users } from './../../api';


// ... initialize emoji
$(".post-content").emojioneArea({
    pickerPosition: "right",
    tonesStyle: "bullet",
    autocomplete: true,
    events: {
        ready: function() {
            this.editor.textcomplete([{
                id: 'emojionearea',
                match: /\B@([\-\d\w]*)$/,
                search: function (term, callback) {
                    // this code must be replaced with your
                    // load mentions from ajax
                    var mentions = ['Peter', 'Tom', 'Anne'];
                    callback($.map(mentions, function (mention) {
                    return mention.indexOf(term) === 0 ? mention : null;
                }));
                },
                template: function (value) {
                    return '<b>' + value + '</b>&nbsp;';
                },
                replace: function (value) {
                    return '<b>@' + value + '</b>&nbsp;';
                },
                cache: true,
                index: 1
            }]);
        }
    }
});
$(".post-content").data("emojioneArea").enable();

$('.post-toggled').on('click', function() {
    // ... post collapse via js
    if ($('.post-toggled').attr('aria-expanded') == 'false') {
        // ... on type event
        let textArea = document.querySelectorAll('.emojionearea-editor');
        textArea.forEach(function(elem) {
            elem.addEventListener('keyup', function() {
                postTyping($(this), $(this).text())
            })
        })
        // ... collapse
        $('.post-toggled').attr('aria-expanded', 'true');
        $('.post-expanded').collapse('show');
        $('.emojionearea-button').css('visibility', 'visible')
        $('.tinted').css({'visibility':'visible', 'opacity': '1'});
    }
});
// ... post backdrop
$('.tinted').on('click', function() {
    if ($('.post-toggled').attr('aria-expanded') == 'true') {
        $('.post-toggled').attr('aria-expanded', 'false');
        $('.post-expanded').collapse('hide');
        $('.emojionearea-button').css('visibility', 'hidden')
        $('.tinted').css({'visibility':'hidden', 'opacity': '0'});
        $('.selected-badge-container,.post-recognition').addClass('d-none');
        $('.use-badge-section').removeClass('d-none');
    }
});

InitializePostDropzone((status, res) => {
    if (status) {
        console.log('success')
    }
})

$('#mention').on('click', function() {
    insertTextAtCursor('@')
    // $('#RegularPostContent').find('.emojionearea-editor').insertAfter('<a href="#">@</a>');
    // $('@').insertAfter('#RegularPostContent .emojionearea-editor')
})

function postTyping(elem, value) {
        console.log(value,'====value')
       
    if (value.charAt(value.length - 1) == '@') {
        let valueBeforeMention = value.slice(0, value.length - 1);
        console.log('this is @')
        elem.html(valueBeforeMention +  '<a href="#">@</a>')
        // get_users({
        //     search: '',
        //     pagin: true,
        //     data_limit: 15,
        //     page: 1,
        //     exclude_myself: true
        // }, (status, response) => {
        //     if (status) {
        //         console.log(response)
        //     }
        // })
    }
}

function insertTextAtCursor(text) {
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode( document.createTextNode(text) );
        }
    } else if (document.selection && document.selection.createRange) {
        document.selection.createRange().text = text;
    }
}


// $(document).ready(function() {
//     console.log(document.getElementById("#RegularPostContent"),'here')
//     document.getElementById("#RegularPostContent").addEventListener("input", function() {
//         console.log("input event fired");
//     }, false);
// })