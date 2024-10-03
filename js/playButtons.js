document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".play-button");
  const audioElements = document.querySelectorAll(".music");
  const playIcons = document.querySelectorAll(".playIcon");
  const pauseIcons = document.querySelectorAll(".pauseIcon");

  buttons.forEach((button, index) => {
    const audio = audioElements[index];
    let isPlaying = false;
    let audioPausedTime = 0;

    // preload GIFs
    new Image().src = playIcons[index].src;
    new Image().src = pauseIcons[index].src;

    button.addEventListener("click", () => {
      const audioFile = button.getAttribute("data-music");

      if (isPlaying) {
        audio.pause();
        audioPausedTime = audio.currentTime;
        playIcons[index].style.display = "inline";
        pauseIcons[index].style.display = "none";
      } else {
        audio.src = audioFile;
        audio.currentTime = audioPausedTime;
        audio.play();
        playIcons[index].style.display = "none";
        pauseIcons[index].style.display = "inline";
      }

      isPlaying = !isPlaying;

      audio.addEventListener("ended", () => {
        playIcons[index].style.display = "inline";
        pauseIcons[index].style.display = "none";
        isPlaying = false;
        audioPausedTime = 0;
      });
    });
  });
});
