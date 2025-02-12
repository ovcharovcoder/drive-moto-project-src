// Get the popup and buttons
const orderFormPopup = document.getElementById('orderFormPopup');
const openFormButton = document.getElementById('openFormButton');
const closeFormButton = document.getElementById('closeFormButton');

// Show the popup when the "Order Now" button is clicked
openFormButton.addEventListener('click', () => {
	orderFormPopup.style.display = 'flex';
});

// Close the popup when the close button is clicked
closeFormButton.addEventListener('click', () => {
	orderFormPopup.style.display = 'none';
});

// Optionally, close the popup if the user clicks outside the form
window.addEventListener('click', event => {
	if (event.target === orderFormPopup) {
		orderFormPopup.style.display = 'none';
	}
});
