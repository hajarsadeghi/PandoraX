class Dropdown {

    constructor({root}) {
        this.root = $(root);
        this.index = -1;
        this.target = '';
        this.dropdownInput = this.root.find('.dropdown-input');
        this.dropdownMenu = this.root.find('.dropdown-custom-menu');
        this.link = this.dropdownMenu.find('a.dropdown-item');

        // ... Bind events ...
        document.addEventListener('click', ev => this._closeDropdown(ev));
        this.dropdownInput.on('click', ev => this._openDropdown(ev));
        this.dropdownInput.on('keyup',ev => this._onKeyup(ev));
        this.dropdownInput.on('change',ev => this._onChange(ev));
        this.link.on('click',ev => this._handleClick(ev));
    }

    _closeDropdown(ev) {
        this.checkValue();
        this.index = -1;
        this.target = '';
        if (!$(ev.target).hasClass('dropdown-input')) {
            this.dropdownMenu.removeClass('d-block');
        }
    }

    _openDropdown(ev) {
        this.dropdownInput.addClass('has-val');
        this.dropdownMenu.addClass('d-block');
    }

    _onKeyup(ev) {
        ev.stopPropagation();
        if (ev.key == 'Enter') {
            this.dropdownInput.val(this.target.text());
            this.dropdownInput.attr('id', this.target.attr('id'))
            
        }
        // ... search
        let arr = this.search(ev.target.value);
        // ... keyup & keydown navigation
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].className.includes('active')) {
                this.index = i;
            }
        }

        $(arr).removeClass('active');
        if (ev.key == 'ArrowUp') {
            if (this.index != 0) {
                this.target = $(arr[this.index - 1]);
                this.target.addClass('active');
            }
            else if (this.index == 0) {
                this.target = $(arr[arr.length - 1]);
                this.target.addClass('active');
            }
            else {
                this.target = $(arr[0]);
                this.target.addClass('active')
            }
        }
        else if (ev.key == 'ArrowDown') {
            if (this.index != (arr.length - 1)) {
                this.target = $(arr[this.index + 1]);
                this.target.addClass('active');
            }
            else if (this.index == (arr.length - 1)) {
                this.target = $(arr[0]);
                this.target.addClass('active');
            }
            else {
                this.target = $(arr[this.index]);
                this.target.addClass('active');
            }
        }
    }

    search(str) {
        let arr = [];

        this.link.removeClass('d-none');
        for (let i = 0; i < this.link.length; i++) {
            if (!this.link[i].innerText.trim().toLowerCase().includes(str.trim().toLowerCase())) {
                $(this.link[i]).addClass('d-none');
            }
            else {
                arr.push(this.link[i]);
            }
        }

        return arr;
    }

    _onChange(ev) {
        this.checkValue();
    }

    checkValue() {
        if (this.dropdownInput.val()) {
            this.dropdownInput.addClass('has-val');
        }
        else {
            this.dropdownInput.removeClass('has-val');
        }
    }

    _handleClick(ev) {
        this.dropdownInput.addClass('has-val');
        this.dropdownInput.val($(ev.target).text());
        this.dropdownInput.attr('id', $(ev.target).attr('id'))
    }
}

export default Dropdown;