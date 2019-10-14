$('.tabs-link').on('click', function() {
    $('.custom-tabs').find('.tabs-link').removeClass('active')
    $(this).addClass('active');
    $('.custom-tabs').find('.tab-panel').removeClass('d-none')
    $('.custom-tabs').find('.tab-panel').not('#'+$(this).attr('related-tab')).addClass('d-none');
})