document.addEventListener('DOMContentLoaded', function() {
  // ==============================
  // Fade-in About Section
  // ==============================
  const aboutSection = document.querySelector('.about');
  let hasAnimated = false;

  function checkVisibility() {
    const rect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (!hasAnimated && rect.top < windowHeight - 100) {
      aboutSection.classList.add('visible');
      hasAnimated = true;
    }
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility();

  // ==============================
  // Custom Video Controls
  // ==============================
  const videos = document.querySelectorAll('.project-block video');

  videos.forEach(video => {
    const container = video.parentElement;

    // Create controls container
    const controls = document.createElement('div');
    controls.classList.add('video-controls');

    // Top row
    const topRow = document.createElement('div');
    topRow.classList.add('controls-top');

    // Play/Pause button
    const playBtn = document.createElement('button');
    playBtn.textContent = '▶️';
    playBtn.classList.add('play-btn');

    // Sound icon
    const soundBtn = document.createElement('button');
    soundBtn.textContent = '🔊';
    soundBtn.classList.add('sound-btn');

    // Maximize button
    const maxBtn = document.createElement('button');
    maxBtn.textContent = '🖵';
    maxBtn.classList.add('max-btn');

    // Three dots button
    const dotsBtn = document.createElement('button');
    dotsBtn.textContent = '⋮';
    dotsBtn.classList.add('dots-btn');

    // Append top row items
    topRow.appendChild(playBtn);
    const rightControls = document.createElement('div');
    rightControls.style.display = 'flex';
    rightControls.style.gap = '10px';
    rightControls.appendChild(soundBtn);
    rightControls.appendChild(maxBtn);
    rightControls.appendChild(dotsBtn);
    topRow.appendChild(rightControls);
    topRow.style.display = 'flex';
    topRow.style.justifyContent = 'space-between';
    topRow.style.alignItems = 'center';
    topRow.style.marginBottom = '10px';

    // Bottom slide bar
    const progress = document.createElement('input');
    progress.type = 'range';
    progress.min = 0;
    progress.max = 100;
    progress.value = 0;
    progress.classList.add('progress-bar');
    progress.style.width = '100%';

    // Append to controls container
    controls.appendChild(topRow);
    controls.appendChild(progress);

    // Append controls to container
    container.appendChild(controls);

    // ==============================
    // Event Listeners
    // ==============================
    playBtn.addEventListener('click', () => {
      if(video.paused) {
        video.play();
        playBtn.textContent = '⏸️';
      } else {
        video.pause();
        playBtn.textContent = '▶️';
      }
    });

    soundBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      soundBtn.textContent = video.muted ? '🔇' : '🔊';
    });

    maxBtn.addEventListener('click', () => {
      if(document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        container.requestFullscreen();
      }
    });

    // Progress bar update
    video.addEventListener('timeupdate', () => {
      const value = (video.currentTime / video.duration) * 100;
      progress.value = value || 0;
    });

    // Seek video
    progress.addEventListener('input', () => {
      video.currentTime = (progress.value / 100) * video.duration;
    });
  });
});
