"use strict";

const responsiveFontElements = document.querySelectorAll(
  ".responsive-font-weight"
);

function updateFontWeight() {
  const widthWindow = window.innerWidth;

  responsiveFontElements.forEach((responsiveFontElement) => {
    responsiveFontElement.classList.toggle(
      "roboto-medium",
      widthWindow >= 1024
    );
    responsiveFontElement.classList.toggle("roboto-bold", widthWindow < 1024);
  });
}

window.addEventListener("load", updateFontWeight);
window.addEventListener("resize", updateFontWeight);
