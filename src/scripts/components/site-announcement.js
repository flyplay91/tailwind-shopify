import { tns } from '../../../node_modules/tiny-slider/src/tiny-slider';

const selectors = {
  container: '[data-messages-slider-container]',
  slider: '[data-messages-slider]',
  controls: '[data-messages-slider-controls]',
}

const dom = {}

const cacheDom = () => {
  dom.slider = document.querySelector(selectors.slider);
}

const initMessagesSlider = () => {
  if (dom.slider && dom.slider.childNodes.length > 1) {
    const autoplaySpeed = dom.slider.dataset.autoplaySpeed;
    const container = dom.slider.closest(selectors.container);
    const controls = container.querySelector(selectors.controls);

    tns({
      container: dom.slider,
      mode: 'gallery',
      items: 1,
      slideBy: 1,
      autoplay: autoplaySpeed > 0 ? true: false,
      autoplayTimeout: autoplaySpeed * 1000,
      controls: true,
      controlsContainer: controls,
      nav: false,
      autoplayButtonOutput: false,
      autoplayHoverPause: true,
      mouseDrag: true,
    });
  }
}

const siteAnnouncement = {
  init() {
    cacheDom()
    initMessagesSlider()
  }
}

export default siteAnnouncement
