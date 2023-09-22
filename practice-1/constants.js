export const requiredInputs = [
  { id: "name", pattern: /^[a-zA-Zа-яА-Я]+$/ },
  { id: "tel", pattern: /^\+\d{1,3}\s\d{3}\s\d{3}-\d{2}-\d{2}$/ },
  { id: "email", pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/ },
];

export const optionalInputs = [
  { id: "website", pattern: /^[a-zA-Z0-9-]+\.[a-z]{2,}$/ },
  { id: "vk", pattern: /^vk\.com\/[a-zA-Z0-9-_]+$/ },
  { id: "ok", pattern: /^ok\.com\/[a-zA-Z0-9-_]+$/ },
  { id: "facebook", pattern: /^facebook\.com\/[a-zA-Z0-9-_]+$/ },
  { id: "instagram", pattern: /^instagram\.com\/[a-zA-Z0-9-_]+$/ },
  { id: "youtube", pattern: /^youtube\.com\/[a-zA-Z0-9-_]+$/ },
  { id: "ceo", pattern: /^[a-zA-Zа-яА-Я]+$/ },
];

export const VALIDITY_MESSAGE = "Введите данные в заданном формате";

export const DEFAULT_PHOTO_URL = "url('./assets/man.jpg')";
