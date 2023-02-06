import React, { useState } from "react";

import BundleChildOptions from "./bundle-child-options.jsx";

const BundleChild = (props) => {
  const { child, index, bundleArray, setBundleArray } = props;

  const [selectedVariant, setSelectedVariant] = useState(
    child.variants.find((variant) => variant.available) || child.variants[0]
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-row items-center lg:items-baseline">
          <img
            className="min-w-[120px] w-[120px]"
            loading="lazy"
            src={
              selectedVariant.featured_image
                ? selectedVariant.featured_image.src
                : child.media[0].src
            }
            alt={child.title}
          />
          <a className="ml-4 lg:hidden" href={`/products/${child.handle}/`}>
            <h4 className="p font-roboto">{child.title}</h4>
          </a>
        </div>
        <div className="lg:ml-4 overflow-auto">
          <div className="flex flex-col gap-2">
            <a className="hidden lg:block" href={`/products/${child.handle}/`}>
              <h4 className="p font-roboto">{child.title}</h4>
            </a>
            <BundleChildOptions
              product={child}
              index={index}
              selectedVariant={selectedVariant}
              setSelectedVariant={setSelectedVariant}
              bundleArray={bundleArray}
              setBundleArray={setBundleArray}
            />
          </div>
        </div>
      </div>
      <div className="border-t-[1px] border-grey-100 my-6 w-full"></div>
    </div>
  );
};

export default BundleChild;
