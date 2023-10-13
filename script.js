// Set the date we're counting down to
const countDownDate = new Date("December 20, 2023 00:00:00").getTime();

const face = document.getElementById('face');
const audioPlayer = document.getElementById('audioPlayer');

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

    // Change face expression based on time left
    if (days < 1) {
        face.classList.add('excited');
    }

    // If the countdown is finished, display a message
    if (distance < 0) {
        clearInterval(interval);
        document.querySelector('.countdown').innerHTML = "HOLIDAY TIME!";
    }
}, 1000);

// Add event listeners for the smiley face interaction
face.addEventListener('click', function() {
    if (audioPlayer.paused) {
        audioPlayer.play(); // Play the MP3
    } else {
        audioPlayer.pause(); // Pause the MP3
    }
    face.classList.remove('surprised'); // Revert to the current state (either normal or excited)
});

face.addEventListener('mouseover', function() {
    face.classList.add('surprised');
});

face.addEventListener('mouseout', function() {
    face.classList.remove('surprised');
});
