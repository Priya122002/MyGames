const video1 = document.getElementById('video1');
const soundBtn1 = document.getElementById('soundBtn1');

soundBtn1.addEventListener('click', () => {
  if(video1.muted) {
    video1.muted = false;
    soundBtn1.src = "https://github.com/Priya122002/MyGames/raw/refs/heads/main/assets/icons/sound_on.png";
  } else {
    video1.muted = true;
    soundBtn1.src = "https://github.com/Priya122002/MyGames/raw/refs/heads/main/assets/icons/sound_off.png";
  }
});
