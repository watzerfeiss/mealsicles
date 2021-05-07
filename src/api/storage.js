const STORAGE_NAMESPACE = "mealsicles";

function getEntries() {
  return JSON.parse(localStorage.getItem(STORAGE_NAMESPACE) || "{}");
}

function setEntries(entries) {
  localStorage.setItem(STORAGE_NAMESPACE, JSON.stringify(entries));
}

export function setItem(key, item) {
  const entries = getEntries();
  entries[key] = item;
  setEntries(entries);
}

export function getItem(key) {
  return getEntries()[key];
}

export function removeItem(key) {
  const entries = getEntries();
  delete entries[key];
  setEntries(entries);
}
