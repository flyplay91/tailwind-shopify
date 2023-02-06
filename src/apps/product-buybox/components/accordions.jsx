import React, { useState } from "react";

const Accordions = () => {
  const { product } = window.eHS;
  const [coreFeaturesToggleOpen, setCoreFeaturesToggleOpen] = useState(true);
  const [detailsToggleOpen, setDetailsToggleOpen] = useState(false);

  const accordionArray = [
    {
      name: "Core Features",
      content: product.productCoreFeatures,
      state: coreFeaturesToggleOpen,
      setter: setCoreFeaturesToggleOpen,
    },
    {
      name: "Details",
      content: product.description,
      state: detailsToggleOpen,
      setter: setDetailsToggleOpen,
    },
  ];

  const handleToggle = (e, setter) => {
    e.preventDefault();
    accordionArray.forEach((accordion) => {
      accordion.setter == setter
        ? accordion.setter(!accordion.state)
        : accordion.setter(false);
    });
  };

  return (
    <div className="mt-[40px] flex flex-col">
      {accordionArray.map(
        (accordion) =>
          accordion.content != "" &&
          accordion.content != null && (
            <details
              open={accordion.state}
              className="first:border-t border-b border-grey-100 cursor-pointer"
              key={accordion.name}
              onClick={(e) => handleToggle(e, accordion.setter)}
            >
              <summary
                className={`h-[53px] border-l-[5px] flex items-center justify-between px-6 ${
                  accordion.state
                    ? "border-l-primary lg:pl-[19px]"
                    : "border-l-grey-100 lg:border-l-0"
                }`}
              >
                <span className="p-s font-semibold text-black">
                  {accordion.name}
                </span>
                <svg
                  className={`${accordion.state && "rotate-180"}`}
                  fill="none"
                  height="7"
                  viewBox="0 0 12 7"
                  width="12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4697 0.469727L11.5303 1.53039L6.53033 6.53039C6.26406 6.79665 5.8474 6.82086 5.55378 6.603L5.46967 6.53039L0.469666 1.53039L1.53033 0.469727L6 4.93906L10.4697 0.469727Z"
                    fill="black"
                  />
                </svg>
              </summary>
              <div
                className="py-4 px-6"
                dangerouslySetInnerHTML={{ __html: accordion.content }}
              ></div>
            </details>
          )
      )}
    </div>
  );
};

export default Accordions;
