import { toggleSpinner } from "../modules/toggleLoader.js";
import { activeFavTheme } from "../modules/darkmode.js";

const loginBtn = document.getElementById('login');
const registerBtn = document.getElementById('register');

const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const submitRegister = document.querySelector('button[data-type="register"]');
const submitLogin = document.querySelector('button[data-type="login"]');

const nameInputWrapper = document.getElementById('nameInputWrapper');
const emailInputWrapper = document.getElementById('emailInputWrapper');
const imageUploadWrapper = document.getElementById('imageUploadWrapper');

let imageAvatar = null;
const baseUrl = 'https://tarmeezacademy.com/api/v1';

function addSpinner(element) {
  const spinner = `
  <div role="status" id="spinner" 
  class="hidden justify-center items-center px-2 pt-1">
    <svg aria-hidden="true"
      class="inline w-4 h-4 md:w-10 md-h-10 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
      viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor" />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill" />
    </svg>
    <span class="sr-only">Loading...</span>
  </div>`;

  element.insertAdjacentHTML('beforeend', spinner);
}

function removeSpinner() {
  const spinner = document.getElementById('spinner')
  if(spinner) spinner.remove();
}

function activeLoginBtn() {
  loginBtn.classList.add('bg-gray-50', 'dark:bg-[#111824]');
  registerBtn.classList.remove('bg-gray-50', 'dark:bg-[#111824]');
}

function activeRegisterBtn() {
  registerBtn.classList.add('bg-gray-50', 'dark:bg-[#111824]');
  loginBtn.classList.remove('bg-gray-50', 'dark:bg-[#111824]');
}

function hideImageNameEmail() {
  nameInputWrapper.classList.add('hidden');
  emailInputWrapper.classList.add('hidden');
  imageUploadWrapper.classList.add('hidden');
}

function showImageNameEmail() {
  nameInputWrapper.classList.remove('hidden');
  emailInputWrapper.classList.remove('hidden');
  imageUploadWrapper.classList.remove('hidden');
}

function loginMode() {
  // 2. active login button
  // 3. show submit login
  // 4. hide submit register
  // 5. add spinner to submitLogin - remove it from submitRegister
  // 6. hide name , email , image
  activeLoginBtn();
  hideImageNameEmail();

  submitLogin.classList.remove('hidden');
  submitRegister.classList.add('hidden');

  removeSpinner();
  addSpinner(submitLogin);
}

function registerMode() {
  // active register button 
  // show submit register
  // hide submit login
  // add spinner to register , remove spinner from login
  // show name , email , image

  activeRegisterBtn();
  submitRegister.classList.remove('hidden');
  submitLogin.classList.add('hidden');

  removeSpinner();
  addSpinner(submitRegister);

  showImageNameEmail();

  document.getElementById('inputImageProfile')
  .addEventListener('change', uploadImagePorofile)
}

function loginFail(error) {
  const msgElement = document.getElementById('msg');
  msgElement.classList.remove('text-green-500');
  msgElement.classList.add('text-red-500');
  msgElement.textContent = error;  
}
  
function loginSuccess(response) {
  let profileInfo = response.data.user;
  localStorage.setItem('profile', JSON.stringify(profileInfo));
  localStorage.setItem('token', response.data.token);

  const msgElement = document.getElementById('msg');
  msgElement.classList.add('text-green-500');
  msgElement.classList.remove('text-red-500');
  msgElement.textContent = "you will be directed to home page";

  window.location.href = './home.html';
}

function loginBtnClicked() {
  console.log("login clicked");

  const url = `${baseUrl}/login`;
  const params = {
    "username" : username.value,
    "password" : password.value
  }

  toggleSpinner();
  axios
    .post(url, params)
    .then(response => loginSuccess(response))
    .catch(error => loginFail(error.message))
    .finally(_ => toggleSpinner());
};

async function blob() {
  const response = await fetch(imageAvatar);
  const blobImage = response.blob();
  console.log( 'blob image is here : ', blobImage);
  return blobImage;
}

async function registerBtnClicked() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  let image = document.getElementById('inputImageProfile').files[0];

  if (imageAvatar) { // imageAvatar == null
    image = await blob();
  }

  const url = `${baseUrl}/register`;


  let formdata = new FormData();
  formdata.append('username', username.value);
  formdata.append('password', password.value);
  formdata.append('name', name);
  formdata.append('image', image);
  formdata.append('email', email);

  const headers = {
    'Content-Type': 'multipart/form-data',
  }

  toggleSpinner();
  axios
    .post(url, formdata, {
      headers : headers
    })
    .then(response => loginSuccess(response))
    .catch(error => loginFail(error.response.data.message))
    .finally(_ => toggleSpinner());
}

function showPassword() {
  const checkbox = document.getElementById('showPassword');
  checkbox.onclick = function () {
    const x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
}

function preventForm() {
  form.addEventListener('submit', function(event) {
    event.preventDefault();
  });
}

function uploadImagePorofile() {
  const inputImage = document.getElementById('inputImageProfile');
  const url = URL.createObjectURL(inputImage.files[0]);
  updateImagePorfile(url);
  imageAvatar = null;
}

function imageAvatarOptions() {
  const imageAvatarOptions = document.querySelectorAll('.image-avatar');
  imageAvatarOptions.forEach(imageAvatarOption => {
    imageAvatarOption.onclick = function () {
      const url = imageAvatarOption.querySelector('img').getAttribute('src');
      imageAvatar = url;
      updateImagePorfile(url);
    }
  })
}

function updateImagePorfile(url) {
  const lableImage = document.getElementById('lableImageProfile');
  const imgHTML = `
  <img src='${url}' class='w-full h-full rounded-full'></img>
  `
  
  lableImage.innerHTML = '';
  lableImage.innerHTML = imgHTML;
}

function init() {
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type');
  if (type == 'login')
    loginMode();
  else
    registerMode();

  activeFavTheme();
  imageAvatarOptions();
  showPassword();
  preventForm();

  loginBtn.addEventListener('click', loginMode);
  registerBtn.addEventListener('click', registerMode);

  submitRegister.addEventListener('click', registerBtnClicked);
  submitLogin.addEventListener('click', loginBtnClicked);
}

window.onload = init();