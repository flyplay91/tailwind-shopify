import React, { useState, useEffect } from "react";

import { addEffect } from "scripts/utils/Effects.js";
import { addToCart } from "scripts/utils/Cart.js";

const AddToCart = () => {
  const [quantity, setQuantity] = useState(1);
  const [optionState, setOptionState] = useState(
    window.state.selectedProductOptions || []
  );

  useEffect(addEffect("productQuantity", setQuantity), []);
  useEffect(addEffect("selectedProductOptions", setOptionState), []);

  const { product } = window.eHS;
  const selectedVariant = product.variants.find((variant) => {
    return optionState.reduce((allMatch, option) => {
      return allMatch && variant.options.includes(option);
    }, true);
  });

  window.setState("selectedVariant", selectedVariant);

  const totalPrice = selectedVariant
    ? ((quantity * selectedVariant.price) / 100.0).toFixed(2)
    : product.price;

  const addItemToCart = () => {
    addToCart({
      id: selectedVariant.id,
      quantity: quantity,
    });
  };

  return (
    <>
      <div
        className={`flex items-stretch mb-4 ${
          selectedVariant && !selectedVariant.available && "flex-col gap-2"
        }`}
      >
        {selectedVariant
          ? selectedVariant.available && (
              <div className="mr-2 border flex items-center border-grey-100">
                <button
                  className="py-3 px-4 h-full"
                  aria-label="decrease quantity"
                  onClick={() =>
                    window.setState(
                      "productQuantity",
                      Math.max(1, quantity - 1)
                    )
                  }
                >
                  <svg
                    width="14"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      stroke="#000"
                      strokeWidth="1.25"
                      fill="none"
                      fillRule="evenodd"
                      strokeLinecap="round"
                    >
                      <path d="M12.538 7H1.462" />
                    </g>
                  </svg>
                </button>
                <span className="pt-px">{quantity}</span>
                <button
                  className="py-3 px-4 h-full"
                  aria-label="increase quantity"
                  onClick={() =>
                    window.setState("productQuantity", quantity + 1)
                  }
                >
                  <svg
                    width="14"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      stroke="#000"
                      strokeWidth="1.25"
                      fill="none"
                      fillRule="evenodd"
                      strokeLinecap="round"
                    >
                      <path d="M12.538 7H1.462M7 1.462v11.076" />
                    </g>
                  </svg>
                </button>
              </div>
            )
          : null}
        <button
          className="!px-1 button button--primary w-full"
          disabled={!selectedVariant || selectedVariant.available === false}
          onClick={addItemToCart}
        >
          {selectedVariant
            ? selectedVariant.available
              ? `Add To Cart | $${totalPrice}`
              : "Out Of Stock"
            : "Unavailable"}
        </button>
        {selectedVariant && !selectedVariant.available && (
          <button className="klaviyo-bis-trigger !px-1 button button--primary w-full">
            Notify Me When Available
          </button>
        )}
      </div>
    </>
  );
};

export default AddToCart;
