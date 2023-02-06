import React, { useState, useEffect } from "react";

import { addEffect } from "scripts/utils/Effects.js";
import { resizeImage } from "scripts/utils/Images.js";

const ProductOptions = () => {
  const [optionState, setOptionState] = useState(
    window.state.selectedProductOptions || []
  );
  const [selectedVariant, setSelectedVarient] = useState(
    window.state.selectedVariant || false
  );

  useEffect(addEffect("selectedProductOptions", setOptionState), []);
  useEffect(addEffect("selectedVariant", setSelectedVarient), []);

  const { product } = window.eHS;
  const media = product.media;

  const setSelectedOption = (optionGroup, option) => {
    const newOptionState = [...optionState];
    const optionIndex = optionGroup.position - 1;
    newOptionState[optionIndex] = option;
    window.setState("selectedProductOptions", newOptionState);

    // Take user back to top if they select a different color
    optionGroup.name == "Color" && window.scrollTo(0, 0);
  };

  return (
    <div className="mb-8 mt-4">
      {product.options.map((optionGroup, groupIndex) => (
        <div className="mb-8" key={`option-group-${groupIndex}`}>
          <p className="p-s font-semibold text-black mb-4 flex items-center">
            {optionGroup.name}
            <span className="p-s font-normal text-black ml-1">
              {optionState[optionGroup.position - 1]}
            </span>
          </p>
          {optionGroup.name !== "Color" && (
            <div className="flex flex-row flex-wrap gap-[6px]">
              {optionGroup.values.map((option, optionIndex) => (
                <button
                  className={`w-[60px] lg:w-[90px] bg-off-white py-2 transition-all ease-in-out duration-200 border-[2px] border-off-white ${
                    optionState.includes(option)
                      ? "!border-black !border-[2px]"
                      : "hover:!border-grey-300 hover:!border"
                  } ${
                    selectedVariant
                      ? selectedVariant.options.includes(option) &&
                        !selectedVariant.available &&
                        "option--oos"
                      : optionState.includes(option) && "option--oos"
                  }`}
                  key={`variant-option-${option}-${optionIndex}`}
                  onClick={() => setSelectedOption(optionGroup, option)}
                >
                  <span
                    className={`bg-off-white p-[2px] ${
                      optionState.includes(option) && "!font-semibold"
                    }`}
                  >
                    {option}
                  </span>
                </button>
              ))}
            </div>
          )}
          {optionGroup.name === "Color" && (
            <div className="overflow-hidden mb-4 lg:overflow-visible">
              <div className="color-thumb__container flex gap-x-2 lg:gap-y-2 lg:flex-wrap overflow-x-scroll">
                {optionGroup.values.map((option, optionIndex) => {
                  return media.map((img) => {
                    if (img.associated_color === option.toLowerCase()) {
                      return (
                        <div
                          className={`h-16 w-16 block shrink-0 grow-1 cursor-pointer border border-grey-100 transition-all ease-in-out duration-200 ${
                            optionState.includes(option)
                              ? "!border-black !border-[2px]"
                              : "hover:!border-grey-300"
                          }`}
                          key={`variant-option-${option}`}
                          aria-label={option}
                          onClick={() => setSelectedOption(optionGroup, option)}
                        >
                          <img
                            className="object-cover"
                            src={resizeImage(img.variant_image, "x100")}
                            alt={img.image_alt_text}
                          />
                        </div>
                      );
                    }
                  });
                })}
              </div>
            </div>
          )}
          {optionGroup.name === "Color" && (
            <p className="text-p-xs text-grey-700 lg:hidden">
              {optionGroup.values.length} Colors Available
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductOptions;
