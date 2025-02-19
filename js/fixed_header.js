"use strict";

const header = document.querySelector(".header");

window.addEventListener("scroll", function () {
  header.classList.toggle("fixed", window.scrollY > 450);
});
