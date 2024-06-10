import { fetchPosts } from "./modules/fetchPosts.js";
import { userView } from "./modules/user-view.js";
import { activeFavTheme } from "./modules/darkmode.js";
import { handleLoginLink, handleRegisterLink } from "./modules/authLinks.js";

function init() {
  activeFavTheme();
  fetchPosts();
  userView();
}

window.onload = init();

document.getElementById('loginLink').onclick = handleLoginLink;
document.getElementById('registerLink').onclick = handleRegisterLink;