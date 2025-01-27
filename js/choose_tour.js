"use strict";

const chooseTourButton = document.querySelectorAll(".choose-tour__button");
const chooseTourCard = document.querySelectorAll(".choose-tour__card");
const chooseTourCards = document.querySelectorAll(".choose-tour__cards");

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
