const selectors = {
  productTile: "[data-product-tile]",
  productTileBadge: "[data-product-tile-badge]",
};

const dom = {};

const cacheDom = () => {
  dom.productTiles = document.querySelectorAll(selectors.productTile);
};

const addBadges = () => {
  dom.productTiles.forEach((productTile) => {
    const tags = productTile.dataset.tags;
    const onSale = productTile.dataset.onSale == "true" ? true : false;
    const productTileBadge = productTile.querySelector(selectors.productTileBadge);

    if (window.state.ProductBadges) {
      const badge = window.state.ProductBadges.find((badge) => tags.includes(badge.tag));
      if (onSale) {
        productTileBadge.innerHTML = `
          <div class="static lg:absolute top-10 left-10 lg:inline-block mb-2 mt-4 lg:mt-0">
            <p
              class="font-roboto-condensed lg:px-3 lg:py-1 sub-xxs caps lg:border border-primary text-primary capitalize"
            >
              SALE
            </p>
          </div>
        `;
      }
      else if (badge) {
        const badgeText = badge.tag.split(":")[1].replace("_", " ");
        productTileBadge.innerHTML = `
          <div class="static lg:absolute top-10 left-10 lg:inline-block mb-2 mt-4 lg:mt-0">
            <p
              class="font-roboto-condensed lg:px-3 lg:py-1 sub-xxs caps lg:border border-${badge.color} text-${badge.color} capitalize"
            >
              ${badgeText}
            </p>
          </div>
        `;
      }      
    }
  });
};

const productTile = {
  init() {
    cacheDom();
    addBadges();
  },
};

export default productTile;
