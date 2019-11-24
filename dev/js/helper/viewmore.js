export const viewMore = (className) => {
    new Readmore(className, {
        speed: 75,
        collapsedHeight: 100,
        startOpen: false,
        lessLink: '<a class="px-3 py-2 text-muted" href="#">Read less</a>',
        moreLink: '<a class="px-3 py-2 text-muted" href="#">Read more</a>'
    });
}