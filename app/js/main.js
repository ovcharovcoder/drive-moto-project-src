// Promo slider
$(function () {
	initSlickSlider();
	initSearchTabs();
});

function initSlickSlider() {
	const $slider = $('.banner-section__slider');
	if ($slider.length) {
		$slider.slick({
			dots: true,
			arrows: true,
			prevArrow:
				'<button class="banner-section__slider-btn banner-section__slider-btn-prev"><img src="img/icons/arrow-white-left.svg" alt="arrow-left"></button>',
			nextArrow:
				'<button class="banner-section__slider-btn banner-section__slider-btn-next"><img src="img/icons/arrow-white-right.svg" alt="arrow-right"></button>',
		});
	}
}

// Tabs
$('.tab').on('click', function (e) {
	e.preventDefault();

	$($(this).siblings()).removeClass('tab--active');
	$($(this).parent().siblings().find('div')).removeClass(
		'tabs-content--active'
	);

	$(this).addClass('tab--active');
	$($(this).attr('href')).addClass('tabs-content--active');
});

$('.product-item__favorite').on('click', function () {
	$(this).toggleClass('product-item__favorite--active');
});

// Product slider
$('.product-slider').slick({
	slidesToShow: 4,
	slidesToScroll: 1,
	prevArrow:
		'<button class="product-slider__slider-btn product-slider__slider-btn-prev"><img src="img/icons/arrow-black-left.svg" alt="arrow-left"></button>',
	nextArrow:
		'<button class="product-slider__slider-btn product-slider__slider-btn-next"><img src="img/icons/arrow-black-right.svg" alt="arrow-right"></button>',
});
