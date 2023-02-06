import React, { useState, useEffect } from "react";

import { addEffect } from "scripts/utils/Effects.js";

import { updateCart } from "scripts/utils/Cart.js";
import { money } from "./utils/helpers";

const CartItem = ({ data, inlineCart }) => {
  const { props, item, itemIndex, itemsSize } = data;

  const [cartState, setCartState] = useState(window.state.cartState || {});

  useEffect(addEffect("cartState", setCartState), []);

  const cleanedOptions = (item) => {
    if (!item.options_with_values) return [];
    return item.options_with_values.filter((option) => {
      return option.value !== "Default Title";
    });
  };

  const updateLineItem = (item, quantity) => {
    if (item.properties && item.properties.length > 0) {
      const likeItemsArray = cartState.items.filter(
        (product) =>
          product.properties.length > 0 &&
          product.properties[1][1] == item.properties[1][1]
      );
      updateCart({ items: likeItemsArray, quantity }).then(() =>
        data.setCartProcessing(false)
      );
    } else {
      updateCart({ key: item.key, quantity }).then(() =>
        data.setCartProcessing(false)
      );
    }
  };

  console.log(item);

  return (
    <div
      className={`my-6 pb-6 ${
        itemIndex != itemsSize - 1 ? "border-b border-b-grey-100" : "mb-0"
      } ${data.cartProcessing ? "opacity-40 pointer-events-none" : ""}`}
    >
      <div className="flex">
        <a className="mr-4 lg:mr-6" href={`/products/${item.product.handle}/`}>
          <div className={`w-20 h-20 ${!inlineCart ? "lg:w-44 lg:h-44" : ""}`}>
            <img
              src={item.image}
              alt={item.title}
              className="mr-3 w-full h-full object-contain object-center"
            />
          </div>
        </a>
        <div className="grow">
          {/* Mobile Version */}
          <div className={`${!inlineCart ? "lg:hidden" : ""}`}>
            <div className="mb-3 w-full flex justify-between items-baseline">
              <a
                className="no-underline"
                href={`/products/${item.product.handle}/`}
              >
                <p className="p-s font-medium text-grey-800">
                  {item.product.title}
                </p>
              </a>
              <button
                className="ml-5"
                aria-label={`remove ${item.product.title} from cart`}
                onClick={() => {
                  data.setCartProcessing(true);
                  updateLineItem(item, 0);
                }}
              >
                <span
                  className="inline text-grey-800"
                  dangerouslySetInnerHTML={{ __html: props.removeIcon }}
                />
              </button>
            </div>
            { item.product.type !== 'Gift Card' && (
              <div className="flex flex-row gap-2 mb-37">
                {cleanedOptions(item).map((option, optionIndex) => (
                  <p
                    className="p-xs text-grey-600"
                    key={`item-${itemIndex}-option-${optionIndex}`}
                  >
                    {option.value}
                  </p>
                ))}
              </div>
            )}
            {item.variant.compare_at_price &&
            item.variant.compare_at_price > item.variant.price ? (
              <h6 className="flex flex-row gap-2 items-end !font-oswald">
                <span className="text-error">
                  ${money(item.price * item.quantity)}
                </span>
                <span className="line-through text-grey-300">
                  ${money(item.variant.compare_at_price * item.quantity)}
                </span>
                <span className="line-through text-grey-300">
                  ${money(item.variant.compare_at_price * item.quantity)}
                </span>
              </h6>
            ) : (
              <h6 className="!font-oswald">
                ${money(item.price * item.quantity)}
              </h6>
            )}
            <div className="mt-3 mb-1 w-full flex justify-between items-center">
              <div className="border flex items-center rounded-sm border-grey-100">
                <button
                  className="py-4 px-3"
                  aria-label="decrease quantity"
                  onClick={() => {
                    data.setCartProcessing(true);
                    updateLineItem(item, item.quantity - 1);
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      stroke="#C7CBCA"
                      strokeWidth="1.25"
                      fill="none"
                      fillRule="evenodd"
                      strokeLinecap="round"
                    >
                      <path d="M12.538 7H1.462" />
                    </g>
                  </svg>
                </button>
                <span className="pt-px">{item.quantity}</span>
                <button
                  className="py-4 px-3"
                  aria-label="increase quantity"
                  onClick={() => {
                    data.setCartProcessing(true);
                    updateLineItem(item, item.quantity + 1);
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      stroke="#323332"
                      strokeWidth="1.25"
                      fill="none"
                      fillRule="evenodd"
                      strokeLinecap="round"
                    >
                      <path d="M12.538 7H1.462M7 1.462v11.076" />
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* Desktop Version */}
          {!inlineCart && (
            <div className="hidden lg:grid lg:grid-cols-4">
              <div className="col-span-2 flex flex-col">
                <a
                  className="no-underline"
                  href={`/products/${item.product.handle}/`}
                >
                  <p className="p-s font-medium text-grey-800">
                    {item.product.title}
                  </p>
                </a>
                { item.product.type !== 'Gift Card' && (
                  <div className="flex flex-row gap-2 mb-3">
                    {cleanedOptions(item).map((option, optionIndex) => (
                      <p
                        className="p-xs text-grey-600"
                        key={`item-${itemIndex}-option-${optionIndex}`}
                      >
                        {option.value}
                      </p>
                    ))}
                  </div>
                )}
                {item.variant.compare_at_price &&
                item.variant.compare_at_price > item.variant.price ? (
                  <h6 className="flex flex-row gap-2 items-end !font-oswald">
                    <span className="text-black">${money(item.price)}</span>
                    <span className="line-through text-grey-300">
                      ${money(item.variant.compare_at_price)}
                    </span>
                    <span className="line-through text-grey-300">
                      ${money(item.variant.compare_at_price)}
                    </span>
                  </h6>
                ) : (
                  <h6 className="!font-oswald text-black">
                    ${money(item.price)}
                  </h6>
                )}
              </div>
              <div className="col-span-1 flex flex-col justify-self-end items-end">
                <div className="mb-7 w-full flex justify-between items-center">
                  <div className="border flex items-center rounded-sm border-grey-100">
                    <button
                      className="py-4 px-3"
                      aria-label="decrease quantity"
                      onClick={() => {
                        data.setCartProcessing(true);
                        updateLineItem(item, item.quantity - 1);
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          stroke="#C7CBCA"
                          strokeWidth="1.25"
                          fill="none"
                          fillRule="evenodd"
                          strokeLinecap="round"
                        >
                          <path d="M12.538 7H1.462" />
                        </g>
                      </svg>
                    </button>
                    <span className="pt-px">{item.quantity}</span>
                    <button
                      className="py-4 px-3"
                      aria-label="increase quantity"
                      onClick={() => {
                        data.setCartProcessing(true);
                        updateLineItem(item, item.quantity + 1);
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          stroke="#323332"
                          strokeWidth="1.25"
                          fill="none"
                          fillRule="evenodd"
                          strokeLinecap="round"
                        >
                          <path d="M12.538 7H1.462M7 1.462v11.076" />
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
                <div
                  className="flex flex-row gap-2 cursor-pointer"
                  aria-label={`remove ${item.product.title} from cart`}
                  onClick={() => {
                    data.setCartProcessing(true);
                    updateLineItem(item, 0);
                  }}
                >
                  <button>
                    <span
                      className="inline text-grey-800"
                      dangerouslySetInnerHTML={{ __html: props.removeIcon }}
                    />
                  </button>
                  <p className="p-xs underline">Remove</p>
                </div>
              </div>
              <div className="col-span-1 flex flex-col items-end">
                {item.variant.compare_at_price &&
                item.variant.compare_at_price > item.variant.price ? (
                  <h6 className="flex flex-col gap-2 items-end !font-oswald">
                    <span className="text-error">
                      ${money(item.price * item.quantity)}
                    </span>
                    <span className="line-through text-grey-300">
                      ${money(item.variant.compare_at_price * item.quantity)}
                    </span>
                  </h6>
                ) : (
                  <h6 className="!font-oswald">
                    ${money(item.price * item.quantity)}
                  </h6>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
