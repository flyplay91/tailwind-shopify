const selectors = {
  contentUp: "[data-content-up-block]",
  contentUpMedia: "[data-content-up-media]",
  contentUpVideoPlay: "[data-content-video-play]",
  contentUpVideoPause: "[data-content-video-pause]",
  accordion: "[data-accordion-container]",
  accordionHeading: "[data-accordion-heading]",
  productRecs: "[data-product-recs]",
  productRecsTabHeader: "[data-product-recs-tab-header]",
  productRecsTabBody: "[data-product-recs-tab-body]",
};

const dom = {};

const cacheDom = () => {
  dom.contentUps = document.querySelectorAll(selectors.contentUp);
  dom.accordions = document.querySelectorAll(selectors.accordion);
  dom.productRecs = document.querySelectorAll(selectors.productRecs);
};

const initMultiUps = () => {
  dom.contentUps.forEach((block) => {
    const videoPlay = block.querySelector(selectors.contentUpVideoPlay);
    const videoPause = block.querySelector(selectors.contentUpVideoPause);

    if (videoPlay) {
      videoPlay.addEventListener("click", (evt) => {
        evt.preventDefault();
        const video = block
          .querySelector(selectors.contentUpMedia)
          .querySelector("video");
        video.play();
      });
    }

    if (videoPause) {
      videoPause.addEventListener("click", (evt) => {
        evt.preventDefault();
        const video = block
          .querySelector(selectors.contentUpMedia)
          .querySelector("video");
        video.pause();
      });
    }
  });
};

const initAccordions = () => {
  dom.accordions.forEach((accordion) => {
    const accordionHeading = accordion.querySelector(
      selectors.accordionHeading
    );

    accordionHeading.addEventListener("click", (evt) => {
      accordion.classList.toggle("active");
    });
  });
};

const initProductRecs = () => {
  dom.productRecs.forEach((productRec) => {
    const productRecsTabHeaders = productRec.querySelectorAll(
      selectors.productRecsTabHeader
    );

    productRecsTabHeaders.forEach((productRecsTabHeader) => {
      productRecsTabHeader.addEventListener("click", (evt) => {
        evt.preventDefault();
        const tabBodyId = productRecsTabHeader.getAttribute("href");
        const productRecsTabBody = productRec.querySelector(tabBodyId);
  
        productRec.querySelectorAll(
          selectors.productRecsTabHeader
        ).forEach((tabHeader) => {
          tabHeader.classList.remove('active');
        });
  
        productRec.querySelectorAll(
          selectors.productRecsTabBody
        ).forEach((tabBody) => {
          tabBody.classList.remove('active');
        });
  
        productRecsTabHeader.classList.add("active");
        productRecsTabBody.classList.add("active");
      });
    });
  });
};

const contentModules = {
  init() {
    cacheDom();
    initMultiUps();
    initAccordions();
    initProductRecs();
  },
};

export default contentModules;
