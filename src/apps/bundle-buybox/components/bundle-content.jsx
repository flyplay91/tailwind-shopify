import React from "react";

import BundleChild from "./bundle-child.jsx";
import BundleAddToCart from "./bundle-add-to-cart.jsx";

const BundleContent = (props) => {
  const {
    globalMessage,
    children,
    bundleArray,
    setBundleArray,
    bundleDiscount,
  } = props;
  const { product } = window.eHS;
  const promoMessage = product.promoMessage;

  return (
    <div className="mt-4 mb-8">
      <p className="p-s text-grey-600 mb-4">
        {children.length} products included
      </p>
      {children.map((child, index) => (
        <BundleChild
          child={child}
          key={child.title}
          index={index}
          bundleArray={bundleArray}
          setBundleArray={setBundleArray}
        />
      ))}
      <BundleAddToCart
        bundleArray={bundleArray}
        bundleDiscount={bundleDiscount}
      />
      {promoMessage || (globalMessage && !globalMessage) ? (
        <p className="p-xs lg:text-p-s text-grey-800">{promoMessage}</p>
      ) : (
        <p className="p-xs lg:text-p-s text-grey-800">{globalMessage}</p>
      )}
    </div>
  );
};

export default BundleContent;
