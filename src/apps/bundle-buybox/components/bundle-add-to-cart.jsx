import React, { useState, useEffect } from "react";

import { addToCart } from "scripts/utils/Cart.js";

const BundleAddToCart = (props) => {
  const { bundleArray, bundleDiscount } = props;

  const [bundleAvailability, setBundleAvailability] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const isFalse = bundleArray.find((product) => product.available == false);
    isFalse ? setBundleAvailability(false) : setBundleAvailability(true);

    const sumTotal = bundleArray.reduce(
      (acc, current) => acc + current.price,
      0
    );
    setTotalPrice(sumTotal - (sumTotal * bundleDiscount) / 100);
  }, [bundleArray]);

  const addItemToCart = () => {
    const updatedBundleArray = [...bundleArray];
    updatedBundleArray.forEach((product) => {
      product["bundleDiscount"] = bundleDiscount || 0;
    });

    const randomIdentifier = Math.floor(Math.random() * 100) + 1;

    const itemArray = bundleArray.map((product) => ({
      id: product.id,
      quantity: 1,
      properties: {
        _bundleDiscount: product.bundleDiscount,
        _bundleId: `bundle-${window.eHS.product.id}-${randomIdentifier}`,
      },
    }));
    addToCart({ items: itemArray });
  };

  return (
    <div className="flex items-stretch mb-4">
      <button
        className="!px-1 button button--primary button--short w-full"
        disabled={!bundleAvailability}
        onClick={addItemToCart}
      >
        {bundleAvailability
          ? `Add All To Bag | $${(totalPrice / 100.0).toFixed(2)}`
          : "Out Of Stock"}
      </button>
    </div>
  );
};

export default BundleAddToCart;
