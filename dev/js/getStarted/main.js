// import verify_email from './../api.js';
const API = require('./../api.js');



$('.get-started-link').click(function() {
    $('.get-started-box').removeClass('d-block');
    $('.get-started-box').addClass('d-none');
});

$('#newSpaceBtn').click(function() {
    $('.validate-email-box').addClass('d-block');    
});

$('#confirmEmailBtn').click(function() {
    $('.validate-code-box').addClass('d-block');    
});

$('.find-space-btn').click(function() {
    $('.find-space-email-box').addClass('d-block');    
});

$('#checkEmailBtn').click(function() {
    $('.check-inbox-box').addClass('d-block');    
});

var $inputs = $(".digit-cell");
var intRegex = /^\d+$/;

// Prevents user from manually entering non-digits.
$inputs.on("input.fromManual", function(){
    // ... change focus on type
    const cellIndex = $(this).attr('index');
    if ($(this).val().length == 1) {
        $(this).blur();
        setTimeout(() => {
            $('input[name="char['+ (Number(cellIndex) + 1) +']"]').focus();
        },100);
    }
    // ... check for NaN
    if(!intRegex.test($(this).val())){
        $(this).val("");
    }
});

// Prevents pasting non-digits and if value is 6 characters long will parse each character into an individual box.
$inputs.on("paste", function() {
    var $this = $(this);
    var originalValue = $this.val();
    
    $this.val("");

    $this.one("input.fromPaste", function(){
        $currentInputBox = $(this);
        
        var pastedValue = $currentInputBox.val();
        
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

$inputs.on("keydown", function(e) {
    var $this = $(this);
    const cellIndex = $this.attr('index');
    // ... arrowLeft
    if (e.keyCode == 37) {
        $this.blur();
        setTimeout(() => {
            $('input[name="char['+ (Number(cellIndex) - 1) +']"]').focus();
        },100);
    }
    // ... arrowRight
    if (e.keyCode == 39) {
        $this.blur();
        setTimeout(() => {
            $('input[name="char['+ (Number(cellIndex) + 1) +']"]').focus();
        },100);
    }
});


// Parses the individual digits into the individual boxes.
function pasteValues(element) {
    var values = element.split("");
    $(values).each(function(index) {
        var $inputBox = $('.digit-cell[name="char[' + (index + 1) + ']"]');
        $inputBox.val(values[index])
    });
};

// ... verify email ...
$('#confirmEmailBtn').on('click',() => {
    API.verify_email({
        "user_email": $('.validate-email-box').find('#adminEmail').val()
    },(status) => {
        if (status, res) {
            console.log('callback success')
        }
        else {
            console.log('callback error')
        }
    })
})