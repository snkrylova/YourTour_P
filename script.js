"use strict";

const header = document.querySelector(".header");
const chooseTourButton = document.querySelectorAll(".choose-tour__button");
const chooseTourCard = document.querySelectorAll(".choose-tour__card");
const chooseTourCards = document.querySelectorAll(".choose-tour__cards");
const phoneInput = document.querySelector(
  'input[type="tel"].form__input-field'
);
const storiesCard = document.querySelectorAll(".stories__card");
const responsiveFontElements = document.querySelectorAll(
  ".responsive-font-weight"
);
const travelerPhotoImg = document.querySelectorAll(
  ".reviews__traveler-photo-img"
);

const tourCard1 = document.querySelector(".choose-tour__popular");
const tourCard2 = document.querySelector(".choose-tour__authorial");
const tourCard3 = document.querySelector(".choose-tour__campaign");
const tourCard4 = document.querySelector(".choose-tour__rafting");
const tourCard5 = document.querySelector(".choose-tour__cycling");

const tourCardList = {
  popular: tourCard1,
  authorial: tourCard2,
  campaign: tourCard3,
  rafting: tourCard4,
  cycling: tourCard5,
};

window.addEventListener("scroll", function () {
  header.classList.toggle("fixed", window.scrollY > 450);
  header.classList.toggle(
    "hidden",
    window.scrollY > 88 && window.scrollY < 450
  );
});

chooseTourButton.forEach((button) => {
  button.addEventListener("click", () => {
    chooseTourButton.forEach((btn) =>
      btn.classList.remove("choose-tour__button_active")
    );

    button.classList.add("choose-tour__button_active");
  });
});

chooseTourCard.forEach((card) => {
  card.addEventListener("click", () => {
    card.querySelector(".link_more").click();
  });
});

chooseTourButton.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.target.split("__")[1];

    chooseTourCards.forEach((card) => {
      card.classList.add("hidden");
    });

    const activeCard = tourCardList[target];
    activeCard.classList.remove("hidden");
  });
});

phoneInput.addEventListener("input", function () {
  let value = this.value.replace(/\D/g, "");

  this.value = value.replace(
    /^(\+7|7|8)?(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/,
    function (_, p1, p2, p3, p4, p5) {
      let formatted = "+7 ";

      if (p2) formatted += `(${p2}`;
      if (p3) formatted += `) ${p3}`;
      if (p4) formatted += `-${p4}`;
      if (p5) formatted += `-${p5}`;

      return formatted;
    }
  );
});

travelerPhotoImg.forEach((photo) => {
  photo.addEventListener("error", () => {
    photo.style.display = "none";
  });
});

storiesCard.forEach((card) => {
  card.addEventListener("click", (event) => {
    if (!event.target.closest(".stories__social-links")) {
      card.querySelector(".link_more").click();
    }
  });
});

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
