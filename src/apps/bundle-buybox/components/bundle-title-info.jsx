import React, { useState, useEffect } from "react";

const BundleTitleInfo = (props) => {
  const { bundleArray, bundleDiscount } = props;
  const { product } = window.eHS;

  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);

  useEffect(() => {
    const bundlePrice = bundleArray.reduce(
      (acc, current) => acc + current.price,
      0
    );
    const discount = (bundlePrice * bundleDiscount) / 100;
    const discountedPrice = bundlePrice - discount;

    setTotalPrice(bundlePrice);
    setDiscountedPrice(discountedPrice);
  }, [bundleArray]);

  return (
    <div className="mb-6">
      <h1 className="buybox-title h3 !font-roboto mb-4 text-black">
        {product.title}
      </h1>
      <div className="flex items-center gap-2">
        <h5 className="text-error">${(discountedPrice / 100.0).toFixed(2)}</h5>
        <h5 className="text-grey-600 line-through font-normal">
          ${(totalPrice / 100.0).toFixed(2)}
        </h5>
      </div>
    </div>
  );
};

export default BundleTitleInfo;
