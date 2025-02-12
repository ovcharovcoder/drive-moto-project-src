// Script for accordion
function toggleAccordion(header) {
	const content = header.nextElementSibling;
	const arrow = header.querySelector('.arrow');

	content.classList.toggle('show');
	arrow.classList.toggle('rotate');
}
