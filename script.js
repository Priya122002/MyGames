document.addEventListener('DOMContentLoaded', () => {
  // Fade-in animation for sections
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
  checkVisibility();

  // Video controls
  const videos = document.querySelectorAll('.video-container');

  videos.forEach(container => {
    const video = container.querySelector('video');
    const playPauseBtn = container.querySelector('.play-pause');
    const volumeBtn = container.querySelector('.volume');
    const fullscreenBtn = container.querySelector('.fullscreen');
    const progressBar = container.querySelector('.progress-bar');

    // SVG icons
    const playIcon = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 5v14l11-7z"/>
      </svg>`;
    const pauseIcon = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
      </svg>`;
const volumeOnIcon = `
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-.77-3.29-1.97-4.28l-1.42 1.42c.57.51.91 1.24.91 2.06s-.34 1.55-.91 2.06l1.42 1.42c1.2-.99 1.97-2.51 1.97-4.28z"/>
  </svg>`;

const volumeOffIcon = `
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5 12c0-1.77-.77-3.29-1.97-4.28l1.42-1.42C17.23 7.71 18 9.23 18 11s-.77 3.29-1.97 4.28l-1.42-1.42c.57-.51.91-1.24.91-2.06zM3 9v6h4l5 5V4L7 9H3zm13.5 3L21 18.5 19.5 20 15 15.5 10.5 21 9 19.5 13.5 15 9 10.5 10.5 9 15 13.5 19.5 9 21 10.5 16.5 15z"/>
  </svg>`;
    // Set initial icon
    playPauseBtn.innerHTML = playIcon;

    // Play/Pause toggle
    playPauseBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playPauseBtn.innerHTML = pauseIcon;
      } else {
        video.pause();
        playPauseBtn.innerHTML = playIcon;
      }
    });

    // Update progress bar
    video.addEventListener('timeupdate', () => {
      const progress = (video.currentTime / video.duration) * 100;
      progressBar.value = progress;
    });

    // Seek
    progressBar.addEventListener('input', (e) => {
      const seekTime = (e.target.value / 100) * video.duration;
      video.currentTime = seekTime;
    });

    // Volume toggle
    volumeBtn.addEventListener('click', () => {
      video.muted = !video.muted;
  volumeBtn.innerHTML = video.muted ? volumeOffIcon : volumeOnIcon;
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
