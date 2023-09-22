import {
  requiredInputs,
  optionalInputs,
  VALIDITY_MESSAGE,
} from "./constants.js";

const select = (selector) => document.querySelector(selector);
const addClass = (element, className) => element.classList.add(className);
const removeClass = (element, className) => element.classList.remove(className);

const mainBtn = select(".btn");
const closeBtn = select(".btn_type_close");
const modal = select(".modal");
const logoInput = select(".form__input_type_logo");
const submitBtn = select(".form__btn");
const chooseFileCaption = select(".form__caption");
const chooseFilePhoto = select(".form__wrapper_type_logo");
const removeChosenFileBtn = select(".form__icon-wrapper");
const logoDefaultPhoto = select(".form__wrapper_type_logo");

const fileInput = select("#logo");
const partnerForm = select("#become-partner");
const chooseFileIcon = select("#choose-file-icon");

const openModal = () => addClass(modal, "modal_opened");
const closeModal = () => removeClass(modal, "modal_opened");
const triggerFileInput = () => fileInput.click();

// Add/remove logo input

const displaySelectedImage = (input) => {
  const file = input.files[0];
  const backgroundImage = file
    ? `url(${URL.createObjectURL(file)})`
    : "url('./assets/man.jpg')";
  logoDefaultPhoto.style.backgroundImage = backgroundImage;

  if (fileInput.currentImageURL) {
    URL.revokeObjectURL(fileInput.currentImageURL);
  }

  fileInput.currentImageURL = file ? URL.createObjectURL(file) : null;
};

const removeSelectedImage = () => {
  fileInput.value = "";
  checkValidity();
  logoDefaultPhoto.style.backgroundImage = "url('./assets/man.jpg')";

  if (fileInput.currentImageURL) {
    URL.revokeObjectURL(fileInput.currentImageURL);
    fileInput.currentImageURL = null;
  }
};

// Validation/form submit

const checkInputs = (inputInfo, callback) => {
  const inputElement = select(`#${inputInfo.id}`);
  inputElement.addEventListener("input", () => {
    const value = inputElement.value;
    const isValid = inputInfo.pattern.test(value);
    inputElement.setCustomValidity(callback(isValid, value));
    inputElement.reportValidity();
  });
};

const checkRequiredInputs = (isValid) => {
  return isValid ? "" : VALIDITY_MESSAGE;
};

const checkOptionalInputs = (isValid, value) => {
  return isValid || !value ? "" : VALIDITY_MESSAGE;
};

requiredInputs.forEach((inputInfo) =>
  checkInputs(inputInfo, checkRequiredInputs)
);

optionalInputs.forEach((inputInfo) =>
  checkInputs(inputInfo, checkOptionalInputs)
);

const handleFormSubmit = (e) => {
  e.preventDefault();
  console.log("You are awesome!");
  closeModal();
};

const checkValidity = () => {
  const isValid = partnerForm.checkValidity();
  submitBtn.disabled = !isValid;

  if (!isValid) {
    addClass(submitBtn, "btn_inactive");
  } else {
    removeClass(submitBtn, "btn_inactive");
  }
};

// Listeners

[chooseFileIcon, chooseFileCaption, chooseFilePhoto].forEach((element) =>
  element.addEventListener("click", triggerFileInput)
);
removeChosenFileBtn.addEventListener("click", removeSelectedImage);
logoInput.addEventListener("change", () => displaySelectedImage(logoInput));
partnerForm.addEventListener("submit", handleFormSubmit);
partnerForm.addEventListener("input", checkValidity);
mainBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});
