const countdown = document.querySelector('.countdown');

// Set the date we're counting down to
const countDownDate = new Date("December 20, 2023 00:00:00").getTime();

// Update the countdown every second
const interval = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the results
    document.getElementById("days").textContent = String(days).padStart(2, '0');
    document.getElementById("hours").textContent = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');

    // Calculate the percentage of time remaining
    const totalDuration = countDownDate - new Date("October 11, 2023 00:00:00").getTime();
    const percentageRemaining = distance / totalDuration;

    // Adjust the circle's size based on the percentage of time remaining
    const circle = document.querySelector('.circle');
    const maxSize = 300; // the initial size of the circle in pixels
    const newSize = maxSize * Math.sqrt(percentageRemaining); // Using the square root to make the shrinking effect more visually appealing
    circle.style.width = `${newSize}px`;
    circle.style.height = `${newSize}px`;
    
    // If the countdown is finished, display a message
    if (distance < 0) {
        clearInterval(interval);
        countdown.innerHTML = "HOLIDAY TIME!";
    }
}, 1000);
