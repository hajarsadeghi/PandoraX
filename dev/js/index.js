$(document).ready(function() {
    $('.menu-collapse-btn').click(function() {
        $(this).toggleClass('navbar-is-visible');
        $('.bilino-navbar').toggleClass('bilino-navbar-collapse');
    });
});