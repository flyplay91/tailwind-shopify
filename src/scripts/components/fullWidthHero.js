const selectors = {
  heroVideo: "[data-hero-video]",
  heroPlayPause: ".video-controls__container",
};

const dom = {};

const cacheDom = () => {
  dom.heroVideo = document.querySelector(selectors.heroVideo);
  dom.heroPlayPause = document.querySelector(selectors.heroPlayPause);
};

const playIcon = `<svg class="play-btn" fill="none" height="35" viewbox="0 0 10 16" width="40" xmlns="http://www.w3.org/2000/svg">
  <path clip-rule="evenodd" d="M9.67231 8.44855L1.33653 15.1513C0.770683 15.6041 -0.0455216 15.1533 0.00198343 14.4458L0.0991005 0.824283C0.101782 0.116636 0.923734 -0.250106 1.44878 0.192414L9.70564 7.14876C10.1142 7.49236 10.0922 8.12963 9.67231 8.44855Z" fill-rule="evenodd" fill="white"/>
</svg>`;
const pauseIcon = `<svg class="pause-btn" fill="none" height="30" viewbox="0 0 14 19" width="35" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.74275 0H0V19H4.74275V0Z" fill="white"/>
  <path d="M13.9996 0H9.25684V19H13.9996V0Z" fill="white"/>
</svg>`;

const bindEvents = () => {
  if (!dom.heroVideo || !dom.heroPlayPause) return;

  dom.heroPlayPause &&
    dom.heroVideo &&
    dom.heroPlayPause.addEventListener("click", () => {
      if (dom.heroVideo.paused) {
        dom.heroVideo.play();
        dom.heroVideo.classList.add("playing");
      } else {
        dom.heroVideo.pause();
        dom.heroVideo.classList.remove("playing");
      }

      dom.heroVideo.classList.contains("playing")
        ? (dom.heroPlayPause.innerHTML = pauseIcon)
        : (dom.heroPlayPause.innerHTML = playIcon);
    });
};

const fullWidthHero = {
  init() {
    cacheDom();
    bindEvents();
  },
};

export default fullWidthHero;
