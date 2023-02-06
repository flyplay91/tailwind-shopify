import React, { useState, useEffect } from "react";

import { addEffect } from "scripts/utils/Effects.js";

import { money } from "./utils/helpers";

const OrderSummary = ({ data }) => {
  const [cartState, setCartState] = useState(window.state.cartState || {});
  useEffect(addEffect("cartState", setCartState), []);

  return (
    <div className="px-6 py-12 bg-off-white">
      <h2 className="h4 text-center">Order Summary</h2>

      <div className="mt-4 border-t border-grey-100 pt-4 pb-2 flex justify-between">
        <p className="p-s">Subtotal</p>
        <p className="p-s">
          {cartState ? `$${(cartState.total_price / 100.0).toFixed(2)}` : "-"}
        </p>
      </div>
      <div className="py-2 flex justify-between">
        <p className="p-s">Shipping</p>
        {cartState.total_price >= data.threshold ? (
          <p className="text-primary p-s font-semibold">Free</p>
        ) : (
          <p className="p-s">TBD</p>
        )}
      </div>
      <div className="mb-4 border-b border-grey-100 pt-2 pb-4 flex justify-between">
        <p className="p-s">Taxes</p>
        <p className="p-s">TBD</p>
      </div>

      <div className="mt-6 mb-3">
        <a href="/checkout/">
          <button className="button button--primary flex flex-row items-center justify-center gap-3 w-full">
            <svg
              width="12"
              height="16"
              viewBox="0 0 12 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.648459 0.993164H11.3516C11.3516 2.79393 11.3311 4.54916 11.3311 6.35618H9.42252V2.98392H2.60188V6.20866H0.693322C0.693322 4.42613 0.648459 2.76328 0.648459 0.993164ZM0 6.95198H12V15.0069H0V6.95198ZM6.00009 8.59017C5.16807 8.59017 4.49366 9.20952 4.49366 9.9733C4.49366 10.4429 4.74863 10.8578 5.13836 11.1078C5.12885 11.1573 5.12372 11.2083 5.12372 11.2605V12.9861C5.12372 13.4305 5.48724 13.7941 5.93168 13.7941H5.93176C6.37603 13.7941 6.73973 13.4306 6.73973 12.9861V11.2605C6.73973 11.2335 6.73836 11.2068 6.7357 11.1804C7.19572 10.9436 7.50642 10.4919 7.50642 9.97322C7.50642 9.20952 6.83202 8.59017 6.00009 8.59017Z"
                fill="white"
              />
            </svg>
            <span>Checkout | ${money(cartState.total_price)}</span>
          </button>
        </a>
      </div>
      <p className="mb-6 p-xs text-center">
        *Shipping & taxes calculated at checkout
      </p>
    </div>
  );
};

export default OrderSummary;
