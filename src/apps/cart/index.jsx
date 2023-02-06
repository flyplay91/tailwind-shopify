import React from "react";
import * as ReactDOM from "react-dom/client";

import InlineCart from "./InlineCart.jsx";
import CartPage from "./CartPage.jsx";
import CartIcon from "./CartIcon.jsx";

const defaultProps = {
  // Header
  title: "Shopping Cart",
  headerBackground: "#000000",
  headerText: "#FFFFFF",
  // Shipping Threshold
  threshold: 0,
  thresholdMessage: false,
  thresholdReachedMessage: false,
  thresholdBackground: "#FFFFFF",
  thresholdTextColor: "#000000",
  thresholdBarBackground: "#000000",
  // Main container
  backgroundColor: "#FCFBF9",
  // Disclaimer
  disclaimerBackground: "#FFFFFF",
  disclaimerTextColor: "#000000",
  disclaimerText: "*Shipping and taxes will be calculated at checkout.",
  // empty cart content
  continueShoppingText: "Shop Now",
  continueShoppingURL: "/collections/all",
  continueShoppingType: "secondary",
  removeIcon: `<svg class="w-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path></svg>`,
};

document.addEventListener("DOMContentLoaded", () => {
  const appContainer = document.querySelector("#InlineCart");
  const propsRaw = appContainer.getAttribute("props");
  const props = JSON.parse(propsRaw);
  const finalProps = Object.assign(defaultProps, props);

  const root = ReactDOM.createRoot(appContainer);
  root.render(<InlineCart data={finalProps} />);

  const cartPageAppContainer = document.querySelector("#CartPage") || false;
  if (cartPageAppContainer) {
    const cartPageRoot = ReactDOM.createRoot(cartPageAppContainer);
    cartPageRoot.render(<CartPage data={finalProps} />);
  }

  const cartIconAppContainer = document.querySelector("#CartIcon");
  cartIconAppContainer &&
    ReactDOM.createRoot(cartIconAppContainer).render(<CartIcon />);
});

document.addEventListener("cartOpenStateChange", () => {
  const isOpen = window.state["cartOpen"];

  if (isOpen) {
    const appContainer = document.querySelector("#InlineCart");
    const elementToFocus = appContainer.querySelectorAll("button")[0];
    elementToFocus.focus();
  }
});
