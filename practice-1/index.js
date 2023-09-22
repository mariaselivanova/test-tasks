const select = (selector) => document.querySelector(selector);
const addClass = (element, className) => element.classList.add(className);
const removeClass = (element, className) => element.classList.remove(className);
const toggleClass = (element, className) => element.classList.toggle(className);

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

const requiredInputs = [
  { id: "name", pattern: /^[a-zA-Zа-яА-Я]+$/ },
  { id: "tel", pattern: /^\+\d{1,3}\s\d{3}\s\d{3}-\d{2}-\d{2}$/ },
  { id: "email", pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/ },
];

const optionalInputs = [
  { id: "website", pattern: /^[a-zA-Z0-9-]+\.[a-z]{2,}$/ },
  { id: "vk", pattern: /^vk\.com\/[a-zA-Z0-9-_]+$/ },
  { id: "ok", pattern: /^ok\.com\/[a-zA-Z0-9-_]+$/ },
  { id: "facebook", pattern: /^facebook\.com\/[a-zA-Z0-9-_]+$/ },
  { id: "instagram", pattern: /^instagram\.com\/[a-zA-Z0-9-_]+$/ },
  { id: "youtube", pattern: /^youtube\.com\/[a-zA-Z0-9-_]+$/ },
  { id: "ceo", pattern: /^[a-zA-Zа-яА-Я]+$/ },
];

const VALIDITY_MESSAGE = "Введите данные в заданном формате";

const openModal = () => addClass(modal, "modal_opened");
const closeModal = () => removeClass(modal, "modal_opened");
const toggleModal = () => toggleClass(modal, "modal_opened");
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
mainBtn.addEventListener("click", toggleModal);
closeBtn.addEventListener("click", toggleModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    toggleModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    toggleModal();
  }
});
