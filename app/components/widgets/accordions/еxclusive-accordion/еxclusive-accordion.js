// Script for accordion
function toggleAccordion(header) {
	const accordionItems = document.querySelectorAll('.ex-accordion__item');

	accordionItems.forEach(item => {
		const content = item.querySelector('.ex-accordion__content');
		const arrow = item.querySelector('.arrow');

		// Close all items and return the cross
		if (content.classList.contains('show') && item !== header.parentElement) {
			content.classList.remove('show');
			arrow.innerHTML = `<path transform="rotate(45, 12, 12)" d="M19,19,5,5M19,5,5,19" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>`;
		}
	});

	const content = header.nextElementSibling;
	const arrow = header.querySelector('.arrow');
	const isActive = content.classList.contains('show');

	content.classList.toggle('show', !isActive);

	// Change the icon to a minus or a rotated cross
	if (!isActive) {
		arrow.innerHTML = `<path d="M5,12h14" fill="none" stroke="#000000" stroke-linecap="round" stroke-width="2"></path>`;
	} else {
		arrow.innerHTML = `<path transform="rotate(45, 12, 12)" d="M19,19,5,5M19,5,5,19" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>`;
	}
}
