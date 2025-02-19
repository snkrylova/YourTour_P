"use strict";

const NAME_PATTERN = /^[A-Za-zА-Яа-яЁё]+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const collectTourForm = document.querySelector(".collect-tour__form");

const fields = {
  name: {
    inputElement: document.querySelector(".form__name"),
    errorMessageElement: null,
    interacted: false,
    error: false,
  },
  tour: {
    inputElement: document.querySelector(".form__custom-select"),
    dropdownButton: document.querySelector(".form__dropdown-button"),
    dropdownButtonPlaceholder: "Куда хотите ехать",
    dropdownContent: document.querySelector(".form__dropdown-content"),
    items: document.querySelectorAll(".form__dropdown-item"),
    errorMessageElement: null,
    interacted: false,
    error: false,
  },
  email: {
    inputElement: document.querySelector(".form__email"),
    errorMessageElement: null,
    interacted: false,
    error: false,
  },
  tel: {
    inputElement: document.querySelector(".form__tel"),
    errorMessageElement: null,
    interacted: false,
    error: false,
  },
  startDate: {
    inputElement: document.querySelector(".form__input-date_start"),
    errorMessageElement: null,
    interacted: false,
    error: false,
  },
  endDate: {
    inputElement: document.querySelector(".form__input-date_end"),
    errorMessageElement: null,
    interacted: false,
    error: false,
  },
  age: {
    inputElement: Array.from(document.querySelectorAll(".form__radio-input")),
    errorMessageElement: null,
    interacted: false,
    error: false,
  },
  licenseAgreement: {
    inputElement: document.querySelector(".form__checkbox-input"),
    customCheckbox: document.querySelector(".form__custom-checkbox"),
    errorMessageElement: null,
    interacted: false,
    error: false,
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

for (const key in fields) {
  const field = fields[key];

  if (Array.isArray(field.inputElement)) {
    field.inputElement.forEach((radio) => {
      radio.addEventListener("focus", function () {
        interactFlag(field);
      });
    });
  } else {
    field.inputElement.addEventListener("focus", function () {
      interactFlag(field);
    });
  }
}

function showErrorMessage(errorInput) {
  errorInput.classList.add("visible");
}

function hiddenErrorMessage(errorInput) {
  errorInput.classList.remove("visible");
}

function interactFlag(field) {
  field.interacted = true;
}

function validatePattern(inputElement, inputValue, pattern) {
  if (pattern.test(inputValue)) {
    inputElement.error = false;
    hiddenErrorMessage(inputElement.errorMessageElement);
  } else {
    inputElement.error = true;
    showErrorMessage(inputElement.errorMessageElement);
  }
}

function formatDate(inputValue) {
  let value = inputValue.replace(/\D/g, "");

  if (value.length > 2) {
    value = value.slice(0, 2) + "." + value.slice(2);
  }
  if (value.length > 5) {
    value = value.slice(0, 5) + "." + value.slice(5, 9);
  }
  return value;
}

collectTourForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let hasError = false;

  for (const key in fields) {
    const field = fields[key];

    if (!field.interacted || field.error) {
      showErrorMessage(field.errorMessageElement);
      hasError = true;
    }
  }

  if (!hasError) {
    // заглушка, пока нет ссылки на обработчик формы
    resetCustomElement();
    this.reset();
  }
});

function resetCustomElement() {
  fields.tour.dropdownButton.classList.remove("active");
  fields.tour.dropdownButton.textContent =
    fields.tour.dropdownButtonPlaceholder;

  fields.licenseAgreement.customCheckbox.classList.remove("checked");
}

collectTourForm.addEventListener("reset", function () {
  for (const key in fields) {
    const field = fields[key];

    hiddenErrorMessage(field.errorMessageElement);
  }

  resetCustomElement();
  this.reset();
});

fields.name.inputElement.addEventListener("input", function () {
  fields.name.error = false;
  hiddenErrorMessage(fields.name.errorMessageElement);
});

fields.name.inputElement.addEventListener("blur", function () {
  validatePattern(fields.name, this.value, NAME_PATTERN);
});

