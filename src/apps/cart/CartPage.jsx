import React, { useState, useEffect } from "react";

import CartItems from "./CartItems.jsx";
import OrderSummary from "./OrderSummary.jsx";
import CartPageUpsells from "./CartPageUpsells.jsx";

import { addEffect } from "scripts/utils/Effects.js";
import FreeShipping from "./FreeShipping.jsx";

const CartPage = ({ data }) => {
  const [cartState, setCartState] = useState(window.state.cartState || {});
  useEffect(addEffect("cartState", setCartState), []);

  return (
    <>
      <div className="lg:mx-auto lg:px-6 lg:max-w-[85rem] w-full my-16 lg:my-20">
        {cartState && cartState.item_count <= 0 ? (
          <>
            <h1 className="text-black text-center my-16 lg:my-20">My Cart</h1>
            <CartItems data={data} />
          </>
        ) : (
          <>
            <div className="lg:hidden">
              <FreeShipping data={data} />
            </div>
            <div className="my-6 lg:mt-8 flex flex-row items-center mx-auto px-6 w-full lg:p-0 lg lg:flex-col lg:items-baseline">
              <div className="hidden lg:flex items-center mb-6">
                <a href="/">
                  <svg
                    width="21"
                    height="17"
                    viewBox="0 0 21 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.84026 7H20.0051V9H3.81659L9.42605 14.6095L8.01183 16.0237L0 8.01183L8.01183 0L9.42605 1.41421L3.84026 7Z"
                      fill="black"
                    />
                  </svg>
                </a>
                <p className="sub-s caps ml-2">Continue Shopping</p>
              </div>
              <a href="/" className="lg:hidden">
                <svg
                  width="14"
                  height="24"
                  viewBox="0 0 14 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.0607 20.9393L10.9394 23.0607L0.93935 13.0607C0.406817 12.5281 0.358405 11.6948 0.794114 11.1076L0.93935 10.9393L10.9393 0.939331L13.0607 3.06065L4.12201 12L13.0607 20.9393Z"
                    fill="black"
                  />
                </svg>
              </a>
              <div className="flex flex-row items-center">
                <h1 className="ml-6 text-black lg:m-0">My Cart</h1>
                {cartState ? (
                  <p className="ml-3 bg-grey-100 flex justify-center items-center text-grey-700 min-w-[31px] min-h-[31px] py-1 px-2">
                    {cartState.item_count}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-x-10 items-start">
              <div className="lg:col-span-2 mx-auto px-6 w-full lg:p-0">
                <div className="hidden lg:grid grid-cols-5 p-xs mb-2">
                  <span></span>
                  <span className="col-span-2 text-center xl:text-left xl:pl-[26px]">
                    Item
                  </span>
                  <span style={{ textAlign: "end" }}>Quantity</span>
                  <span style={{ textAlign: "end" }}>Total Price</span>
                </div>
                <div className="border-t-[1px] border-grey-100 mb-6 w-full"></div>
                <CartItems data={data} />
              </div>
              <div>
                <div className="hidden lg:block">
                  <FreeShipping data={data} />
                </div>
                <OrderSummary data={data} />
              </div>
            </div>
          </>
        )}
      </div>
      {data.showUpsells && <CartPageUpsells data={data} />}
    </>
  );
};

export default CartPage;
