import { activeFavTheme } from "../modules/darkmode.js";
import { showPosts } from "../modules/showPosts.js";
import { integrateLogoutBtn, userView } from "../modules/user-view.js";
import { intergrateProfileAvatar } from "../modules/user-view.js";
import { commentsAction } from "../modules/user-view.js";
import { toggleSpinner } from "../modules/toggleLoader.js";
import { toggleErrorMsg } from "../modules/toggleErrorMsg.js";
import { activeFilter } from "../modules/filter.js";

// extracting user id from url
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId')

const baseUrl = `https://tarmeezacademy.com/api/v1`;

function fetchUser() {
  const url = `${baseUrl}/users/${userId}`;
  return new Promise((resolve, reject) => {
    toggleSpinner();

    axios
    .get(url)
    .then(response => {
      fillProfileInfo(response.data.data);
      resolve();
    })
    .catch(error => {
      console.log(error);
      toggleErrorMsg();
      reject();
    })
    .finally(_ => toggleSpinner());
  })
}

function fillProfileInfo(userInfo) {
  const profileImage = document.getElementById('profile-image');
  const profileName = document.getElementById('profile-name');
  const profileUsername = document.getElementById('profile-username');
  const profileEmail = document.getElementById('user-email');
  const postsNumber = document.getElementById('posts-number');
  const commmentsNumber = document.getElementById('comments-number');

  profileImage.setAttribute('src', userInfo.profile_image);
  profileName.textContent = userInfo.name;
  profileUsername.textContent = userInfo.username;
  profileEmail.textContent = userInfo.email;
  postsNumber.textContent = userInfo.posts_count;
  commmentsNumber.textContent = userInfo.comments_count;
}

function fetchUserPosts() {
  const url = `${baseUrl}/users/${userId}/posts`;
  return new Promise((resolve, reject) => {
    axios
    .get(url)
    .then(response => {
      console.log(response);
      showPosts(response.data.data.reverse());
      resolve();
    })
    .catch(error => {
      console.log(error);
      reject();
    })
  })
}

function isAUser() {
  let profile = localStorage.getItem('profile');
  if (profile) return JSON.parse(profile);
  return false;
}

function isCurrUser() {
  const user = isAUser();
  if (user) {
    if (userId == user.id) return true;
  }
  return false;
}

async function init() {
  activeFavTheme();
  activeFilter();
  await fetchUser();
  await fetchUserPosts();


  if (isCurrUser()) userView();
  else if (isAUser()) {
    intergrateProfileAvatar(JSON.stringify(isAUser()));
    integrateLogoutBtn();
    commentsAction();
  }
}

init();