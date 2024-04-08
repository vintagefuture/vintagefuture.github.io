const audio = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const playPauseIcon = document.getElementById("playPauseIcon");

// Check if the audio is playing when the page loads
setTimeout(function () {
  if (!audio.paused) {
    playPauseIcon.classList.remove("fa-play");
    playPauseIcon.classList.add("fa-pause");
  }
}, 100);

playPauseBtn.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    playPauseIcon.classList.remove("fa-play");
    playPauseIcon.classList.add("fa-pause");
  } else {
    audio.pause();
    playPauseIcon.classList.remove("fa-pause");
    playPauseIcon.classList.add("fa-play");
  }
});

// Add event listener to update button icon when audio finishes playing
audio.addEventListener("ended", function () {
  playPauseIcon.classList.remove("fa-pause");
  playPauseIcon.classList.add("fa-play");
});
