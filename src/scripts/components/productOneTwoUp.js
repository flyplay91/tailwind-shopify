const dom = {};

const selectors = {
  videoOne: ".video-one",
  pausePlayOne: ".play-pause-one",
  videoTwo: ".video-two",
  pausePlayTwo: ".play-pause-two",
};

const cacheDom = () => {
  dom.videoOne = document.querySelector(selectors.videoOne);
  dom.playPauseOne = document.querySelector(selectors.pausePlayOne);
  dom.videoTwo = document.querySelector(selectors.videoTwo);
  dom.playPauseTwo = document.querySelector(selectors.pausePlayTwo);
};

const playIcon = `<svg class="play-btn" fill="none" height="35" viewbox="0 0 10 16" width="40" xmlns="http://www.w3.org/2000/svg">
  <path clip-rule="evenodd" d="M9.67231 8.44855L1.33653 15.1513C0.770683 15.6041 -0.0455216 15.1533 0.00198343 14.4458L0.0991005 0.824283C0.101782 0.116636 0.923734 -0.250106 1.44878 0.192414L9.70564 7.14876C10.1142 7.49236 10.0922 8.12963 9.67231 8.44855Z" fill-rule="evenodd" fill="white"/>
</svg>`;
const pauseIcon = `<svg class="pause-btn" fill="none" height="30" viewbox="0 0 14 19" width="35" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.74275 0H0V19H4.74275V0Z" fill="white"/>
  <path d="M13.9996 0H9.25684V19H13.9996V0Z" fill="white"/>
</svg>`;

const bindEvents = () => {
  dom.playPauseOne &&
    dom.videoOne &&
    dom.playPauseOne.addEventListener("click", () => {
      if (dom.videoOne.paused) {
        dom.videoOne.play();
        dom.videoOne.classList.add("playing");
      } else {
        dom.videoOne.pause();
        dom.videoOne.classList.remove("playing");
      }

      dom.videoOne.classList.contains("playing")
        ? (dom.playPauseOne.innerHTML = pauseIcon)
        : (dom.playPauseOne.innerHTML = playIcon);
    });

  dom.playPauseTwo &&
    dom.videoTwo &&
    dom.playPauseTwo.addEventListener("click", () => {
      dom.videoTwo.paused ? dom.videoTwo.play() : dom.videoTwo.pause();
    });
};

const productOneTwoUp = {
  init() {
    cacheDom();
    bindEvents();
  },
};

export default productOneTwoUp;
