import { fetchPosts } from "../modules/fetchPosts.js";
import { userView } from "../modules/user-view.js";
import { activeFavTheme } from "../modules/darkmode.js";
import { handleLoginLink, handleRegisterLink } from "../modules/authLinks.js";
import { infiniteScroll } from "../modules/infiniteScroll.js";
import { enableUsersProfiles } from "../modules/usersProfiles.js";

async function init() {
  activeFavTheme();
  await fetchPosts(1);
  
  if (localStorage.getItem('profile')) userView();
  else {
    document.getElementById('loginLink').onclick = handleLoginLink;
    document.getElementById('registerLink').onclick = handleRegisterLink;
  }

  enableUsersProfiles()

  window.addEventListener('scroll', infiniteScroll);
}

// console.log(window.)

window.onload = init();
