$(document).ready(function() {
    // ... toggle active link in sidebar ...
    $('.nav-item').click(function() {
        $('nav .nav-item').removeClass('active');
        $(this).addClass('active');
    });

    $('.navbar-profile-wrapper').click(function() {
        $(this).find('.material-icons').toggleClass('toggle');
    });

    // ... responsive sidebar ...
    $('.menu-collapse-btn').click(function() {
        $(this).toggleClass('navbar-is-visible');
        if ($('.bilino-navbar').hasClass('side-is-visible')) {
            $('.bilino-navbar').removeClass('side-is-visible');
            $('.bilino-main').removeClass('main-is-partially-visible');
            $('.bilino-navbar').addClass('side-is-hidden');
            $('.bilino-main').addClass('main-is-fully-visible');
        }
        else {
            $('.bilino-navbar').removeClass('side-is-hidden');
            $('.bilino-main').removeClass('main-is-fully-visible');
            $('.bilino-navbar').addClass('side-is-visible');
            $('.bilino-main').addClass('main-is-partially-visible');
        }
    });
});