import React, { useState, useEffect } from "react";

const FreeShipping = ({ data, inlineCart = false }) => {
  const [cartState, setCartState] = useState(window.state.cartState);
  useEffect(() => {
    const abortController = window.listenToState(setCartState, "cartState");
    return () => abortController.abort();
  }, []);

  const thresholdMet = () => {
    const haveSubProduct = cartState.items.reduce((found, item) => {
      return found || item.selling_plan_allocation;
    }, false);
    return (
      (data.threshold > 0 && data.threshold < cartState.price) || haveSubProduct
    );
  };

  const cleanThresholdMessage = () => {
    const toGo = data.threshold - (cartState.price || 0);
    return data.thresholdMessage.replace("$TOTAL", toGo / 100.0);
  };

  const thresholdBarStyles = {
    width: `${
      thresholdMet()
        ? 100
        : Math.min(100, (cartState.price / data.threshold) * 100.0)
    }%`,
    backgroundColor: data.thresholdBarBackground,
  };

  const thresholdWrapperStyles = {
    backgroundColor: data.thresholdBackground,
  };

  const thresholdTextColor = {
    color: data.thresholdTextColor,
  };

  if (data.threshold > 0 || data.thresholdMessage !== false) {
    return (
      <div
        style={thresholdWrapperStyles}
        className={`py-4 px-12 border-b border-b-grey-100 ${
          !inlineCart && "lg:border-0 lg:mb-4"
        }`}
      >
        <p
          className="mb-3 text-center font-bold sub-s caps"
          style={thresholdTextColor}
        >
          {thresholdMet()
            ? data.thresholdReachedMessage
            : cleanThresholdMessage()}
        </p>
        {data.threshold > 0 && (
          <div className="flex items-center">
            <div className="mx-1 rounded-[100px] h-2 w-full grow-1 overflow-hidden bg-grey-300">
              <div style={thresholdBarStyles} className="h-full"></div>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export default FreeShipping;
