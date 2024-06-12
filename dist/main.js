import { fetchPosts } from "./modules/fetchPosts.js";
import { userView } from "./modules/user-view.js";
import { activeFavTheme } from "./modules/darkmode.js";
import { handleLoginLink, handleRegisterLink } from "./modules/authLinks.js";
import { infiniteScroll } from "./modules/infiniteScroll.js";

function init() {
  activeFavTheme();
  fetchPosts(1);
  
  if (localStorage.getItem('profile')) userView();
  else {
    document.getElementById('loginLink').onclick = handleLoginLink;
    document.getElementById('registerLink').onclick = handleRegisterLink;
  }

  window.addEventListener('scroll', infiniteScroll);
}

// console.log(window.)

window.onload = init();
