// Slick Slider
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
				'<button class="banner-section__slider-btn banner-section__slider-btn-prev"><img src="img/icons/arrow-left.svg" alt="arrow-left"></button>',
			nextArrow:
				'<button class="banner-section__slider-btn banner-section__slider-btn-next"><img src="img/icons/arrow-right.svg" alt="arrow-right"></button>',
		});
	}
}

// Search Tabs
function initSearchTabs() {
	$('.search__tabs').on('click', '.search__tabs-item', function (e) {
		e.preventDefault();

		$('.search__tabs-item').removeClass('search__tabs-item--active');
		$('.search__content-item').removeClass('search__content-item--active');

		$(this).addClass('search__tabs-item--active');
		$($(this).attr('href')).addClass('search__content-item--active');
	});
}
