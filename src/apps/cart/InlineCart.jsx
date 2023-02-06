import React, { useState, useEffect } from "react";

import { addEffect } from "scripts/utils/Effects.js";
import { money } from "./utils/helpers";

import FreeShipping from "./FreeShipping.jsx";
import CartHeader from "./CartHeader.jsx";
import CartItems from "./CartItems.jsx";

// Add event listeners for opening cart
["openCart", "addToCart"].forEach((eventName) => {
  document.addEventListener(eventName, () => {
    window.setState("cartOpen", true);
  });
});

// Add event listeners for closing the cart
["closeCart", "keydown"].forEach((eventName) => {
  document.addEventListener(eventName, (event) => {
    if (event.keyCode && event.keyCode !== 27) return;
    window.setState("cartOpen", false);
  });
});

const InlineCart = ({ data }) => {
  const [openState, setOpenState] = useState(false);
  const [cartState, setCartState] = useState(window.state.cartState || {});

  useEffect(addEffect("cartState", setCartState), []);
  useEffect(
    addEffect("cartOpen", (isOpen) => {
      if (isOpen) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
      setOpenState(isOpen);
    }),
    []
  );

  return (
    <aside
      style={{ backgroundColor: data.backgroundColor }}
      className={`fixed top-0 bottom-0 flex flex-col h-full max-w-full w-[30rem] transition-all duration-200 z-[999] ${
        openState ? "right-0" : "right-cart"
      }`}
    >
      {openState && (
        <div
          className="absolute top-0 bottom-0 right-full w-screen bg-black opacity-50"
          onClick={() => window.setState("cartOpen", false)}
        ></div>
      )}

      <CartHeader data={data} />
      {cartState.item_count > 0 && (
        <FreeShipping inlineCart={true} data={data} />
      )}

      <div className="ccontain pb-6 grow overflow-auto h-full">
        <CartItems data={data} inlineCart={true} />
        <div
          className="side-cart-upsells border-t-[1px] border-t-grey-100"
          data-rebuy-id="65642"
        ></div>
      </div>

      <div
        style={{
          backgroundColor: data.disclaimerBackground,
          color: data.disclaimerTextColor,
          boxShadow: "0 0 20px 0 rgba(0,0,0,0.1)",
        }}
        className="py-6 px-4 left-0 right-0 bottom-0 flex flex-col items-center"
      >
        <a className="w-full" href="/checkout/">
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
        {data.disclaimerText && (
          <p className="mt-4 text-center p-xs">{data.disclaimerText}</p>
        )}
      </div>
    </aside>
  );
};

export default InlineCart;
