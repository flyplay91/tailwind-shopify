import React, { useState, useEffect } from "react";

import MobileGallery from "../product-buybox/components/mobile-gallery.jsx";
import DesktopGallery from "../product-buybox/components/desktop-gallery.jsx";
import BundleContent from "./components/bundle-content.jsx";
import BundleTitleInfo from "./components/bundle-title-info.jsx";
import Badge from "../product-buybox/components/badge.jsx";
import Breadcrumbs from "../product-buybox/components/breadcrumbs.jsx";
import Accordions from "../product-buybox/components/accordions.jsx";

const BundleBuybox = ({ data }) => {
  const [bundleArray, setBundleArray] = useState([]);

  useEffect(() => {
    const firstAvailableArray = data.bundleProducts.map((product) => {
      return (
        product.variants.find((variant) => variant.available) ||
        product.variants[0]
      );
    });

    setBundleArray(firstAvailableArray);
  }, []);

  return (
    <div className="mt-4">
      <div className="lg:hidden">
        <div className="ccontain">
          <Breadcrumbs showBreadcrumbs={data.showBreadcrumbs} />
          <Badge />
          <BundleTitleInfo
            bundleArray={bundleArray}
            bundleDiscount={data.bundleDiscount}
          />
          <MobileGallery />
          <BundleContent
            globalMessage={data.globalPromoMessage}
            children={data.bundleProducts}
            bundleArray={bundleArray}
            setBundleArray={setBundleArray}
            bundleDiscount={data.bundleDiscount}
          />
        </div>
        <Accordions />
      </div>

      <div className="hidden lg:block ccontain">
        <Breadcrumbs showBreadcrumbs={data.showBreadcrumbs} />
        <div
          className="grid gap-x-14"
          style={{ gridTemplateColumns: "minmax(auto,43.75rem) 485px" }}
        >
          <DesktopGallery />
          <div className="min-w-[485px]">
            <div className="sticky top-[12rem]">
              <BundleTitleInfo
                bundleArray={bundleArray}
                bundleDiscount={data.bundleDiscount}
              />
              <div className="border-t-[1px] border-grey-100 mb-6 w-full"></div>
              <BundleContent
                globalMessage={data.globalPromoMessage}
                children={data.bundleProducts}
                bundleArray={bundleArray}
                setBundleArray={setBundleArray}
                bundleDiscount={data.bundleDiscount}
              />
              <Accordions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleBuybox;
