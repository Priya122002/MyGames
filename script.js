document.addEventListener('DOMContentLoaded', () => {

  window.scrollTo(0, 0);

  const videos = document.querySelectorAll('.video-container');
  const fadeSections = document.querySelectorAll('.fade-in-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, { threshold: 0.2 });

  fadeSections.forEach(section => observer.observe(section));

  const exploreBtn = document.querySelector('.hero .btn');
  const projectsSection = document.getElementById('projects');
  if (exploreBtn && projectsSection) {
    exploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

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

    playPauseBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playPauseBtn.innerHTML = pauseIcon;
      } else {
        video.pause();
        playPauseBtn.innerHTML = playIcon;
      }
    });

    video.addEventListener('loadedmetadata', () => {
      progressBar.max = 100;
    });

    video.addEventListener('timeupdate', () => {
      progressBar.value = (video.currentTime / video.duration) * 100;
    });

    progressBar.addEventListener('input', e => {
      video.currentTime = (e.target.value / 100) * video.duration;
    });

    let lastVolume = video.volume;
    volumeBtn.addEventListener('click', () => {
      if (video.muted) {
        video.muted = false;
        video.volume = lastVolume;
        volumeBtn.textContent = '🔈';
      } else {
        lastVolume = video.volume;
        video.muted = true;
        volumeBtn.textContent = '🔇';
      }
    });

    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        container.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    });

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

    moreBtn.addEventListener('click', e => {
      e.stopPropagation();
      const visible = moreMenu.style.display === 'flex';
      moreMenu.style.display = visible ? 'none' : 'flex';
      speedMenu.style.display = 'none';
    });

    moreMenu.addEventListener('click', e => e.stopPropagation());
    speedMenu.addEventListener('click', e => e.stopPropagation());

    const speedAction = moreMenu.querySelector('[data-action="speed"]');
    if (speedAction) {
      speedAction.addEventListener('click', e => {
        e.stopPropagation();
        moreMenu.style.display = 'none';
        speedMenu.style.display = 'flex';
      });
    }

    speedMenu.querySelector('.back').addEventListener('click', e => {
      e.stopPropagation();
      speedMenu.style.display = 'none';
      moreMenu.style.display = 'flex';
    });

    speedMenu.querySelectorAll('[data-speed]').forEach(item => {
      item.addEventListener('click', e => {
        e.stopPropagation();
        video.playbackRate = parseFloat(item.dataset.speed);
        speedMenu.style.display = 'none';
        moreMenu.style.display = 'flex';
      });
    });

    const downloadAction = moreMenu.querySelector('[data-action="download"]');
    if (downloadAction) {
      downloadAction.addEventListener('click', e => {
        e.stopPropagation();
        const a = document.createElement('a');
        a.href = video.src;
        a.download = video.src.split('/').pop();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        moreMenu.style.display = 'none';
      });
    }

    document.addEventListener('click', () => {
      moreMenu.style.display = 'none';
      speedMenu.style.display = 'none';
    });
  });

  const track = document.querySelector('.projects-track');
  const pages = document.querySelectorAll('.projects-page');
  const nextBtn = document.getElementById('projectsNext');
  const prevBtn = document.getElementById('projectsPrev');

  let currentPage = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentPage * 100}%)`;
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentPage < pages.length - 1) {
        currentPage++;
        updateCarousel();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--;
        updateCarousel();
      }
    });
  }

});
