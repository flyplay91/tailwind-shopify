import React, { useState, useEffect } from "react";

import { addEffect } from "scripts/utils/Effects.js";

const BuyBoxTitleInfo = ({ stars }) => {
  const [selectedVariant, setSelectedVariant] = useState(
    window.state.selectedVariant || false
  );

  useEffect(addEffect("selectedVariant", setSelectedVariant), []);

  const { product } = window.eHS;

  return (
    <div className="mb-6">
      <h1 className="buybox-title h3 !font-roboto mb-2 text-black">
        {product.title}
      </h1>
      <span
        className="stamped-product-reviews-badge stamped-main-badge"
        data-id={product.id}
        data-product-sku={product.handle}
        data-product-title={product.title}
        data-product-type={product.type}
        style={{ display: "block" }}
      >
        <div dangerouslySetInnerHTML={{ __html: stars }}></div>
      </span>
      {selectedVariant ? (
        <div className="flex items-center mt-2">
          <h5
            className={`${
              selectedVariant.comparePrice ? "text-error" : "text-black"
            }`}
          >
            ${(selectedVariant.price / 100.0).toFixed(2)}
          </h5>
          {selectedVariant.comparePrice && (
            <h5 className="ml-2 text-grey-500 line-through">
              ${(selectedVariant.comparePrice / 100.0).toFixed(2)}
            </h5>
          )}
        </div>
      ) : (
        <div className="flex items-center">
          <h5 className="text-black">${(product.price / 100.0).toFixed(2)}</h5>
        </div>
      )}
    </div>
  );
};

export default BuyBoxTitleInfo;
