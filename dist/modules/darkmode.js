let lightBtn = document.getElementById("lightBtn");
let darkBtn = document.getElementById("darkBtn");
let systemBtn = document.getElementById("systemBtn");

function enableDarkMode() {
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
}

function enableLightMode() {
  document.documentElement.classList.remove("dark");
  localStorage.setItem("theme", "light");
}

function enableSystemMode() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) enableDarkMode();
  else enableLightMode();
}

lightBtn.addEventListener("click", enableLightMode);
darkBtn.addEventListener("click", enableDarkMode);
systemBtn.addEventListener("click", enableSystemMode);


export function activeFavTheme() {
  if (localStorage.getItem("theme") === "dark") {
    console.log("dark enabled by default");
    enableDarkMode();
  }
  else {
    console.log("light enabled by default");
    enableLightMode();
  }
}

console.log('hi boddy');