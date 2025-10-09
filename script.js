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

    // --- Create Speed Menu ---
    const speedMenu = document.createElement('div');
    speedMenu.classList.add('more-menu', 'speed-menu');
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
    container.querySelector('.controls-right').appendChild(speedMenu);

    // Toggle More Menu
    moreBtn.addEventListener('click', e => {
      e.stopPropagation();
      const visible = moreMenu.style.display === 'flex';
      moreMenu.style.display = visible ? 'none' : 'flex';
      speedMenu.style.display = 'none';
    });

    // Click Playback Speed
    moreMenu.querySelector('[data-action="speed"]').addEventListener('click', e => {
      e.stopPropagation();
      moreMenu.style.display = 'none';
      speedMenu.style.display = 'flex';
    });

    // Click Back
    speedMenu.querySelector('.back').addEventListener('click', e => {
      e.stopPropagation();
      speedMenu.style.display = 'none';
      moreMenu.style.display = 'flex';
    });

    // Set Playback Speed
    speedMenu.querySelectorAll('[data-speed]').forEach(item => {
      item.addEventListener('click', e => {
        e.stopPropagation();
        video.playbackRate = parseFloat(item.dataset.speed);
        speedMenu.style.display = 'none';
        moreMenu.style.display = 'flex';
      });
    });
    // Download functionality
moreMenu.querySelector('[data-action="download"]').addEventListener('click', e => {
  e.stopPropagation();
  const videoSrc = video.src; // get current video source
  const a = document.createElement('a');
  a.href = videoSrc;
  a.download = videoSrc.split('/').pop(); // get filename from URL
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  moreMenu.style.display = 'none'; // close menu
});


    // Close menus when clicking outside
    document.addEventListener('click', () => {
      moreMenu.style.display = 'none';
      speedMenu.style.display = 'none';
    });
  });
});
