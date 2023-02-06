import "apps/product-buybox/index.jsx";
import "apps/bundle-buybox/index.jsx";

import { setPreviousProductLink } from "scripts/components/ProductPositioner.js";

import productOneTwoUp from "../components/productOneTwoUp";

document.addEventListener("DOMContentLoaded", () => {
  setPreviousProductLink();
  productOneTwoUp.init();
});