const itemHeight = fields.tour.items[0].offsetHeight;
const itemCount = fields.tour.items.length;
let selectedValue = "";

fields.tour.dropdownButton.addEventListener("click", function (event) {
  event.preventDefault();

  if (!fields.tour.dropdownContent.classList.contains("show")) {
    fields.tour.dropdownContent.classList.add("show");
  } else {
    fields.tour.dropdownContent.classList.remove("show");
  }
});

fields.tour.items.forEach((item) => {
  item.addEventListener("click", function () {
    selectedValue = this.dataset.value;
    fields.tour.dropdownButton.textContent = this.textContent;
    fields.tour.dropdownButton.classList.add("active");
    fields.tour.dropdownContent.classList.remove("show");

    interactFlag(fields.tour);
    fields.tour.error = false;
    hiddenErrorMessage(fields.tour.errorMessageElement);
  });
});

fields.tour.dropdownButton.addEventListener("blur", function () {
  if (!fields.tour.dropdownContent.matches(":hover")) {
    fields.tour.dropdownContent.classList.remove("show");
  }

  if (!selectedValue) {
    fields.tour.error = true;
    showErrorMessage(fields.tour.errorMessageElement);
  } else {
    fields.tour.error = false;
    hiddenErrorMessage(fields.tour.errorMessageElement);
  }
});

fields.email.inputElement.addEventListener("input", function () {
  fields.email.error = false;
  hiddenErrorMessage(fields.email.errorMessageElement);
});

fields.email.inputElement.addEventListener("blur", function () {
  validatePattern(fields.email, this.value, EMAIL_PATTERN);
});

fields.tel.inputElement.addEventListener("input", function () {
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

  fields.tel.error = false;
  hiddenErrorMessage(fields.tel.errorMessageElement);
});

fields.tel.inputElement.addEventListener("blur", function () {
  let value = this.value.replace(/\D/g, "");

  if (value.length < 11) {
    fields.tel.error = true;
    showErrorMessage(fields.tel.errorMessageElement);
  } else {
    fields.tel.error = false;
    hiddenErrorMessage(fields.tel.errorMessageElement);
  }
});

const dateInputs = [fields.startDate.inputElement, fields.endDate.inputElement];

dateInputs.forEach(function (dateInput) {
  dateInput.addEventListener("input", function () {
    const fieldKey = this.dataset.field;

    this.value = formatDate(this.value);

    fields[fieldKey].error = false;
    hiddenErrorMessage(fields[fieldKey].errorMessageElement);
  });
});

dateInputs.forEach(function (dateInput) {
  dateInput.addEventListener("blur", function () {
    const fieldKey = this.dataset.field;
    let value = this.value.replace(/\D/g, "");

    if (value.length < 8) {
      fields[fieldKey].error = true;
      showErrorMessage(fields[fieldKey].errorMessageElement);
    } else {
      fields[fieldKey].error = false;
      hiddenErrorMessage(fields[fieldKey].errorMessageElement);
    }
  });
});

fields.age.inputElement.forEach((radio) => {
  radio.addEventListener("change", function () {
    fields.age.error = false;
    hiddenErrorMessage(fields.age.errorMessageElement);
  });
});

fields.licenseAgreement.inputElement.addEventListener("change", function () {
  fields.licenseAgreement.customCheckbox.classList.toggle(
    "checked",
    fields.licenseAgreement.inputElement.checked
  );
  fields.licenseAgreement.interacted = this.checked;

  if (fields.licenseAgreement.interacted) {
    fields.licenseAgreement.error = false;
    hiddenErrorMessage(fields.licenseAgreement.errorMessageElement);
  }
});

fields.licenseAgreement.customCheckbox.addEventListener(
  "click",
  function (event) {
    event.preventDefault();

    fields.licenseAgreement.inputElement.checked =
      !fields.licenseAgreement.inputElement.checked;

    fields.licenseAgreement.inputElement.dispatchEvent(new Event("change"));
  }
);
