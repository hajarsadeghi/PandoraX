class HighlightSidebar {
    constructor({root}) {
        this.navbar = $(root); 
        this.navItem = $(this.navbar).find('.nav-item');
        this.pathname = document.location.pathname;
    }

    hightlight() {
        for (let i = 0; i < this.navItem.length; i++) {
            if ($(this.navItem[i]).attr('url') == this.pathname) {
                $(this.navItem[i]).find('.nav-link').closest('.nav-item').addClass('active');
            }
        }
    }
}

export default HighlightSidebar;