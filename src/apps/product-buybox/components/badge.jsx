import React from "react";

import { getProductBadge } from "scripts/utils/Product.js";

const badge = (props) => {
  const { absolute, propsProduct, outline = true } = props;

  const product = propsProduct ? propsProduct : window.eHS.product;
  const badge = getProductBadge(product);
  const badgeText = badge && badge.tag.split(":")[1].replace("_", " ");
  let badgeStyles;

  if (badge) {
    badgeStyles = outline
      ? `px-3 py-1 border border-${
          product.comparePrice ? "primary" : badge.color
        }`
      : "";
  }

  return (
    <>
      {badgeText ? (
        absolute ? (
          <div className="hidden absolute top-2 left-1 lg:inline-block mb-4">
            <p
              className={`font-roboto-condensed sub-xxs caps ${badgeStyles} text-${
                product.comparePrice ? "primary" : badge.color
              } capitalize`}
            >
              {product.comparePrice ? "SALE" : badgeText}
            </p>
          </div>
        ) : (
          <div className="inline-block mb-4">
            <p
              className={`font-roboto-condensed sub-xxs caps ${badgeStyles} text-${
                product.comparePrice ? "primary" : badge.color
              } capitalize`}
            >
              {product.comparePrice ? "SALE" : badgeText}
            </p>
          </div>
        )
      ) : (
        ""
      )}
    </>
  );
};

export default badge;
