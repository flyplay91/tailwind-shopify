import React from "react";
import * as ReactDOM from "react-dom/client";

import BundleBuybox from "./BundleBuybox.jsx";

document.addEventListener("DOMContentLoaded", () => {
  const bundleBuyboxApp =
    document.querySelector("#ProductBundleBuybox") || false;
  if (!bundleBuyboxApp) return;

  const propsRaw = bundleBuyboxApp.getAttribute("props");
  const finalProps = JSON.parse(propsRaw);

  const root = ReactDOM.createRoot(bundleBuyboxApp);
  root.render(<BundleBuybox data={finalProps} />);

  window.listenToState((variant) => {
    if (!variant) return;

    const { origin, pathname } = window.location;
    const newURL = `${origin}${pathname}?variant=${variant.id}`;
    history.replaceState({}, "", newURL);
  }, "selectedVariant");
});
