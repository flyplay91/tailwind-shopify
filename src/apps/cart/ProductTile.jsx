import React from "react";

import Badge from "../product-buybox/components/badge.jsx";

const ProductTile = ({ product }) => {
  return (
    <>
      {product && (
        <a
          className="bg-white p-7 cursor-pointer mx-auto shrink-0 snap-center mr-6"
          href={product.link}
          title={product.title}
        >
          <div className="aspect-square w-[225px] lg:w-[310px] mb-2">
            <img
              loading="lazy"
              src={product.image?.src}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="max-w-[225px] lg:max-w-[310px]">
            {product.tags.length && (
              <Badge propsProduct={product} outline={false} />
            )}
            <div className="">
              <p className="text-p-s font-medium">{product.title}</p>
            </div>
            {product.metafields && product.metafields.length > 0 && (
              <div className="my-2">
                <span
                  className="stamped-product-reviews-badge"
                  data-id={product.id}
                  data-product-sku={product.handle}
                  data-product-title={product.title}
                  data-product-type={product.product_type}
                  style={{ display: "block" }}
                >
                  {product.metafields.map((metafield) =>
                    metafield.namespace == "stamped" &&
                    metafield.key == "badge" ? (
                      <div
                        key={metafield.value}
                        dangerouslySetInnerHTML={{ __html: metafield.value }}
                      ></div>
                    ) : (
                      ""
                    )
                  )}
                </span>
              </div>
            )}
            <p className="lowercase text-grey-300 p-s mb-2">
              {product.options[0].values.length}{" "}
              {product.options[0].name == "Color" ? "Colors" : "Options"}{" "}
              Available
            </p>
            {product.variants[0].compare_at_price ? (
              <div className="flex flex-row gap-2">
                <p className="p-s text-error font-oswald font-semibold">
                  ${product.variants[0].price}
                </p>
                <p className="p-s text-grey-600 !font-normal line-through font-oswald">
                  ${product.variants[0].compare_at_price}
                </p>
              </div>
            ) : (
              <p className="p-s text-black font-oswald font-semibold">
                ${product.variants[0].price}
              </p>
            )}
          </div>
        </a>
      )}
    </>
  );
};

export default ProductTile;
