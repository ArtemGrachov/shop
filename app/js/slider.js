const slider = function (duration, toggleSpeed) {
    let flag = true,
        timer;

    return {
        init: function () {
            const _this = this;
            // _this.autoSwitch();
            _this.swipe();
            $('.slider').each(function () {
                const $this = $(this);
                $this.find('.slider-item')
                    .first()
                    .addClass('slider-item_active');

            })

            $('.slider-btn').on('click', function (e) {
                console.log('!')
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
                _this.clearCss(slider);

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
        },
        clearCss: function (slider) {
            slider
                .find('.slider-item')
                .css({
                    left: '',
                    display: ''
                })
        },
        // swipe: function () {
        //     let moveStart,
        //         moveTime,
        //         minDist = 100,
        //         minDur = 100;
        //     const _this = this;

        //     $('.slider')
        //         .on('touchstart', function (e) {
        //             moveStart = e.changedTouches[0].pageX;
        //             moveTime = new Date().getTime();
        //         })
        //         .on('touchmove', function (e) {})
        //         .on('touchend', function (e) {
        //             const diff = e.changedTouches[0].pageX - moveStart,
        //                 $this = $(this);

        //             if (Math.abs(diff) > minDist) {
        //                 e.preventDefault();
        //                 if (new Date().getTime() - moveTime > minDur) {
        //                     if (diff > 0) {
        //                         _this.moveSlide($this, 'left');
        //                     } else {
        //                         _this.moveSlide($this, 'right');
        //                     }
        //                 }
        //             }
        //         })
        // }
        swipe: function () {
            const _this = this;
            let moveStart,
                leftSlide,
                centerSlide,
                rightSlide,
                leftX,
                centerX,
                rightX,
                swipeMove = false;

            const pixelToNumber = function (str) {
                return +str.replace('px', '');
            }

            const setSlides = function (slider, cnSlide) {
                centerSlide = cnSlide;
                leftSlide = centerSlide.prev();
                rightSlide = centerSlide.next();

                if (!cnSlide.hasClass('slider-item_active')) {
                    cnSlide.addClass('slider-item_active')
                        .siblings()
                        .removeClass('slider-item_active')
                }

                if (leftSlide.length == 0) {
                    leftSlide = slider.find('.slider-item').last()
                }
                if (rightSlide.length == 0) {
                    rightSlide = slider.find('.slider-item').first()
                }

                if (leftSlide.css('display') != 'block') {
                    leftSlide.css({
                        display: 'block',
                        left: -(pixelToNumber(slider.css('width')))
                    })
                }
                if (rightSlide.css('display') != 'block') {
                    rightSlide.css({
                        display: 'block',
                        left: pixelToNumber(slider.css('width'))
                    })
                }

                leftX = pixelToNumber(leftSlide.css('left'));
                centerX = pixelToNumber(centerSlide.css('left'));
                rightX = pixelToNumber(rightSlide.css('left'));
            }

            $('.slider')
                .on('touchstart', function (e) {
                    moveStart = e.changedTouches[0].pageX;
                })
                .on('touchmove', function (e) {
                    let moveDiff = e.changedTouches[0].pageX - moveStart;
                    if (swipeMove) {
                        const $this = $(this);
                        leftSlide.css({
                            left: leftX + moveDiff
                        })
                        centerSlide.css({
                            left: centerX + moveDiff
                        })
                        rightSlide.css({
                            left: rightX + moveDiff
                        })
                        if (pixelToNumber(leftSlide.css('left')) >= 0) {
                            moveStart = e.changedTouches[0].pageX;

                            _this.clearCss(slider);
                            setSlides($this, leftSlide);
                        }
                        if (pixelToNumber(rightSlide.css('left')) <= 0) {
                            moveStart = e.changedTouches[0].pageX;

                            _this.clearCss(slider);
                            setSlides($this, rightSlide);
                        }
                    } else if (moveDiff > 100) {
                        if (flag) {
                            const $this = $(this);
                            setSlides($this, $this.find('.slider-item_active'));
                            flag = false;
                            swipeMove = true;
                        }
                    }
                })
                .on('touchend', function (e) {
                    if (swipeMove) {
                        let arrX = [
                            [leftSlide, pixelToNumber(leftSlide.css('left'))],
                            [centerSlide, pixelToNumber(centerSlide.css('left'))],
                            [rightSlide, pixelToNumber(rightSlide.css('left'))],
                        ].sort((a, b) => {
                            const absA = Math.abs(a[1]);
                            const absB = Math.abs(b[1]);
                            if (absA > absB) {
                                return 1
                            } else if (absA < absB) {
                                return -1
                            }
                            return 0
                        });

                        const moveDiff = arrX[0][1];
                        arrX[0][0]
                            .addClass('slide-item_active')
                            .siblings()
                            .removeClass('slider-item_active');

                        arrX[0][0].animate({
                            left: arrX[0][1] - moveDiff
                        }, duration)
                        arrX[1][0].animate({
                            left: arrX[1][1] - moveDiff
                        }, duration)
                        arrX[2][0].animate({
                            left: arrX[2][1] - moveDiff
                        }, duration)
                        setTimeout(() => {
                            flag = true;
                            swipeMove = false;
                        }, duration);
                    }
                })
        }
    }
};