// Category filter
document.querySelectorAll('.filter-button').forEach(button => {
	button.addEventListener('click', function () {
		const category = button.getAttribute('data-category');

		// Приховуємо весь контент
		document.querySelectorAll('.filter-item').forEach(item => {
			item.classList.remove('active');
		});

		// Показуємо відповідний контент
		const activeItems = document.querySelectorAll(`.${category}`);
		activeItems.forEach(item => {
			item.classList.add('active');
		});

		// Видаляємо клас active у всіх кнопок і додаємо в поточну
		document.querySelectorAll('.filter-button').forEach(btn => {
			btn.classList.remove('active');
		});
		button.classList.add('active');
	});
});

// За замовчуванням показуємо контент для першої категорії
document.querySelector('.filter-button[data-category="category1"]').click();
