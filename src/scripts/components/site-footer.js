const selectors = {
  block: '[data-footer-block]',
  blockHeader: '[data-footer-block-header]',
}

const dom = {}

const cacheDom = () => {
  dom.blocks = document.querySelectorAll(selectors.block);
}

const initAccordions = () => {
  if (dom.blocks.length > 0) {
    dom.blocks.forEach((block) => {
      const blockHeader = block.querySelector(selectors.blockHeader);
      blockHeader.addEventListener('click', (evt) => {
        block.classList.toggle('active');
      });
    });
  }
}

const siteFooter = {
  init() {
    cacheDom()
    initAccordions()
  }
}

export default siteFooter
