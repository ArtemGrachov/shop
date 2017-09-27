const slider = function (duration, toggleSpeed) {
    let flag = true,
        timer;

    return {
        init: function () {
            const _this = this;
            _this.autoSwitch();
            $('.slider').each(function () {
                const $this = $(this);
                $this.find('.slider-item')
                    .first()
                    .addClass('slider-item_active');

            })

            $('.slider-btn').on('click', function (e) {
                e.preventDefault();
                const $this = $(this),
                    slider = $this.closest('.slider'),
                    dir = (() => {
                        if ($this.hasClass('slider-btn_left')) {
                            return 'left';
                        } else if ($this.hasClass('slider-btn_right')) {
                            return 'right';
                        }
                    })();
                _this.moveSlide(slider, dir);
            })
        },
        moveSlide: function (slider, dir) {
            if (flag) {
                flag = false;
                const _this = this,
                    oldActive = slider.find('.slider-item_active');
                let newPosStart, oldPosEnd, newActive;

                if (dir === 'right') {
                    newPosStart = '100%';
                    oldPosEnd = '-100%';
                    newActive = oldActive.next();
                    if (!newActive.length) {
                        newActive = slider.find('.slider-item').first();
                    }
                } else if (dir === 'left') {
                    newPosStart = '-100%';
                    oldPosEnd = '100%';
                    newActive = oldActive.prev();
                    if (!newActive.length) {
                        newActive = slider.find('.slider-item').last();
                    }
                }
                newActive.css({
                    left: newPosStart
                });

                newActive.addClass('slider-item_active');

                oldActive.animate({
                    left: oldPosEnd
                }, toggleSpeed);
                newActive.animate({
                    left: '0'
                }, toggleSpeed, () => {
                    oldActive.removeClass('slider-item_active');
                    flag = true;
                    this.clearTimer();
                })
            }
        },
        autoSwitch: function () {
            let _this = this,
                sliders = $('.slider');

            timer = setInterval(() => {
                sliders.each(function () {
                    _this.moveSlide($(this), 'right');
                })
            }, duration)
        },
        clearTimer: function () {
            if (timer) {
                clearInterval(timer);
                this.autoSwitch();
            }
        }
    }
};