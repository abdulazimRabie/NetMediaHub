const loginBtn = document.getElementById('login');
const registerBtn = document.getElementById('register');
const submitBtn = document.querySelector('button[type="submit"]');

const baseUrl = 'https://tarmeezacademy.com/api/v1';

function enableLogin() {
  const submitBtn = document.querySelector('button[type="submit"]');
  loginBtn.classList.add('bg-gray-50');
  registerBtn.classList.remove('bg-gray-50');
  submitBtn.textContent = 'Login';
  submitBtn.setAttribute('data-type', 'login');
}

function enableRegister() {
  const submitBtn = document.querySelector('button[type="submit"]');
  registerBtn.classList.add('bg-gray-50');
  loginBtn.classList.remove('bg-gray-50');
  submitBtn.textContent = 'Register';
  submitBtn.setAttribute('data-type', 'register');
}

function enableTheme() {
  if (localStorage.getItem('theme') === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function loginBtnClicked() {
  console.log("login clicked");
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const url = `${baseUrl}/login`;
  const params = {
    "username" : username,
    "password" : password
  }

  function showError(error) {
    const msgElement = document.getElementById('msg');
    msgElement.classList.remove('text-green-500');
    msgElement.classList.add('text-red-500');
    msgElement.textContent = error;  
    }
    
    function showSucces() {
      const msgElement = document.getElementById('msg');
      msgElement.classList.add('text-green-500');
      msgElement.classList.remove('text-red-500');
      msgElement.textContent = "you will be directed to home page";
    }

  axios
    .post(url, params)
    .then(response => showSucces())
    .catch(error => showError(error.message));
};

function registeBtnClicked() {};

function preventForm() {
  const form = document.getElementById('form');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
  });
}

function init() {
  enableLogin();
  enableTheme();
  preventForm();

  loginBtn.addEventListener('click', enableLogin);
  registerBtn.addEventListener('click', enableRegister);

  submitBtn.addEventListener('click', function() {
    console.log('submit clicked')

    if (submitBtn.getAttribute('data-type')  == 'login') loginBtnClicked();
  })
}

window.onload = init();