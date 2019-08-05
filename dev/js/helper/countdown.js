class CountDown {

    startTimer(time, view) {

        let timer = time, 
            minutes = '',
            seconds = '',
            display = view,
            displayMinutes = display.find('.minutes'),
            displaySeconds = display.find('.seconds');

        $('input').removeAttr('readonly');
        display.find('.timer').removeClass('d-none');
        display.find('.resend-email').addClass('d-none');
        

        let countdown = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            displayMinutes.text(minutes);
            displaySeconds.text(seconds);

            if (timer > 0) {
                --timer;
            }
            else {
                timer = time;
                clearInterval(countdown);
                
                $('input').attr('readonly', true);
                display.find('.timer').addClass('d-none');
                display.find('.resend-email').removeClass('d-none');
            }
        }, 1000);
    }
}

export default CountDown;