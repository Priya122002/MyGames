// Select all video cards
const videoCards = document.querySelectorAll('.video-card');

videoCards.forEach((card, index) => {
  const video = card.querySelector('video');
  const soundBtn = card.querySelector('.sound-toggle');

  // Set initial icon based on muted state
  soundBtn.src = video.muted
    ? 'https://github.com/Priya122002/MyGames/blob/main/assets/icons/sound_off.png?raw=true'
    : 'https://github.com/Priya122002/MyGames/blob/main/assets/icons/sound_on.png?raw=true';

  // Add click listener to toggle sound
  soundBtn.addEventListener('click', () => {
    video.muted = !video.muted;

    // Update icon
    soundBtn.src = video.muted
      ? 'https://github.com/Priya122002/MyGames/blob/main/assets/icons/sound_off.png?raw=true'
      : 'https://github.com/Priya122002/MyGames/blob/main/assets/icons/sound_on.png?raw=true';
  });
});
