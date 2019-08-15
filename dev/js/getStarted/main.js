import CountDown from './../helper/countdown';



const API = require('./../api.js');
var $inputs = $(".digit-cell");
var intRegex = /^\d+$/;

// ... navigate through get started boxes with url change
$('#findSpaceBtn, #newSpaceBtn').click(function () {
    const location = $(this).attr('location');
    window.location.href = '/getStarted/' + location;
});

// ... navigate through get started boxes
$('.get-started-link').click(function () {
    const box = '.' + $(this).attr('box');
    $('.get-started-box').removeClass('d-block');
    $('.get-started-box').addClass('d-none');
    $(box).addClass('d-block');
});
// Prevents user from manually entering non-digits.
$inputs.on("input.fromManual", function () {
    // ... change focus on type
    const cellIndex = $(this).attr('index');
    if ($(this).val().length == 1) {
        $(this).blur();
        setTimeout(() => {
            $('input[name="char[' + (Number(cellIndex) + 1) + ']"]').focus();
        }, 100);
    }
    // ... check for NaN
    if (!intRegex.test($(this).val())) {
        $(this).val("");
    }
});

$inputs.on('contextmenu', function () {
    console.log('on context menu')
})

// Prevents pasting non-digits and if value is 6 characters long will parse each character into an individual box.
$inputs.on("paste", function () {
    var $this = $(this);
    var originalValue = $this.val();

    $this.val("");

    $this.one("input.fromPaste", function () {

        var pastedValue = $(this).val();
        if (pastedValue.length == 6 && intRegex.test(pastedValue)) {
            pasteValues(pastedValue);
        }
        else {
            $this.val(originalValue);
        }

        $inputs.attr("maxlength", 1);
    });

    $inputs.attr("maxlength", 6);
});

$inputs.on("keydown", function (e) {
    var $this = $(this);
    const cellIndex = $this.attr('index');
    // ... arrowLeft
    if (e.keyCode == 37) {
        $this.blur();
        setTimeout(() => {
            $('input[name="char[' + (Number(cellIndex) - 1) + ']"]').focus();
        }, 100);
    }
    // ... arrowRight
    if (e.keyCode == 39) {
        $this.blur();
        setTimeout(() => {
            $('input[name="char[' + (Number(cellIndex) + 1) + ']"]').focus();
        }, 100);
    }
    // ... check verification
    setTimeout(() => {
        const otp = $('input[name="char[1]"]').val() + $('input[name="char[2]"]').val() + $('input[name="char[3]"]').val() + $('input[name="char[4]"]').val() + $('input[name="char[5]"]').val() + $('input[name="char[6]"]').val();
        if (otp.length == 6) {
            if ($this.closest('.get-started-box').hasClass('new-email-code-box')) {
                checkVerification(
                    {
                        "user_email": $('.new-space-email-box').find('#adminEmail').val(),
                        "user_otp": otp
                    },
                    (res) => {
                        window.location.replace('space');
                    }
                );
            }
            else if ($this.closest('.get-started-box').hasClass('find-space-code-box')) {
                checkVerification(
                    {
                        "user_email": $('.find-space-email-box').find('#userEmail').val(),
                        "user_otp": otp
                    },
                    (res) => {
                        window.location.replace('/');
                    }
                );
            }
        }
    }, 200);
});

// ... verify email ...
$('.send-otp, #resendEmail').on('click', function () {
    const temp = $(this);
    $('.' + $(this).attr('box')).find('input').val('');
    RequestOtp(
        { "user_email": $(this).closest('form').find('[type="email"]').val() },
        $('.' + $(this).attr('box')).find('.countdown')
    );
});

// Parses the individual digits into the individual boxes.
function pasteValues(element) {
    var values = element.split("");
    $(values).each(function (index) {
        var $inputBox = $('.digit-cell[name="char[' + (index + 1) + ']"]');
        $inputBox.val(values[index])
    });
};
// ... request otp
function RequestOtp(params, countdownElement) {
    API.verify_email(
        '/api/user/login/otp/request/',
        params,
        (status, res) => {
            if (status) {
                const countdown = new CountDown();
                countdown.startTimer(res.expire, countdownElement);
            }
            else {
                console.log('error')
            }
        })
}
// ... verify otp
function checkVerification(params, callback) {
    API.verify_email(
        '/api/user/login/otp/verify/',
        params,
        (status, res) => {
            if (status, res) {
                callback(res);
            }
            else {
                console.log('error')
            }
        }
    );
}