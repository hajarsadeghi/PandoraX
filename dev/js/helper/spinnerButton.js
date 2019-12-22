import '../../css/helper/bilono-spinner.scss';


$('.bilono-spinner').html( '<span>'+ $('.bilono-spinner').text() +'</span>' + '<img class="bilono-lottie mx-1 d-none" id="bilonoSpinner" src="'+ button_spinner +'" /> ')

export function inprogressButton($button) {
  let fixedWidth = Number($button.innerWidth()) + 33;
  $button.animate({
    'width': fixedWidth + 'px'
  }, 500, function() {
    $button.find('.bilono-lottie').removeClass('d-none')
  });
}

export function defaultButton($button) {
  let fixedWidth = Number($button.innerWidth()) - 33;
  $button.animate({
    'width': fixedWidth + 'px'
  }, 500, function() {
    $button.find('.bilono-lottie').addClass('d-none')
    }
  );
}
