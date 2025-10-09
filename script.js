document.addEventListener('DOMContentLoaded', () => {
  // Handle fade-in on scroll for all elements with .fade-in
  const fadeElements = document.querySelectorAll('.fade-in');

  function checkVisibility() {
    const windowHeight = window.innerHeight;
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - 100) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility(); // Initial check

  // VIDEO CONTROLS FUNCTIONALITY
  const videos = document.querySelectorAll('.video-container');

  videos.forEach(container => {
    const video = container.querySelector('video');
    const playPauseBtn = container.querySelector('.play-pause');
    const volumeBtn = container.querySelector('.volume');
    const fullscreenBtn = container.querySelector('.fullscreen');
    const progressBar = container.querySelector('.progress-bar');

    // Play / Pause toggle
    playPauseBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playPauseBtn.textContent = '⏸️'; // Pause icon
      } else {
        video.pause();
        playPauseBtn.textContent = '▶️'; // Play icon
      }
    });

    // Update progress bar as video plays
    video.addEventListener('timeupdate', () => {
      const progress = (video.currentTime / video.duration) * 100;
      progressBar.value = progress;
    });

    // Seek video position when dragging the progress bar
    progressBar.addEventListener('input', (e) => {
      const seekTime = (e.target.value / 100) * video.duration;
      video.currentTime = seekTime;
    });

    // Volume toggle (mute/unmute)
    volumeBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      volumeBtn.textContent = video.muted ? '🔇' : '🔊';
    });

    // Fullscreen toggle
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        container.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });
  });
});
