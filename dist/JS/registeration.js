import { toggleSpinner } from "../modules/toggleLoader.js";

const loginBtn = document.getElementById('login');
const registerBtn = document.getElementById('register');

const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const submitBtn = document.querySelector('button[type="submit"]');

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

function enableLogin() {
  localStorage.setItem('registeration', 'login');
  const submitBtn = document.querySelector('button[type="submit"]');

  loginBtn.classList.add('bg-gray-50', 'dark:bg-gray-800');
  registerBtn.classList.remove('bg-gray-50', 'dark:bg-gray-800');

  submitBtn.textContent = 'Login';
  submitBtn.setAttribute('data-type', 'login');

  addSpinner(submitBtn);

  if (localStorage.getItem('registeration') == 'login') {
    if (document.getElementById('name')) {
      document.getElementById('name').parentElement.remove();
      document.getElementById('email').parentElement.remove();
      document.getElementById('imageUploadWrapper').remove();
    }
  }
}

function enableRegister() {
  localStorage.setItem('registeration', 'resister');

  const submitBtn = document.querySelector('button[type="submit"]');

  registerBtn.classList.add('bg-gray-50', 'dark:bg-gray-800');
  loginBtn.classList.remove('bg-gray-50', 'dark:bg-gray-800');

  submitBtn.textContent = 'Register';
  submitBtn.setAttribute('data-type', 'register');

  addSpinner(submitBtn);

  const nameInput = `
  <div class="mb-5">
    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
    <input type="text" id="name"
      class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="name" required />
  </div>
  `;

  const emailInput = `
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
    <input type="text" id="email"
      class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="email" required />
  </div>
  `;

  const imageInput = `
  <div id="imageUploadWrapper">
    <label for="inputImageProfile" id="lableImageProfile"
      class="flex justify-center items-center w-40 h-40 gap-1 bg-cover bg-gray-700 hover:bg-gray-700 text-white text-base outline-none rounded-full cursor-pointer mx-auto font-[sans-serif]">
      <svg class=" w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
        <path fill-rule="evenodd"
          d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z"
          clip-rule="evenodd" />
      </svg>
    </label>
    <input type="file" id='inputImageProfile' accept="image/*" class="hidden" />
  </div>
  `

  form.insertAdjacentHTML('afterbegin', emailInput);
  form.insertAdjacentHTML('afterbegin', nameInput);
  form.insertAdjacentHTML('afterbegin', imageInput);
  console.log(document.getElementById('lableImageProfile'));
  document.getElementById('inputImageProfile')
  .addEventListener('change', uploadImagePorofile)
}

function enableTheme() {
  if (localStorage.getItem('theme') === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
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
  localStorage.removeItem('registeration');

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

function registerBtnClicked() {
  localStorage.removeItem('registeration');

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const image = document.getElementById('inputImageProfile').files[0];

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
};

function preventForm() {
  form.addEventListener('submit', function(event) {
    event.preventDefault();
  });
}

function init() {
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type');
  if (type == 'login')
    enableLogin();
  else
    enableRegister();

  enableTheme();
  preventForm();

  loginBtn.addEventListener('click', enableLogin);
  registerBtn.addEventListener('click', enableRegister);

  submitBtn.addEventListener('click', function() {
    console.log('submit clicked')

    if (submitBtn.getAttribute('data-type')  == 'login') loginBtnClicked();
    else registerBtnClicked();
  })
}

function uploadImagePorofile() {
  console.log('update image profile function');
  const inputImage = document.getElementById('inputImageProfile');
  const lableImage = document.getElementById('lableImageProfile');
  const url = URL.createObjectURL(inputImage.files[0]);
  console.log(url);

  const imgHTML = `
  <img src='${url}' class='w-full h-full rounded-full'></img>
  `

  lableImage.innerHTML = '';
  lableImage.innerHTML = imgHTML;
}

window.onload = init();