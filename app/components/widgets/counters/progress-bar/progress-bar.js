// Progress bar
window.onload = function () {
	let progressBars = document.querySelectorAll('.progress__bar-item');

	progressBars.forEach(function (progressBar) {
		let targetValue = progressBar.dataset.target;
		// Початкове значення 0%
		progressBar.style.width = '0%';

		// Використовуємо setTimeout, щоб після завантаження прогрес-барів відразу з'явилася анімація
		setTimeout(function () {
			progressBar.style.width = targetValue + '%';
		}, 100); // Затримка перед анімацією
	});
};
