import React, { useEffect, useState } from "react";

import chocChipImage from "./chocChip.png";
import doubleChocChipImage from "./doubleChocChip.png";

interface CookieProps {
  variant: "chocChip" | "doubleChocChip";
}

const Cookie = function (props: CookieProps): React.ReactElement {
  const alt =
    props.variant === "chocChip"
      ? "Chocolate chip cookie"
      : "Double chocolate chip cookie";

  const src =
    props.variant === "chocChip" ? chocChipImage : doubleChocChipImage;

  return <img alt={alt} src={src} />;
};

interface CookieContainer {
  children: React.ReactNode;
}

const CookieContainer = function (props: CookieContainer): React.ReactElement {
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

const CookieInformation = function (props) {
  return (
    <div className="cookie-count">
      <div>You have {props.cookieCount} cookies</div>

      <div>You have {props.bakerCount} bakers</div>

      <div>The factory is {props.isFactoryRunning ? "" : "not "} running</div>
    </div>
  );
};

const CookieControls = function (props) {
  return (
    <div className="cookie-controls">
      <button onClick={props.handleCookieClick}>Bake cookie</button>

      <button
        onClick={props.handleFactoryClick}
        disabled={props.isFactoryRunning}
      >
        Start factory
      </button>

      <button onClick={props.handleBakerClick}>Hire baker</button>
    </div>
  );
};

function useCookieBakers(bakerCount, setCookieCount) {
  useEffect(() => {
    const interval = setInterval(
      () => setCookieCount(cookieCount => cookieCount + bakerCount),
      1000,
    );

    return () => clearInterval(interval);
  }, [bakerCount]);
}

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

  useCookieBakers(bakerCount, setCookieCount);

  return (
    <CookieContainer>
      <CookieInformation
        cookieCount={cookieCount}
        bakerCount={bakerCount}
        isFactoryRunning={isFactoryRunning}
      />

      <CookieControls
        handleCookieClick={() => setCookieCount(cookieCount => cookieCount + 1)}
        handleFactoryClick={startFactory}
        handleBakerClick={() => setBakerCount(bakerCount => bakerCount + 1)}
        isFactoryRunning={isFactoryRunning}
      />
    </CookieContainer>
  );
};
