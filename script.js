"use strict";

const header = document.querySelector(".header");
const chooseTourButton = document.querySelectorAll(".choose-tour__button");
const chooseTourCard = document.querySelectorAll(".choose-tour__card");
const chooseTourCards = document.querySelectorAll(".choose-tour__cards");
const collectTourForm = document.querySelector(".collect-tour__form");
const storiesCard = document.querySelectorAll(".stories__card");
const responsiveFontElements = document.querySelectorAll(
  ".responsive-font-weight"
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

const fields = {
  name: {
    inputElement: document.querySelector(".form__name"),
    interacted: false,
  },
  tour: {
    inputElement: document.querySelector(".form__custom-select"),
    interacted: false,
  },
  email: {
    inputElement: document.querySelector(".form__email"),
    interacted: false,
  },
  tel: {
    inputElement: document.querySelector(".form__tel"),
    interacted: false,
  },
  startDate: {
    inputElement: document.querySelector(".form__input-date_start"),
    interacted: false,
  },
  endDate: {
    inputElement: document.querySelector(".form__input-date_end"),
    interacted: false,
  },
  age: {
    inputElement: Array.from(document.querySelectorAll(".form__radio-input")),
    interacted: false,
  },
  licenseAgreement: {
    inputElement: document.querySelector(".form__checkbox-input"),
    interacted: false,
  },
};

for (const key in fields) {
  const field = fields[key];

  if (Array.isArray(field.inputElement)) {
    const firstRadio = field.inputElement[0];

    field.errorMessageElement = firstRadio
      .closest(".form__group")
      .querySelector(".error-message");
  } else {
    field.errorMessageElement = field.inputElement
      .closest(".form__group")
      .querySelector(".error-message");
  }
}

function showErrorMessage(errorInput) {
  errorInput.classList.add("visible");
}

function hiddenErrorMessage(errorInput) {
  errorInput.classList.remove("visible");
}

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

function setInteractionFlag(field) {
  field.interacted = true;
}

for (const key in fields) {
  const field = fields[key];

  if (Array.isArray(field.inputElement)) {
    field.inputElement.forEach((radio) => {
      radio.addEventListener("focus", function () {
        setInteractionFlag(field);
      });
    });
  } else {
    field.inputElement.addEventListener("focus", function () {
      setInteractionFlag(field);
    });
  }
}

collectTourForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let hasError = false;

  for (const key in fields) {
    const field = fields[key];

    if (!field.interacted) {
      showErrorMessage(field.errorMessageElement);
      hasError = true;
    }
  }

  if (!hasError) {
    this.reset();
  }
});

fields.name.inputElement.addEventListener("input", function () {
  const fieldset = this.closest(".form__group");
  const errorInput = fieldset.querySelector(".error-message");

  hiddenErrorMessage(errorInput);
});

fields.name.inputElement.addEventListener("blur", function () {
  const fieldset = this.closest(".form__group");
  const errorInput = fieldset.querySelector(".error-message");
  const pattern = /^[A-Za-zА-Яа-яЁё]+$/;

  if (!pattern.test(this.value)) {
    showErrorMessage(errorInput);
  } else {
    hiddenErrorMessage(errorInput);
  }
});

const dropdownButton = document.querySelector(".form__dropdown-button");
const dropdownContent = document.querySelector(".form__dropdown-content");
const items = dropdownContent.querySelectorAll(".form__dropdown-item");

const itemHeight = items[0].offsetHeight;
const itemCount = items.length;
let selectedValue = "";

dropdownButton.addEventListener("click", function (event) {
  event.preventDefault();
  dropdownContent.classList.toggle("show");
  dropdownButton.focus();

  if (itemCount > 4) {
    dropdownContent.style.maxHeight = `${itemHeight * 4}px`;
    dropdownContent.style.overflowY = "auto";
  } else {
    dropdownContent.style.maxHeight = "none";
    dropdownContent.style.overflowY = "visible";
  }
});

