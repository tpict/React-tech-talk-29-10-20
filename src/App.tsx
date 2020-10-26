import React from "react";

import chocChipImage from "./chocChip.png";
import doubleChocChipImage from "./doubleChocChip.png";

export const Cookie = function (props) {
  const alt =
    props.variant === "chocChip"
      ? "Chocolate chip cookie"
      : "Double chocolate chip cookie";

  const src =
    props.variant === "chocChip" ? chocChipImage : doubleChocChipImage;

  return React.createElement("img", {
    alt,
    src,
  });
};

export const App = function () {
  return React.createElement("div", { className: "App" }, [
    React.createElement("div", { className: "cookie-decor" }, [
      React.createElement(Cookie, { variant: "chocChip" }),
      React.createElement(Cookie, { variant: "doubleChocChip" }),
    ]),
    "Hello world",
  ]);
};
