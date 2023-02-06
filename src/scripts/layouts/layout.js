import "../../styles/theme.css";

import "../utils/State.js";
import "../../apps/email-signup/index.jsx";
import "../../apps/cart/index.jsx";

import { fitvids } from "../utils/FitVids";
import { setupObservers } from "../utils/LazyLoad.js";

import siteFooter from "../components/site-footer";
import siteHeader from "../components/site-header";
import siteAnnouncement from "../components/site-announcement";
import contentModules from "../components/contentModules";
import fullWidthHero from "../components/fullWidthHero";
import productTile from "../components/productTile";
import pageSidebarNav from "../components/pageSidebarNav";

document.addEventListener("DOMContentLoaded", () => {
  fitvids();
  setupObservers({});
  siteFooter.init();
  siteAnnouncement.init();
  siteHeader.init();
  contentModules.init();
  fullWidthHero.init();
  productTile.init();
  pageSidebarNav.init();
});
