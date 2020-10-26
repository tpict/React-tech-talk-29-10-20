import React, { useEffect, useReducer } from "react";

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

type CookieInformationProps = State;

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
  dispatch: React.Dispatch<Actions>;
  isFactoryRunning: boolean;
}

const CookieControls: React.FC<CookieControls> = function (props) {
  return (
    <div className="cookie-controls">
      <button onClick={() => props.dispatch("addCookie")}>Bake cookie</button>

      <button
        onClick={() => props.dispatch("startFactory")}
        disabled={props.isFactoryRunning}
      >
        Start factory
      </button>

      <button onClick={() => props.dispatch("addBaker")}>Hire baker</button>
    </div>
  );
};

interface State {
  cookieCount: number;
  bakerCount: number;
  isFactoryRunning: boolean;
}

type Actions =
  | "addCookie"
  | "addBaker"
  | "startFactory"
  | "stopFactory"
  | "bakersBaked";

function reducer(state: State, action: Actions): State {
  switch (action) {
    case "addCookie":
      return { ...state, cookieCount: state.cookieCount + 1 };
    case "addBaker":
      return { ...state, bakerCount: state.bakerCount + 1 };
    case "startFactory":
      return { ...state, isFactoryRunning: true };
    case "stopFactory":
      return {
        ...state,
        isFactoryRunning: false,
        cookieCount: state.cookieCount + 100,
      };
    case "bakersBaked":
      return { ...state, cookieCount: state.cookieCount + state.bakerCount };
  }
}

function useCookieBakers(
  bakerCount: number,
  dispatch: React.Dispatch<Actions>,
): void {
  useEffect(() => {
    const interval = setInterval(() => dispatch("bakersBaked"), 1000);
    return () => clearInterval(interval);
  }, [bakerCount]);
}

export const App: React.FC = function () {
  const [state, dispatch] = useReducer(reducer, {
    cookieCount: 0,
    bakerCount: 0,
    isFactoryRunning: false,
  });

  useEffect(() => {
    if (state.isFactoryRunning) {
      setTimeout(() => dispatch("stopFactory"), 3000);
    }
  }, [state.isFactoryRunning]);

  useCookieBakers(state.bakerCount, dispatch);

  return (
    <CookieContainer>
      <CookieInformation {...state} />

      <CookieControls
        dispatch={dispatch}
        isFactoryRunning={state.isFactoryRunning}
      />
    </CookieContainer>
  );
};
