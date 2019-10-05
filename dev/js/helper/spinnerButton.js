import '../../css/helper/bilono-spinner.scss';


$('.bilono-spinner').html( '<span>'+ $('.bilono-spinner').text() +'</span>' + '<img class="bilono-lottie mx-1 d-none" id="bilonoSpinner" src="'+ button_spinner +'" /> ')

$('.bilono-spinner').on('click', function() {
  if ($(this).find('.bilono-lottie').hasClass('d-none')) {
    $( this ).animate({
      'width': $(this).innerWidth() + 30 + 'px'
    }, 500, function() {
      $('.bilono-lottie').removeClass('d-none')
    });
  }
})

export function defaultButton(status) {
  if (status) {
    $( '.bilono-spinner' ).animate({
      'width': $('.bilono-spinner').innerWidth() - 30 + 'px'
    }, 500, function() {
      $('.bilono-lottie').addClass('d-none')
    });
  }
}
