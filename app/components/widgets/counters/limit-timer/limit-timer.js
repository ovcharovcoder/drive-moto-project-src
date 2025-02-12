// Set the countdown date (10 days from now)
const countdownDate = new Date();
countdownDate.setDate(countdownDate.getDate() + 10);

function updateCountdown() {
	const now = new Date().getTime();
	const distance = countdownDate - now;

	const days = Math.floor(distance / (1000 * 60 * 60 * 24));
	const hours = Math.floor(
		(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((distance % (1000 * 60)) / 1000);

	document.getElementById('days').textContent = days;
	document.getElementById('hours').textContent = hours;
	document.getElementById('minutes').textContent = minutes;
	document.getElementById('seconds').textContent = seconds;

	if (distance < 0) {
		clearInterval(countdownInterval);
		document.getElementById('countdown').textContent = 'Акція завершена!';
	}
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();
