document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('.video-container');

  videos.forEach(container => {
    const video = container.querySelector('video');
    const playPauseBtn = container.querySelector('.play-pause');
    const volumeBtn = container.querySelector('.volume');
    const fullscreenBtn = container.querySelector('.fullscreen');
    const progressBar = container.querySelector('.progress-bar');
    const moreBtn = container.querySelector('.more');
    const moreMenu = container.querySelector('.more-menu');

    const playIcon = '►';
    const pauseIcon = '❚❚';
    playPauseBtn.innerHTML = playIcon;

    // Play/Pause
    playPauseBtn.addEventListener('click', () => {
      if(video.paused) { video.play(); playPauseBtn.innerHTML = pauseIcon; }
      else { video.pause(); playPauseBtn.innerHTML = playIcon; }
    });

    // Progress bar
    video.addEventListener('timeupdate', () => {
      progressBar.value = (video.currentTime / video.duration) * 100;
    });
    progressBar.addEventListener('input', e => {
      video.currentTime = (e.target.value / 100) * video.duration;
    });

    // Volume
    volumeBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      volumeBtn.textContent = video.muted ? '🔇' : '🔈';
      if(!video.muted) video.volume = 1;
    });

    // Fullscreen
    fullscreenBtn.addEventListener('click', () => {
      if(!document.fullscreenElement) {
        if(container.requestFullscreen) container.requestFullscreen();
        else if(container.webkitRequestFullscreen) container.webkitRequestFullscreen();
      } else {
        if(document.exitFullscreen) document.exitFullscreen();
        else if(document.webkitExitFullscreen) document.webkitExitFullscreen();
      }
    });

    // --- Nested Playback Speed menu inside More menu ---
    const speedMenu = document.createElement('div');
    speedMenu.classList.add('speed-menu');
    speedMenu.style.display = 'none';
    speedMenu.innerHTML = `
      <div class="menu-item back">🔙 Back</div>
      <div class="menu-item" data-speed="0.25">0.25x</div>
      <div class="menu-item" data-speed="0.5">0.5x</div>
      <div class="menu-item" data-speed="0.75">0.75x</div>
      <div class="menu-item" data-speed="1">Normal</div>
      <div class="menu-item" data-speed="1.25">1.25x</div>
      <div class="menu-item" data-speed="1.5">1.5x</div>
      <div class="menu-item" data-speed="1.75">1.75x</div>
      <div class="menu-item" data-speed="2">2x</div>
    `;
    moreMenu.appendChild(speedMenu); // <-- append inside More menu

    // Toggle More menu
    moreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = moreMenu.style.display === 'flex';
      moreMenu.style.display = isVisible ? 'none' : 'flex';
      speedMenu.style.display = 'none';
    });

    // Click on Playback Speed
    const speedBtn = moreMenu.querySelector('[data-action="speed"]');
    speedBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      moreMenu.querySelectorAll('.menu-item').forEach(item => {
        if(!item.classList.contains('speed-menu') && !item.classList.contains('back')) {
          item.style.display = 'none';
        }
      });
      speedMenu.style.display = 'flex';
    });

    // Back button
    speedMenu.querySelector('.back').addEventListener('click', (e) => {
      e.stopPropagation();
      speedMenu.style.display = 'none';
      moreMenu.querySelectorAll('.menu-item').forEach(item => item.style.display = 'flex');
    });

    // Set playback speed
    speedMenu.querySelectorAll('[data-speed]').forEach(item => {
      item.addEventListener('click', e => {
        e.stopPropagation();
        video.playbackRate = parseFloat(item.dataset.speed);
        speedMenu.style.display = 'none';
        moreMenu.querySelectorAll('.menu-item').forEach(item => item.style.display = 'flex');
      });
    });

    // Close menus if clicked outside
    document.addEventListener('click', () => {
      moreMenu.style.display = 'none';
      speedMenu.style.display = 'none';
      moreMenu.querySelectorAll('.menu-item').forEach(item => item.style.display = 'flex');
    });
  });
});
