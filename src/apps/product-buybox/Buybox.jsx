import React from "react";

import MobileGallery from "./components/mobile-gallery.jsx";
import DesktopGallery from "./components/desktop-gallery.jsx";
import BuyboxContent from "./components/buybox-content.jsx";
import BuyBoxTitleInfo from "./components/buybox-title-info.jsx";
import Badge from "./components/badge.jsx";
import Breadcrumbs from "./components/breadcrumbs.jsx";
import Accordions from "./components/accordions.jsx";

// Set the default state for selected options
const { product } = window.eHS;
const defaultVariantID = product.defaultVariant;
const defaultVariant = product.variants.find(
  (variant) => variant.id === defaultVariantID
);
const defaultOptions = defaultVariant.options;
window.setState("selectedVariant", defaultVariant);
window.setState("selectedProductOptions", defaultOptions);

const Buybox = ({ data }) => {
  return (
    <div className="mt-4">
      <div className="lg:hidden">
        <div className="ccontain">
          <Breadcrumbs showBreadcrumbs={data.showBreadcrumbs} />
          <Badge />
          <BuyBoxTitleInfo stars={data.stampedStars} />
          <MobileGallery />
          <BuyboxContent globalMessage={data.globalPromoMessage} />
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
              <BuyBoxTitleInfo stars={data.stampedStars} />
              <div className="border-t-[1px] border-grey-100 mb-6 w-full"></div>
              <BuyboxContent globalMessage={data.globalPromoMessage} />
              <Accordions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buybox;
