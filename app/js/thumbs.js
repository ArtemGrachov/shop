const thumbs = (function () {
    const duration = 500;
    return {
        init: function () {
            const _this = this;
            _this.click('hot', $('#thumbsHot').parent());
            $('#thumbsHot').on('click', function (e) {
                e.preventDefault();
                _this.click('hot', $(this).parent());
            });
            $('#thumbsLatest').on('click', function (e) {
                e.preventDefault();
                _this.click('latest', $(this).parent())
            });
            $('#thumbsBest').on('click', function (e) {
                e.preventDefault();
                _this.click('best', $(this).parent())
            });
        },
        click: function (category, li) {
            const activeClass = 'thumbs-select-item_active';
            if (!li.hasClass(activeClass)) {
                const _this = this;
                const thumbsUp = $('#thumbsUp'),
                    thumbsDown = $('#thumbsBottom')
                li
                    .addClass(activeClass)
                    .siblings()
                    .removeClass(activeClass);
                thumbsUp.stop(true, true).animate({
                    opacity: '0'
                }, duration);
                thumbsDown.stop(true, true).animate({
                    opacity: '0'
                }, duration);
                setTimeout(
                    function () {
                        fakeBackend(category).then(res => _this.view(res));
                    }, duration);
            }
        },
        view: function (res) {
            const thumbsUp = $('#thumbsUp'),
                thumbsDown = $('#thumbsBottom');
            thumbsUp.empty();
            thumbsDown.empty();

            res.forEach(
                (product, index) => {
                    const thumbItem = `
                    <li class="thumbs-item block block_bg block_bg-hover">
                        <div class="thumbs-preview">
                            <div class="thumbs-preview__pic">
                                <img class="thumbs-preview__img" src=${product.img} alt=${product.name} />
                            </div>
                            ${ product.discount ? `<div class="thumbs-preview-price-wrap"><div class="thumbs-preview__price">${product.price}</div><div class="thumbs-preview__currency">USD</div></div>` : ''}
                            <div class="thumbs__name title title_md">${product.name}</div>
                        </div>
                        <div class="thumbs-bottom">
                            <div class="thumbs-bottom__left">
                                <div class="thumbs__price">
                                    ${product.discounbt ? product.discount : product.price}
                                </div> 
                                <div class="thumbs__currency">USD</div>
                            </div>
                            <div class="thumbs-bottom__right">
                                <a class="btn btn_sm thumbs-btn" href="#">Add to cart</a>
                            </div>
                    `;
                    if (index < 4) {
                        thumbsUp.append(thumbItem);
                    } else {
                        thumbsDown.append(thumbItem);
                    }
                    thumbsUp.animate({
                        opacity: '1'
                    }, duration);
                    thumbsDown.animate({
                        opacity: '1'
                    }, duration);
                }
            )
        }
    }
})();


