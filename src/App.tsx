import React, { useEffect, useState } from "react";

import chocChipImage from "./chocChip.png";
import doubleChocChipImage from "./doubleChocChip.png";

interface CookieProps {
  variant: "chocChip" | "doubleChocChip";
}

const Cookie: React.FC<CookieProps> = function (props) {
  let alt, src: string;

  switch (props.variant) {
    case "chocChip":
      alt = "Chocolate chip cookie";
      src = chocChipImage;
      break;
    case "doubleChocChip":
      alt = "Double chocolate chip cookie";
      src = doubleChocChipImage;
      break;
  }

  return <img alt={alt} src={src} />;
};

const CookieContainer: React.FC = function (props) {
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

interface CookieInformationProps {
  cookieCount: number;
  bakerCount: number;
  isFactoryRunning: boolean;
}

const CookieInformation: React.FC<CookieInformationProps> = function (props) {
  return (
    <div className="cookie-count">
      <div>You have {props.cookieCount} cookies</div>

      <div>You have {props.bakerCount} bakers</div>

      <div>The factory is {props.isFactoryRunning ? "" : "not "} running</div>
    </div>
  );
};

interface CookieControls {
  handleCookieClick: () => void;
  handleFactoryClick: () => void;
  handleBakerClick: () => void;
  isFactoryRunning: boolean;
}

const CookieControls: React.FC<CookieControls> = function (props) {
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

export const App: React.FC = function () {
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
