"use strict";

const linksContainers = document.querySelectorAll(
  '[class*="social-link"], .link_more'
);

linksContainers.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
  });
});
