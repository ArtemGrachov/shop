const menuToggle = function (classBlock) {
    const btn = $(`.${classBlock}__toggle`),
        list = $(`.${classBlock}-list`);

    btn.on('click', (e) => {
        e.preventDefault();
        list.slideToggle();
    })
    $(window).resize(() => {
        if (btn.css('display') === 'none') {
            list.css({
                display: ''
            })
        }
    })
}