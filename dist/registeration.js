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

  axios
    .post(url, params)
    .then(response => loginSuccess(response))
    .catch(error => loginFail(error.message));
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

  axios
    .post(url, formdata, {
      headers : headers
    })
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