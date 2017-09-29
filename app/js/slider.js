const slider = function () {
    const $slider = $('.slider').flickity({
        cellSelector: '.slider-item',
        wrapAround: true,
        autoPlay: 2000
    });
}