items.forEach((item) => {
  item.addEventListener("click", function () {
    selectedValue = this.dataset.value;
    dropdownButton.textContent = this.textContent;
    dropdownButton.style.color = "var(--black)";
    dropdownContent.classList.remove("show");

    const fieldset = dropdownButton.closest(".form__group");
    const errorInput = fieldset.querySelector(".error-message");
    hiddenErrorMessage(errorInput);
  });
});

window.addEventListener("click", function (event) {
  if (!event.target.matches(".form__dropdown-button")) {
    dropdownContent.classList.remove("show");
  }
});

dropdownButton.addEventListener("blur", function () {
  const fieldset = dropdownButton.closest(".form__group");
  const errorInput = fieldset.querySelector(".error-message");

  if (!selectedValue) {
    showErrorMessage(errorInput);
  } else {
    hiddenErrorMessage(errorInput);
  }
});

fields.email.inputElement.addEventListener("input", function () {
  const fieldset = this.closest(".form__group");
  const errorInput = fieldset.querySelector(".error-message");

  hiddenErrorMessage(errorInput);
});

fields.email.inputElement.addEventListener("blur", function () {
  const fieldset = this.closest(".form__group");
  const errorInput = fieldset.querySelector(".error-message");
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!pattern.test(this.value)) {
    showErrorMessage(errorInput);
  } else {
    hiddenErrorMessage(errorInput);
  }
});

fields.tel.inputElement.addEventListener("input", function () {
  const fieldset = this.closest(".form__group");
  const errorInput = fieldset.querySelector(".error-message");
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

  hiddenErrorMessage(errorInput);
});

fields.tel.inputElement.addEventListener("blur", function () {
  const fieldset = this.closest(".form__group");
  const errorInput = fieldset.querySelector(".error-message");
  let value = this.value.replace(/\D/g, "");

  if (value.length < 11) {
    showErrorMessage(errorInput);
  } else {
    hiddenErrorMessage(errorInput);
  }
});

const dateInputs = document.querySelectorAll(".form__input-date");

dateInputs.forEach(function (dateInput) {
  dateInput.addEventListener("input", function () {
    const fieldset = this.closest(".form__group");
    const errorInput = fieldset.querySelector(".error-message");
    let value = this.value.replace(/\D/g, "");

    if (value.length > 2) {
      value = value.slice(0, 2) + "." + value.slice(2);
    }
    if (value.length > 5) {
      value = value.slice(0, 5) + "." + value.slice(5, 9);
    }
    this.value = value;

    hiddenErrorMessage(errorInput);
  });
});

dateInputs.forEach(function (dateInput) {
  dateInput.addEventListener("blur", function () {
    const fieldset = this.closest(".form__group");
    const errorInput = fieldset.querySelector(".error-message");

    let value = this.value.replace(/\D/g, "");

    if (value.length < 8) {
      showErrorMessage(errorInput);
    } else {
      hiddenErrorMessage(errorInput);
    }
  });
});

const ageRadios = document.querySelectorAll('input[name="age"]');
ageRadios.forEach((radio) => {
  radio.addEventListener("change", function () {
    const fieldset = radio.closest("fieldset");
    const errorInput = fieldset.querySelector(".error-message");

    hiddenErrorMessage(errorInput);
  });
});

const containerCheckbox = document.querySelector(".form__container-checkbox");
const Checkbox = containerCheckbox.querySelector(
  'input[name="license-agreement"]'
);
const customCheckbox = containerCheckbox.querySelector(
  ".form__custom-checkbox"
);
const errorInput = containerCheckbox.querySelector(".error-message");

Checkbox.addEventListener("change", function () {
  if (Checkbox.checked) {
    customCheckbox.classList.add("checked");
  } else {
    customCheckbox.classList.remove("checked");
  }
});

customCheckbox.addEventListener("click", function (event) {
  event.preventDefault();

  Checkbox.checked = !Checkbox.checked;

  Checkbox.dispatchEvent(new Event("change"));
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
