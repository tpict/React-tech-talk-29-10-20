import React from "react";

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
  return <CookieContainer>Hello world</CookieContainer>;
};
