$(document).ready(function() {
    // ... toggle active link in sidebar ...
    $('.nav-item').click(function() {
        $('nav .nav-item').removeClass('active');
        $(this).addClass('active');
    });

    $('.bilino-navbar').click(function() {
        $(this).find('.material-icons').toggleClass('toggle');
    });

    // ... responsive sidebar ...
    $('.menu-collapse-btn').click(function() {
        $(this).toggleClass('navbar-is-visible');
        $('.bilino-navbar').toggleClass('bilino-navbar-collapse');
    });
});