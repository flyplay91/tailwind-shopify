import React from "react";

import ProductOptions from "./product-options.jsx";
import AddToCart from "./add-to-cart.jsx";

const BuyboxContent = ({ globalMessage }) => {
  const { product } = window.eHS;
  const promoMessage = product.promoMessage;

  return (
    <>
      {product.options[0].name !== "Title" && <ProductOptions />}
      <AddToCart />
      {promoMessage || (globalMessage && !globalMessage) ? (
        <p className="p-xs lg:text-p-s text-grey-800">{promoMessage}</p>
      ) : (
        <p className="p-xs lg:text-p-s text-grey-800">{globalMessage}</p>
      )}
    </>
  );
};

export default BuyboxContent;
