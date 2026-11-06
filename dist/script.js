// Mobile navigation
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  mobileNav.classList.remove('open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  mobileNav.classList.toggle('open', open);
});
mobileNav
  .querySelectorAll('a')
  .forEach((link) => link.addEventListener('click', closeMenu));
// Desktop pages dropdown
const pagesButton = document.querySelector('.pages-toggle');
const dropdown = document.querySelector('.dropdown');
pagesButton.addEventListener('click', () => {
  const open = pagesButton.getAttribute('aria-expanded') !== 'true';
  pagesButton.setAttribute('aria-expanded', String(open));
  dropdown.classList.toggle('open', open);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMenu();
    dropdown.classList.remove('open');
    pagesButton.setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('click', (e) => {
  if (!e.target.closest('.pages-menu')) {
    dropdown.classList.remove('open');
    pagesButton.setAttribute('aria-expanded', 'false');
  }
});
// Keep the theme in sync across desktop and mobile controls.
const themeButtons = document.querySelectorAll('.theme-toggle');
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const dark = theme === 'dark';
  themeButtons.forEach((button) => {
    button.setAttribute('aria-checked', String(dark));
    button.querySelector('.theme-knob').textContent = dark ? '☾' : '☀';
  });
  try {
    localStorage.setItem('fylla-theme', theme);
  } catch {}
}
let savedTheme = 'light';
try {
  savedTheme = localStorage.getItem('fylla-theme') || 'light';
} catch {}
setTheme(savedTheme === 'dark' ? 'dark' : 'light');
themeButtons.forEach((button) =>
  button.addEventListener('click', () =>
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'),
  ),
);

// Muted, inline playback with an explicit control if browser autoplay is denied.
const video = document.querySelector('video');
const media = document.querySelector('.hero-media');
const videoButton = document.querySelector('.video-toggle');
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let manuallyPaused = motionPreference.matches;
function updatePlaybackUI() {
  media.classList.toggle('is-paused', video.paused);
  videoButton.setAttribute('aria-label', video.paused ? 'Play video' : 'Pause video');
  videoButton.textContent = video.paused ? '▶' : 'Ⅱ';
}
async function startVideo() {
  video.muted = true;
  video.defaultMuted = true;
  if (manuallyPaused || document.hidden) return;
  try {
    await video.play();
  } catch {
    media.classList.add('is-paused');
  }
  updatePlaybackUI();
}
video.addEventListener('loadeddata', startVideo);
video.addEventListener('canplay', startVideo);
video.addEventListener('play', updatePlaybackUI);
video.addEventListener('pause', updatePlaybackUI);
video.addEventListener('error', () => {
  video.controls = true;
  updatePlaybackUI();
});
videoButton.addEventListener('click', () => {
  if (video.paused) {
    manuallyPaused = false;
    startVideo();
  } else {
    manuallyPaused = true;
    video.pause();
  }
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) video.pause();
  else startVideo();
});
window.addEventListener('pageshow', startVideo);
if (manuallyPaused) {
  video.autoplay = false;
  video.pause();
} else startVideo();
updatePlaybackUI();
