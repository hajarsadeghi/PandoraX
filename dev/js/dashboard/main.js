import HighlightSidebar from './../helper/highlightSidebar';



$(document).ready(function() {
    // ... hightlight active sidebar 
    const sidebar = new HighlightSidebar({root: '.navbar-nav'});
    sidebar.hightlight();

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