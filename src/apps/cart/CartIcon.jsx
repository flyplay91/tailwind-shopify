import React, { useState, useEffect } from "react";

import { addEffect } from "scripts/utils/Effects.js";
import { getCart } from "scripts/utils/Cart.js";

const CartIcon = () => {
  const [cartState, setCartState] = useState(
    window.state.cartState || { items: [] }
  );

  useEffect(addEffect("cartState", setCartState), []);

  useEffect(() => {
    setTimeout(() => {
      const stampedATCArray = Array.from(
        document.querySelectorAll(".stamped-buy-button")
      );

      if (stampedATCArray.length) {
        stampedATCArray.forEach((btn) => {
          btn.addEventListener("click", () => {
            getCart();
          });
        });
      }
    }, 5500);
  }, []);

  return (
    <div className="flex items-center h-full ml-6 lg:ml-8 py-6">
      <a href="/cart" title="Cart" className="relative flex">
        <span className="inline-block relative">
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.2258 0.803696L6.36694 6.61965H0.870972L3.67742 20.1902H16.7742L19.5806 6.61965H14.0847L10.2258 0.803696ZM10.2258 4.22541L11.8143 6.61965H8.63736L10.2258 4.22541ZM17.2663 8.5583L15.2615 18.2516H5.1901L3.18536 8.5583H17.2663Z"
              fill="currentColor"
            />
          </svg>
          {cartState.item_count > 0 && (
            <span
              className="items-center justify-center absolute top-0 -right-3 sub-xxs text-white min-w-[16px] h-4 bg-primary border border-white rounded flex"
              data-cart-count-icon
            >
              {cartState.item_count}
            </span>
          )}
        </span>
      </a>
    </div>
  );
};

export default CartIcon;
