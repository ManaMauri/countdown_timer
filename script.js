// Set the date we're counting down to
const countDownDate = new Date("December 20, 2023 00:00:00").getTime();

const face = document.getElementById('face');
const audioPlayer = document.getElementById('audioPlayer');

// Web Audio API setup
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
const source = audioContext.createMediaElementSource(audioPlayer);
source.connect(analyser);
analyser.connect(audioContext.destination);

// Frequency data array
const dataArray = new Uint8Array(analyser.frequencyBinCount);

// Function to animate the mouth based on audio frequency
function animateMouth() {
    requestAnimationFrame(animateMouth);

    if (!audioPlayer.paused) {
        analyser.getByteFrequencyData(dataArray);
        const lowerFrequencies = dataArray.slice(0, 10);
        const average = lowerFrequencies.reduce((a, b) => a + b) / lowerFrequencies.length;
        const mouthPath = document.getElementById('mouthPath');
        const yOffset = (average / 255) * 50;
        mouthPath.setAttribute('d', `M 0,50 Q 100,${50 + yOffset} 200,50`);
    }
}

// Start the animation
animateMouth();

// Update the countdown every second
const interval = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2, '0');
    document.getElementById("hours").textContent = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');

    if (distance < 0) {
        clearInterval(interval);
        document.querySelector('.countdown').innerHTML = "HOLIDAY TIME!";
    }
}, 1000);

// Add event listeners for the smiley face interaction
face.addEventListener('click', function() {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    if (audioPlayer.paused) {
        audioPlayer.play();
        face.classList.add('surprised');
    } else {
        audioPlayer.pause();
        face.classList.remove('surprised');
    }
});

face.addEventListener('mouseover', function() {
    face.classList.add('surprised');
});

face.addEventListener('mouseout', function() {
    if (audioPlayer.paused) {
        face.classList.remove('surprised');
    }
});
