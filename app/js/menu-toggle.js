const menuToggle = function (classBlock) {
    const btn = $(`.${classBlock}__toggle`),
        list = $(`.${classBlock}-list`);

    btn.on('click', (e) => {
        e.preventDefault();
        list.slideToggle(500, function () {
            list.toggleClass(`${classBlock}-list_active`);
            list.css({
                display: ''
            })
        });
    })
}