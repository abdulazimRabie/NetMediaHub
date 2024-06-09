// https://tarmeezacademy.com/api/v1/posts?limit=50
const baseUrl = 'https://tarmeezacademy.com/api/v1';
const url = `${baseUrl}/posts?limit=50`;
const loginLink = document.getElementById('loginLink');
const registerLink = document.getElementById('registerLink');

function fetchPosts() {
  axios
    .get(url)
    .then(response => showPosts(response.data.data))
    .catch(error => console.error('Error fetching posts:', error));
}

function showPosts(posts) {
  const postsWrapper = document.getElementById("postsWrapper");

  for (let post of posts) {
    const html = `
      <div class="grid gap-2 bg-white dark:bg-black-second border rounded-lg border-gray-100 dark:border-black shadow-sm p-5 w-full lg:w-[800px]">
            <!-- header -->
            <header class="flex justify-between items-center">
              <!-- info -->
              <div>
                <div class="flex items-center gap-4">
                  <div class="relative">
                    <img class="w-10 h-10 rounded-full" src="${post.author.profile_image}" alt="">
                    <span
                      class="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                  </div>
  
                  <div class="">
  
                    <div class="flex gap-2">
                      <span class="font-medium dark:text-white">${post.author.name}</span>
                      <div>
                        <span class="font-medium text-blue-700">.</span>
                        <span class="dark:text-gray-300">
                          ${post.created_at}
                        </span>
                      </div>
                    </div>
  
                    <div class="text-sm text-gray-500 dark:text-gray-400">${post.author.username}</div>
  
                  </div>
                </div>
              </div>
  
              <!-- follow -->
              <button type="button"
                class="text-white bg-black dark:bg-white dark:text-black  font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Follow
              </button>
            </header>
  
            <!-- Tags -->
            <div class="tags">
              
            </div>

            <!-- body -->
            <div>
              <p class="my-4 text-gray-500 dark:text-gray-200">
                ${post.body}
              </p>
              <img src="${post.image}" alt="" class="block my-2 rounded-md">
            </div>

            <!-- comments -->
            <div class="mt-5 grid gap-3">
              <span class="text-sm text-slate-400 block ">${post.comments_count} Commnets</span>
            <div>
        </div>
      </div>
    `

    postsWrapper.insertAdjacentHTML("beforeend", html);
    const tagsWrapper = [...document.querySelectorAll('.tags')].pop();
    const tagsColor = ['blue', 'gray', 'red', 'green'];

    for(let i = 0, j = 0; i < post.tags.lenght; i++) {
      let color = j >= 4 ? tagsColor[j = 0] : tagsColor[j++];
      const tagHtml = `
      <span
        class="bg-${color}-100 text-${color}-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-${color}-900 dark:text-${color}-300">${post.tags[i]}</span>
      `;

      tagsWrapper.insertAdjacentHTML('beforeend', tagHtml);
    }
  }

}

// check if user has loggedin or not
function userView() {
  const profile = JSON.parse(localStorage.getItem('profile'));

  if (profile) {
    intergrateProfileAvatar(profile);
    intergratePostBtn();
    integrateLogoutBtn();

    document.getElementById('logoutBtn').onclick = logout;
  };
}

function intergrateProfileAvatar(profile) {
  document.getElementById('login-register-wrapper').remove();
  const sidebarContentEle = document.getElementById('default-sidebar').firstElementChild;
  const avatarProfileHtml = `
  <!-- Profile avatar -->
  <div
    class="relative flex items-center justify-between hover:cursor-pointer my-4 p-2 bg-white dark:bg-black-second border border-gray-800 dark:border-black rounded-lg">
    <div class="flex items-center gap-2">
      <div>
        <img class="w-10 h-10 rounded-full" src="../assets/avatars/avatar_black_bg.jpg" alt="avatar">
        <span
          class="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
      </div>
      <div class="font-medium dark:text-white">
        <h2>${profile.name}</h2>
      </div>
    </div>
    <!-- : icon -> dropdown -->
    <div>
      <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="right-end"
        data-dropdown-offset-distance="15" data-dropdown-offset-skidding="-10px"
        class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
          <path
            d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>

      <!-- Dropdown menu -->
      <div id="dropdownDots"
        class="z-10 px-2 hidden bg-white divide-y divide-gray-100 border dark:border-gray-700 rounded-lg shadow min-w-fit dark:bg-gray-700 dark:divide-gray-600">
        <ul class="py-2 text-xs dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
          <li>
            <a href="#"
              class="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              <svg class="w-6 h-6  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-width="2"
                  d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              View profile
            </a>
          </li>
          <li>
            <a href="#"
              class="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2"
                  d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              Account Settings
            </a>
          </li>
          <li>
            <a href="#"
              class="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z" />
              </svg>
              Keyboard shortcuts
            </a>
          </li>
        </ul>
        <div class="py-2">
          <a href="#"
            class="flex gap-2 px-2 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
            </svg>
            Log out
          </a>
        </div>
      </div>
    </div>
  </div>
  `
  sidebarContentEle.insertAdjacentHTML('afterbegin', avatarProfileHtml);
}

function intergratePostBtn() {
  const sidebarMenue = document.getElementById('sidebar-menue');
  const newPostHtml = `
  <li>
    <a href="#"
      class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
      </svg>

      <span class="ms-3">New Post</span>
    </a>
  </li>
  `
  sidebarMenue.insertAdjacentHTML("afterbegin", newPostHtml)
}

function integrateLogoutBtn() {
  const sidebarContent = document.getElementById('default-sidebar').firstElementChild;
  const html = `
  <button type="button" id='logoutBtn' class="block my-3 w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Logout</button>
  `;

  sidebarContent.insertAdjacentHTML('beforeend', html);
}

function logout() {
  localStorage.removeItem('profile');
  window.location.reload();
}

loginLink.onclick = function() {
  localStorage.setItem('registeration', 'login');
}

registerLink.onclick = function() {
  localStorage.setItem('registeration', 'register');
}

function init() {
  fetchPosts();
  userView();
}

window.onload = init();