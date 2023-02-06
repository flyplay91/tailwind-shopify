import React, { useState, useEffect } from "react";

import { resizeImage } from "scripts/utils/Images.js";

const BundleChildOptions = (props) => {
  const {
    product,
    index,
    selectedVariant,
    setSelectedVariant,
    bundleArray,
    setBundleArray,
  } = props;

  const media = product.media;

  const [productOptions, setProductOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setProductOptions(returnFullOptions(product));
    setSelectedOptions(selectedVariant.options);
  }, []);

  useEffect(() => {
    let productToUpdate = selectedVariant;
    if (selectedOptions.length) {
      productToUpdate = product.variants.find(
        // f javascript...
        (variant) => variant.options.toString() == selectedOptions.toString()
      );
    }

    if (!productToUpdate) {
      productToUpdate = { ...selectedVariant };
      productToUpdate.available = false;
    }

    setSelectedVariant(productToUpdate);
  }, [selectedOptions]);

  useEffect(() => {
    const newArray = [...bundleArray];
    newArray[index] = selectedVariant;
    setBundleArray(newArray);
  }, [selectedVariant]);

  const setOption = (optionGroup, option) => {
    const newOptionState = [...selectedOptions];
    const optionIndex = optionGroup.position;
    newOptionState[optionIndex] = option;
    setSelectedOptions([...newOptionState]);
  };

  const returnFullOptions = (product) => {
    const productOptionsArray = [];
    product.options.forEach((option, index) => {
      productOptionsArray.push({
        name: option,
        position: index,
        values: [],
      });
    });

    product.variants.forEach((variant) => {
      variant.options.forEach((option, index) => {
        !productOptionsArray[index].values.includes(option) &&
          productOptionsArray[index].values.push(option);
      });
    });

    return productOptionsArray;
  };

  return (
    <>
      <div className="mt-4">
        {productOptions.map((optionGroup, groupIndex) => (
          <div
            className={`${
              groupIndex + 1 != productOptions.length ? "mb-6" : ""
            }`}
            key={`option-group-${groupIndex}`}
          >
            {optionGroup.name !== "Title" && (
              <p className="sub-xs caps font-semibold text-grey-800 mb-2 flex items-center">
                {optionGroup.name}
                <span className="sub-xs caps !font-normal text-grey-800 ml-2">
                  {selectedOptions[optionGroup.position]}
                </span>
              </p>
            )}
            {optionGroup.name !== "Color" && optionGroup.name !== "Title" && (
              <div className="select-wrap bundle-pdp lg:!w-[250px]">
                <select
                  className="w-full"
                  onChange={(e) => setOption(optionGroup, e.target.value)}
                  value={selectedVariant.options[1]}
                >
                  {optionGroup.values.map((option, optionIndex) => (
                    <option value={option} key={`${option}-${optionIndex}`}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {optionGroup.name === "Color" && optionGroup.name !== "Title" && (
              <div className="overflow-hidden mb-2 lg:overflow-visible">
                <div className="color-thumb__container flex gap-2 flex-wrap">
                  {optionGroup.values.map((option, optionIndex) => {
                    return media.map((img) => {
                      if (
                        img.alt !== null &&
                        img.alt.includes(`color:${option.toLowerCase()}`)
                      ) {
                        return (
                          <div
                            className={`h-12 w-12 block shrink-0 grow-1 cursor-pointer border border-grey-100 transition-all ease-in-out duration-200 ${
                              selectedOptions.includes(option)
                                ? "!border-black !border-[2px]"
                                : "hover:!border-grey-300"
                            } ${
                              selectedVariant
                                ? selectedVariant.options.includes(option) &&
                                  !selectedVariant.available &&
                                  "bundle-option--oos"
                                : selectedOptions.includes(option) &&
                                  "bundle-option--oos"
                            }`}
                            key={`variant-option-${option}`}
                            aria-label={option}
                            onClick={() => setOption(optionGroup, option)}
                          >
                            <img
                              className="object-cover"
                              src={resizeImage(img.src, "x100")}
                              alt={img.alt.split("::")[1]}
                            />
                          </div>
                        );
                      }
                    });
                  })}
                </div>
              </div>
            )}
            {optionGroup.name === "Color" && optionGroup.name !== "Title" && (
              <p className="text-p-xs text-grey-700 lg:hidden">
                {optionGroup.values.length} Colors Available
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default BundleChildOptions;