const fakeBackend = function (category) {
    const fakeData = {
        hot: [{
            name: 'Jazz T-Shirt',
            price: 199,
            img: 'https://cdn.childrensalon.com/media/catalog/product/cache/0/small_image/256x256/9df78eab33525d08d6e5fb8d27136e95/a/r/armani-boys-orange-logo-t-shirt-174901-6e42b025150ae92ea2661d802a5bbb82752911ca.jpg'
        }, {
            name: 'The Doors T-Shirt',
            price: 209,
            img: 'https://www.nhsfunfactory.com/mm5/graphics/00000001/INDY_SS_heavensent_blk_sum17_256x256.jpg'
        }, {
            name: 'Lorem Ipsum T-Shirt',
            price: 799,
            img: 'https://www.nhsfunfactory.com/mm5/graphics/00000001/INDY_SS_heavensent_blk_sum17_256x256.jpg'
        }, {
            name: 'Test T-Shirt',
            price: 369,
            discount: 309,
            img: 'https://www.pascogifts.com/files/cache/square/files/migrated-t-shirt-everyday-quality-b763.jpg'
        }, {
            name: 'White T-Shirt',
            price: 199,
            img: 'https://www.pascogifts.com/files/cache/square/files/migrated-t-shirt-everyday-quality-b763.jpg'
        }, {
            name: 'Red T-Shirt',
            price: 209,
            img: 'https://cdn.childrensalon.com/media/catalog/product/cache/0/small_image/256x256/9df78eab33525d08d6e5fb8d27136e95/a/r/armani-boys-orange-logo-t-shirt-174901-6e42b025150ae92ea2661d802a5bbb82752911ca.jpg'
        }, {
            name: 'Nirvana T-Shirt',
            price: 799,
            discount: 659,
            img: 'https://www.pascogifts.com/files/cache/square/files/migrated-t-shirt-everyday-quality-b763.jpg'
        }, {
            name: 'London T-Shirt',
            price: 369,
            img: 'https://cdn.childrensalon.com/media/catalog/product/cache/0/small_image/256x256/9df78eab33525d08d6e5fb8d27136e95/a/r/armani-boys-orange-logo-t-shirt-174901-6e42b025150ae92ea2661d802a5bbb82752911ca.jpg'
        }],
        latest: [{
            name: 'Dope T-Shirt',
            price: 799,
            img: 'https://www.customink.com/mms/images/catalog/styles/297300/catalog_detail_image_large.jpg'
        }, {
            name: 'Einstein T-Shirt',
            price: 369,
            discount: 469,
            img: 'https://www.customink.com/mms/images/catalog/styles/297300/catalog_detail_image_large.jpg'
        }, {
            name: 'Rock Roll T-Shirt',
            price: 199,
            img: 'https://www.customink.com/mms/images/catalog/styles/297300/catalog_detail_image_large.jpg'
        }, {
            name: 'The Beetles T-Shirt',
            price: 209,
            img: 'https://www.customink.com/mms/images/catalog/styles/297300/catalog_detail_image_large.jpg'
        }, {
            name: 'Cocaine Zero T-Shirt',
            price: 799,
            img: 'https://www.customink.com/mms/images/catalog/styles/297300/catalog_detail_image_large.jpg'
        }, {
            name: 'PowerKing T-Shirt',
            price: 369,
            img: 'https://www.customink.com/mms/images/catalog/styles/297300/catalog_detail_image_large.jpg'
        }, {
            name: 'Captain Awesome T-Shirt',
            price: 199,
            img: 'https://www.customink.com/mms/images/catalog/styles/297300/catalog_detail_image_large.jpg'
        }, {
            name: 'Happy T-Shirt',
            price: 209,
            img: 'https://www.customink.com/mms/images/catalog/styles/297300/catalog_detail_image_large.jpg'
        }],
        best: [{
            name: 'Germany T-Shirt',
            price: 199,
            img: 'https://cdn.childrensalon.com/media/catalog/product/cache/0/small_image/256x256/9df78eab33525d08d6e5fb8d27136e95/a/r/armani-boys-orange-logo-t-shirt-174901-6e42b025150ae92ea2661d802a5bbb82752911ca.jpg'
        }, {
            name: 'Captain Awesome T-Shirt',
            price: 199,
            img: 'https://www.pascogifts.com/files/cache/square/files/migrated-t-shirt-everyday-quality-b763.jpg'
        }, {
            name: 'BMW T-Shirt',
            price: 799,
            img: 'https://www.nhsfunfactory.com/mm5/graphics/00000001/INDY_SS_heavensent_blk_sum17_256x256.jpg'
        }, {
            name: 'Paris T-Shirt',
            price: 369,
            img: 'https://www.pascogifts.com/files/cache/square/files/migrated-t-shirt-everyday-quality-b763.jpg'
        }, {
            name: 'Khaki T-Shirt',
            price: 209,
            img: 'https://www.nhsfunfactory.com/mm5/graphics/00000001/INDY_SS_heavensent_blk_sum17_256x256.jpg'
        }, {
            name: 'Google T-Shirt',
            price: 799,
            img: 'https://www.pascogifts.com/files/cache/square/files/migrated-t-shirt-everyday-quality-b763.jpg'
        }, {
            name: 'Happy T-Shirt',
            price: 209,
            img: 'https://cdn.childrensalon.com/media/catalog/product/cache/0/small_image/256x256/9df78eab33525d08d6e5fb8d27136e95/a/r/armani-boys-orange-logo-t-shirt-174901-6e42b025150ae92ea2661d802a5bbb82752911ca.jpg'
        }, {
            name: 'Power King T-Shirt',
            price: 369,
            img: 'https://cdn.childrensalon.com/media/catalog/product/cache/0/small_image/256x256/9df78eab33525d08d6e5fb8d27136e95/a/r/armani-boys-orange-logo-t-shirt-174901-6e42b025150ae92ea2661d802a5bbb82752911ca.jpg'
        }]
    }
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve(fakeData[category]);
        }, 500)
    })
}