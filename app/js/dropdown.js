const dropdown = function () {
    $('.dropdown').each(function () {
        const $this = $(this),
            $btn = $this.find('.dropdown-btn');
        $this.find('.dropdown-item').each(function () {
            const $item = $(this);
            if ($item.text() === $btn.text()) {
                $item.addClass('dropdown-item_active');
                return;
            }
        })
    })
    $('.dropdown-btn').on('click', function (e) {
        e.preventDefault();
        const $this = $(this);
        $this.closest('.dropdown')
            .toggleClass('dropdown_active')
    })
    $('.dropdown-item').on('click', function () {
        const $this = $(this),
            dropdown = $this.closest('.dropdown');
        dropdown.find('.dropdown-btn')
            .text($this.text());
        $this.addClass('dropdown-item_active')
            .siblings()
            .removeClass('dropdown-item_active');
        dropdown.removeClass('dropdown_active');
    })
}