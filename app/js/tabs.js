const tabs = function (classBlock) {
    return {
        init: function () {
            const _this = this;
            _this.setActive(0);
            $(`.${classBlock}-nav__link`)
                .on('click', function (e) {
                    e.preventDefault();
                    const item = $(this).closest(`.${classBlock}-nav-item`);
                    _this.setActive(item.index());
                })
        },
        setActive: function (index) {
            $(`.${classBlock}-nav-item`)
                .eq(index)
                .addClass(`${classBlock}-nav-item_active`)
                .siblings()
                .removeClass(`${classBlock}-nav-item_active`);
            $(`.${classBlock}-item`)
                .eq(index)
                .addClass(`${classBlock}-item_active`)
                .siblings()
                .removeClass(`${classBlock}-item_active`);
        }
    }
}