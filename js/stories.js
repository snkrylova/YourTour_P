"use strict";

const storiesCard = document.querySelectorAll(".stories__card");

storiesCard.forEach((card) => {
  card.addEventListener("click", (event) => {
    if (!event.target.closest(".stories__social-links")) {
      card.querySelector(".link_more").click();
    }
  });
});
