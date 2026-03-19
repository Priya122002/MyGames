
document.addEventListener('DOMContentLoaded', () => {

 window.scrollTo(0, 0);

  const videos = document.querySelectorAll('.video-container');
  const fadeSections = document.querySelectorAll('.fade-in-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active'); // play animation
      } else {
        entry.target.classList.remove('active'); // reset animation when leaving viewport
      }
    });
  }, { threshold: 0.2 });

  fadeSections.forEach(section => observer.observe(section));


document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: 'smooth'
    });

    document.querySelector('.nav-links').classList.remove('show');
  });
});

// Active section highlight
const sectionsNav = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sectionsNav.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
// HERO PARALLAX + FADE
const hero = document.querySelector(".hero");
const heroLeft = document.querySelector(".hero-left");

// Smooth fade-in for hero
window.addEventListener("load", () => {
  const heroLeft = document.querySelector(".hero-left");
  const heroRight = document.querySelector(".hero-right");

  heroLeft.style.opacity = 0;
  heroRight.style.opacity = 0;

  setTimeout(() => {
    heroLeft.style.transition = "0.8s ease";
    heroRight.style.transition = "0.8s ease";

    heroLeft.style.opacity = 1;
    heroRight.style.opacity = 1;
  }, 200);
});
// Hamburger
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}
// Scroll progress bar
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const height = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / height) * 100;

  document.querySelector(".scroll-bar").style.width = progress + "%";
});

// Auto hide navbar (premium feel)
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 100) {
    navbar.classList.add("hide"); // scrolling down
  } else {
    navbar.classList.remove("hide"); // scrolling up
  }

  lastScroll = currentScroll;
});



const exploreBtn = document.querySelector('.hero .btn');
  const projectsSection = document.getElementById('projects');
  if (exploreBtn && projectsSection) {
    exploreBtn.addEventListener('click', (e) => {
      e.preventDefault(); // prevent default jump
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

    // --- Play/Pause ---
    playPauseBtn.addEventListener('click', () => {
      if(video.paused) { 
        video.play(); 
        playPauseBtn.innerHTML = pauseIcon; 
      } else { 
        video.pause(); 
        playPauseBtn.innerHTML = playIcon; 
      }
    });

    // --- Progress Bar ---
    video.addEventListener('loadedmetadata', () => {
      progressBar.max = 100;
    });
    video.addEventListener('timeupdate', () => {
      progressBar.value = (video.currentTime / video.duration) * 100;
    });
    progressBar.addEventListener('input', e => {
      video.currentTime = (e.target.value / 100) * video.duration;
    });

    // --- Volume ---
    let lastVolume = video.volume;
    volumeBtn.addEventListener('click', () => {
      if(video.muted) {
        video.muted = false;
        video.volume = lastVolume;
        volumeBtn.textContent = '🔈';
      } else {
        lastVolume = video.volume;
        video.muted = true;
        volumeBtn.textContent = '🔇';
      }
    });

  const pipAction = moreMenu.querySelector('[data-action="pip"]');
    if (pipAction) {
      pipAction.addEventListener('click', async (e) => {
        e.stopPropagation();
        try {
          if (video !== document.pictureInPictureElement) {
            await video.requestPictureInPicture();
          } else {
            await document.exitPictureInPicture();
          }
        } catch (err) {
          console.error("PiP failed:", err);
        }
        moreMenu.style.display = 'none';
      });
    }

    // --- Fullscreen ---
    fullscreenBtn.addEventListener('click', () => {
      if(!document.fullscreenElement) {
        if(container.requestFullscreen) container.requestFullscreen();
        else if(container.webkitRequestFullscreen) container.webkitRequestFullscreen();
        else if(container.mozRequestFullScreen) container.mozRequestFullScreen();
      } else {
        if(document.exitFullscreen) document.exitFullscreen();
        else if(document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if(document.mozCancelFullScreen) document.mozCancelFullScreen();
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

    // --- Toggle More Menu ---
    moreBtn.addEventListener('click', e => {
      e.stopPropagation();
      const visible = moreMenu.style.display === 'flex';
      moreMenu.style.display = visible ? 'none' : 'flex';
      speedMenu.style.display = 'none';
    });

    // Prevent menus from closing when clicking inside
    moreMenu.addEventListener('click', e => e.stopPropagation());
    speedMenu.addEventListener('click', e => e.stopPropagation());

    // --- Click Playback Speed ---
    const speedAction = moreMenu.querySelector('[data-action="speed"]');
    if(speedAction) {
      speedAction.addEventListener('click', e => {
        e.stopPropagation();
        moreMenu.style.display = 'none';
        speedMenu.style.display = 'flex';
      });
    }

    // --- Click Back ---
    speedMenu.querySelector('.back').addEventListener('click', e => {
      e.stopPropagation();
      speedMenu.style.display = 'none';
      moreMenu.style.display = 'flex';
    });

    // --- Set Playback Speed ---
    speedMenu.querySelectorAll('[data-speed]').forEach(item => {
      item.addEventListener('click', e => {
        e.stopPropagation();
        video.playbackRate = parseFloat(item.dataset.speed);
        speedMenu.style.display = 'none';
        moreMenu.style.display = 'flex';
      });
    });

    // --- Download functionality ---
    const downloadAction = moreMenu.querySelector('[data-action="download"]');
    if(downloadAction) {
      downloadAction.addEventListener('click', e => {
        e.stopPropagation();
        const videoSrc = video.src;
        const a = document.createElement('a');
        a.href = videoSrc;
        a.download = videoSrc.split('/').pop();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        moreMenu.style.display = 'none';
      });
    }

    // --- Close menus when clicking outside ---
    document.addEventListener('click', () => {
      moreMenu.style.display = 'none';
      speedMenu.style.display = 'none';
    });
  });
  
});


