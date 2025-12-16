document.addEventListener('DOMContentLoaded', () => {

  /* ===============================
     INITIAL SETUP
  =============================== */
  window.scrollTo(0, 0);

  /* ===============================
     FADE-IN OBSERVER
  =============================== */
  const fadeSections = document.querySelectorAll('.fade-in-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('active', entry.isIntersecting);
    });
  }, { threshold: 0.2 });

  fadeSections.forEach(section => observer.observe(section));

  /* ===============================
     HERO → PROJECTS SCROLL
  =============================== */
  const exploreBtn = document.querySelector('.hero .btn');
  const projectsSection = document.getElementById('projects');

  if (exploreBtn && projectsSection) {
    exploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ===============================
     VIDEO CONTROLS
  =============================== */
  const videos = document.querySelectorAll('.video-container');

  videos.forEach(container => {
    const video = container.querySelector('video');
    const playPauseBtn = container.querySelector('.play-pause');
    const volumeBtn = container.querySelector('.volume');
    const fullscreenBtn = container.querySelector('.fullscreen');
    const progressBar = container.querySelector('.progress-bar');
    const moreBtn = container.querySelector('.more');
    const moreMenu = container.querySelector('.more-menu');

    if (!video) return;

    const playIcon = '►';
    const pauseIcon = '❚❚';
    if (playPauseBtn) playPauseBtn.innerHTML = playIcon;

    playPauseBtn?.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playPauseBtn.innerHTML = pauseIcon;
      } else {
        video.pause();
        playPauseBtn.innerHTML = playIcon;
      }
    });

    video.addEventListener('loadedmetadata', () => {
      if (progressBar) progressBar.max = 100;
    });

    video.addEventListener('timeupdate', () => {
      if (progressBar) {
        progressBar.value = (video.currentTime / video.duration) * 100;
      }
    });

    progressBar?.addEventListener('input', e => {
      video.currentTime = (e.target.value / 100) * video.duration;
    });

    let lastVolume = video.volume;
    volumeBtn?.addEventListener('click', () => {
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

    fullscreenBtn?.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        container.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    });

    /* ---------- Speed Menu ---------- */
    const speedMenu = document.createElement('div');
    speedMenu.className = 'more-menu speed-menu';
    speedMenu.style.display = 'none';
    speedMenu.innerHTML = `
      <div class="menu-item back">🔙 Back</div>
      <div class="menu-item" data-speed="0.5">0.5x</div>
      <div class="menu-item" data-speed="1">Normal</div>
      <div class="menu-item" data-speed="1.5">1.5x</div>
      <div class="menu-item" data-speed="2">2x</div>
    `;
    container.querySelector('.controls-right')?.appendChild(speedMenu);

    moreBtn?.addEventListener('click', e => {
      e.stopPropagation();
      moreMenu.style.display = moreMenu.style.display === 'flex' ? 'none' : 'flex';
      speedMenu.style.display = 'none';
    });

    speedMenu.addEventListener('click', e => e.stopPropagation());
    moreMenu.addEventListener('click', e => e.stopPropagation());

    moreMenu.querySelector('[data-action="speed"]')?.addEventListener('click', e => {
      e.stopPropagation();
      moreMenu.style.display = 'none';
      speedMenu.style.display = 'flex';
    });

    speedMenu.querySelector('.back')?.addEventListener('click', () => {
      speedMenu.style.display = 'none';
      moreMenu.style.display = 'flex';
    });

    speedMenu.querySelectorAll('[data-speed]').forEach(item => {
      item.addEventListener('click', () => {
        video.playbackRate = parseFloat(item.dataset.speed);
        speedMenu.style.display = 'none';
        moreMenu.style.display = 'flex';
      });
    });

    document.addEventListener('click', () => {
      moreMenu.style.display = 'none';
      speedMenu.style.display = 'none';
    });
  });

  /* ===============================
     PROJECT PAGINATION (FINAL FIX)
  =============================== */
  const pages = document.querySelectorAll('.projects-page');
  const nextBtn = document.getElementById('projectsNext');
  const prevBtn = document.getElementById('projectsPrev');
  const indicator = document.getElementById('pageIndicator');

  if (!pages.length || !nextBtn || !prevBtn) return;

  let currentPage = 0;

  function updatePagination() {
    pages.forEach((page, index) => {
      page.classList.toggle('active', index === currentPage);
    });

    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === pages.length - 1;

    if (indicator) {
      indicator.textContent = `${currentPage + 1} / ${pages.length}`;
    }
  }

  nextBtn.addEventListener('click', () => {
    if (currentPage < pages.length - 1) {
      currentPage++;
      updatePagination();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      updatePagination();
    }
  });

  updatePagination();
});
