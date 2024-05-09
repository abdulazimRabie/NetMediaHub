let lightBtn = document.getElementById("lightBtn");
let darkBtn = document.getElementById("darkBtn");
let systemBtn = document.getElementById("systemBtn");

function enableDarkMode() {
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
}

function enableLightMode() {
  document.documentElement.classList.remove("dark");
  localStorage.setItem("theme", "theme");
}

function enableSystemMode() {
  console.log(window.matchMedia("(prefers-color-scheme: dark)").matches);
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) enableDarkMode();
  else enableLightMode();
}

lightBtn.addEventListener("click", enableLightMode);
darkBtn.addEventListener("click", enableDarkMode);
systemBtn.addEventListener("click", enableSystemMode);

window.onload = () => {
  if (localStorage.getItem("theme") === "dark") enableDarkMode();
  else enableLightMode();
}

console.log('hi boddy');