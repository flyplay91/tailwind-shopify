import React, { useState, useEffect } from "react";

import ProductTile from "./ProductTile.jsx";

const CartPageUpsells = ({ data }) => {
  const {
    upsellsBackground,
    upsellsHeader,
    upsellsCount,
    upsellsCollectionId,
  } = data;
  const [upsellArray, setUpsellArray] = useState([]);

  const addCollectionParam = upsellsCollectionId
    ? `&shopify_collection_id=${upsellsCollectionId}`
    : null;

  useEffect(() => {
    fetch(
      `https://rebuyengine.com/api/v1/products/recommended?limit=${upsellsCount}&metafields=yes&filter_oos=yes&context=similar${
        addCollectionParam && addCollectionParam
      }&key=992f7e623e8e0ffd4ac2e0980e352790f40ba5e4`
    )
      .then((data) => data.json())
      .then((json) => {
        setUpsellArray(json.data);
      });
  }, []);

  return (
    <div className={`py-16 ${upsellsBackground && "bg-off-white"}`}>
      <div className="ccontain">
        <h2 className="mb-4">{upsellsHeader}</h2>
        <div className="mb-3 lg:mb-9">
          <div className="border-t-[6px] border-primary w-11"></div>
          <div className="border-t-[3px] border-grey-100 w-full"></div>
        </div>
      </div>
      <div className="ccontain">
        <div>
          <div
            className="flex pb-6 scrollbar snap-mandatory overflow-auto"
            style={{ marginRight: "calc(51% - 50vw)" }}
          >
            {upsellArray &&
              upsellArray.map((product) => (
                <ProductTile key={product.id} product={product} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPageUpsells;
