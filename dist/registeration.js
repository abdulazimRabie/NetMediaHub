const loginBtn = document.getElementById('login');
const registerBtn = document.getElementById('register');
const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const submitBtn = document.querySelector('button[type="submit"]');

const baseUrl = 'https://tarmeezacademy.com/api/v1';

function enableLogin() {
  localStorage.setItem('registeration', 'login');
  const submitBtn = document.querySelector('button[type="submit"]');

  loginBtn.classList.add('bg-gray-50', 'dark:bg-gray-800');
  registerBtn.classList.remove('bg-gray-50', 'dark:bg-gray-800');

  submitBtn.textContent = 'Login';
  submitBtn.setAttribute('data-type', 'login');

  const nameInput = document.getElementById('name');
  if (nameInput) nameInput.parentElement.remove();
}

function enableRegister() {
  localStorage.setItem('registeration', 'resister');

  const submitBtn = document.querySelector('button[type="submit"]');
  registerBtn.classList.add('bg-gray-50', 'dark:bg-gray-800');
  loginBtn.classList.remove('bg-gray-50', 'dark:bg-gray-800');

  submitBtn.textContent = 'Register';
  submitBtn.setAttribute('data-type', 'register');

  const nameIput = `
  <div class="mb-5">
    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
    <input type="text" id="name"
      class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="name" required />
  </div>
  `;

  form.insertAdjacentHTML('afterbegin', nameIput);
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

  axios
    .post(url, params)
    .then(response => loginSuccess(response))
    .catch(error => loginFail(error.message));
};

function registerBtnClicked() {
  localStorage.removeItem('registeration');

  const name = document.getElementById('name');

  const url = `${baseUrl}/register`;
  
  const params = {
    "name" : name.value,
    "username" : username.value,
    "password" : password.value
  }

  console.log(params);

  axios
    .post(url, params)
    .then(response => loginSuccess(response))
    .catch(error => loginFail(error.response.data.message))
};

function preventForm() {

  form.addEventListener('submit', function(event) {
    event.preventDefault();
  });
}

function init() {
  if (localStorage.getItem('registeration') == 'login')
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

window.onload = init();