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

// Filter
$('.filter-style').styler();

$('.filter__item-drop-title').on('click', function () {
	$(this).toggleClass('filter__item-drop-title--active');
	$(this).next().slideToggle();
});

// RangeSlider plugin
$('.js-range-slider').ionRangeSlider({
	// Приховує значення над повзунком
});

// Filter Grid or List
$('.catalog__filter-btn-grid').on('click', function () {
	$(this).addClass('catalog__filter-btn--active');
	$('.catalog__filter-btn-list').removeClass('catalog__filter-btn--active');

	$('.catalog__inner-list').removeClass('catalog__inner-list--list');
	$('.catalog__inner-list .product-item__wrapper').removeClass(
		'product-item__wrapper--list'
	);
});

$('.catalog__filter-btn-list').on('click', function () {
	$(this).addClass('catalog__filter-btn--active');
	$('.catalog__filter-btn-grid').removeClass('catalog__filter-btn--active');

	$('.catalog__inner-list').addClass('catalog__inner-list--list');
	$('.catalog__inner-list .product-item__wrapper').addClass(
		'product-item__wrapper--list'
	);
});
