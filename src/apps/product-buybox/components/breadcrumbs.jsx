import React from "react";

const Breadcrumbs = ({ showBreadcrumbs }) => {
  const { product, collection } = window.eHS;

  return (
    <>
      {showBreadcrumbs === "true" && (
        <ul className="mb-4 list-none text-p-xs pl-0">
          <li className="text-grey-500 pl-0 inline">
            <a href="/">Home</a>
            <span className="inline-block mx-1">/</span>
          </li>
          <li className="text-grey-500 pl-0 inline">
            <a href={`/collections/${collection ? collection.handle : "all"}/`}>
              {collection ? collection.title : "All Products"}
            </a>
            <span className="inline-block mx-1">/</span>
          </li>
          <li className="pl-0 inline">{product.title}</li>
        </ul>
      )}
    </>
  );
};

export default Breadcrumbs;
