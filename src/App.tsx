import React, { useState } from "react";

import chocChipImage from "./chocChip.png";
import doubleChocChipImage from "./doubleChocChip.png";

const Cookie = function (props) {
  const alt =
    props.variant === "chocChip"
      ? "Chocolate chip cookie"
      : "Double chocolate chip cookie";

  const src =
    props.variant === "chocChip" ? chocChipImage : doubleChocChipImage;

  return <img alt={alt} src={src} />;
};

const CookieContainer = function (props) {
  return (
    <div className="App">
      <div className="cookie-decor">
        <Cookie variant="chocChip" />
        <Cookie variant="doubleChocChip" />
      </div>

      {props.children}
    </div>
  );
};

export const App = function () {
  const [cookieCount, setCookieCount] = useState(0);
  const [bakerCount, setBakerCount] = useState(0);
  const [isFactoryRunning, setFactoryRunning] = useState(false);

  function startFactory() {
    setFactoryRunning(true);
    setTimeout(() => {
      setCookieCount(cookieCount => cookieCount + 100);
      setFactoryRunning(false);
    }, 3000);
  }

  return (
    <CookieContainer>
      <div className="cookie-count">You have {cookieCount} cookies</div>

      <div className="cookie-count">You have {bakerCount} bakers</div>

      <div className="cookie-count">
        The factory is {isFactoryRunning ? "" : "not "} running
      </div>

      <div className="cookie-controls">
        <button onClick={() => setCookieCount(cookieCount + 1)}>
          Bake cookie
        </button>

        <button onClick={startFactory} disabled={isFactoryRunning}>
          Start factory
        </button>

        <button onClick={() => setBakerCount(bakerCount + 1)}>
          Hire baker
        </button>
      </div>
    </CookieContainer>
  );
};
