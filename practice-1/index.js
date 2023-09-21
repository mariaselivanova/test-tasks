const mainBtn = document.querySelector(".btn");
const closeBtn = document.querySelector(".btn_type_close");

const modal = document.querySelector(".modal");
const logoInput = document.querySelector(".form__input_type_logo");

const chooseFileIcon = document.getElementById("choose-file-icon");
const chooseFileCaption = document.querySelector(".form__caption");
const chooseFilePhoto = document.querySelector(".form__wrapper_type_logo");
const removeChosenFileBtn = document.querySelector(".form__icon-wrapper");

const logoDefaultPhoto = document.querySelector(".form__wrapper_type_logo");
const fileInput = document.getElementById("logo");
const partnerForm = document.getElementById("become-partner");
const submitBtn = partnerForm.querySelector(".form__btn");

const openModal = () => {
  modal.classList.add("modal_opened");
  document.body.classList.add("modal-open");
};

const closeModal = () => {
  modal.classList.remove("modal_opened");
  document.body.classList.remove("modal-open");
};

const handleFormSubmit = () => {
  console.log("You are awesome!");
  closeModal();
};

const displaySelectedImage = (input) => {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      logoDefaultPhoto.style.backgroundImage = `url(${e.target.result})`;
    };
    reader.readAsDataURL(file);
  } else {
    logoDefaultPhoto.style.backgroundImage = "url('./assets/man.jpg')";
  }
};

const removeSelectedImage = () => {
  fileInput.value = "";
  checkValidity({ target: fileInput });
  logoDefaultPhoto.style.backgroundImage = "url('./assets/man.jpg')";
};

const checkValidity = (event) => {
  const formNode = event.target.form;
  const isValid = formNode.checkValidity();

  submitBtn.disabled = !isValid;

  if (!isValid) {
    submitBtn.classList.add("btn_inactive");
  } else {
    submitBtn.classList.remove("btn_inactive");
  }
};

const vkInput = document.getElementById("vk");
const vkPattern = /^vk\.com\/[a-zA-Z0-9-_]+$/;

vkInput.addEventListener("input", () => {
  const inputValue = vkInput.value;
  const isValid = vkPattern.test(inputValue);

  if (!isValid) {
    vkInput.setCustomValidity("Введите ссылку в формате vk.com/username");
  } else {
    vkInput.setCustomValidity("");
  }
  vkInput.reportValidity();
});

// Input validity check and form submit

chooseFileIcon.addEventListener("click", () => {
  fileInput.click();
});
chooseFileCaption.addEventListener("click", () => {
  fileInput.click();
});
chooseFilePhoto.addEventListener("click", () => {
  fileInput.click();
});
removeChosenFileBtn.addEventListener("click", removeSelectedImage);
logoInput.addEventListener("change", () => {
  displaySelectedImage(logoInput);
});
partnerForm.addEventListener("submit", handleFormSubmit);
partnerForm.addEventListener("input", checkValidity);

// Open/close modal

mainBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});
