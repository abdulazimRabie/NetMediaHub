export function userView() {
  const profile = JSON.parse(localStorage.getItem('profile'));

  if (profile) {
    intergrateProfileAvatar(profile);
    intergratePostActions();
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

function intergratePostActions() {
  postLi();
  postBox();
  postBtn();
}

function postLi() {
  const sidebarMenue = document.getElementById('sidebar-menue');
  const newPostHtml = `
  <li class="hidden md:block">
    <button data-modal-target="post-modal" data-modal-toggle="post-modal"
      class="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" type="button">
      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
      </svg>

      <span class="ms-3">New Post</span>
    </button>
  </li>
  `;
  sidebarMenue.insertAdjacentHTML("afterbegin", newPostHtml);
}

function postBox() {
  const postWrapper = document.getElementById('postsWrapper');
  const postBoxHtml = `
  <div class="hidden md:block w-full lg:w-[800px]">
    <form>
      <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-black-second dark:border-black-second">
        <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-black">
          <label for="comment" class="sr-only">Waht do you think about ?</label>
          <textarea id="comment" rows="4"
            class="w-full px-0 text-md text-gray-900 bg-white border-0 dark:bg-black focus:ring-0 dark:text-white dark:placeholder-white"
            placeholder="Write a comment..." required></textarea>
        </div>
        <div class="flex items-center justify-between px-3 py-2 border-t dark:border-black-second">
          <div class="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
            <button type="button"
              class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 9h.01M8.99 9H9m12 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM6.6 13a5.5 5.5 0 0 0 10.81 0H6.6Z" />
              </svg>
              <span class="sr-only">Choose emoji</span>
            </button>
            <button type="button"
              class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 18">
                <path
                  d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
              <span class="sr-only">Upload image</span>
            </button>
          </div>

          <button type="submit"
            class="inline-flex items-center py-2.5 px-9 text-md font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
            Post
          </button>
        </div>
      </div>
    </form>
  </div>
  `;

  postWrapper.insertAdjacentHTML('afterbegin', postBoxHtml);
}

function postBtn() {
  const content = document.getElementById('content');
  const postBtnHtml = `
  <div data-dial-init class="md:hidden fixed end-3 bottom-3 group" id="newPostIcon">
    <button type="button" data-modal-target="post-modal" data-modal-toggle="post-modal"
      aria-expanded="false"
      class="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
      <svg class="w-5 h-5 transition-transform group-hover:rotate-45" aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
      </svg>
      <span class="sr-only">Open post modal</span>
    </button>
  </div>
  `;

  content.insertAdjacentHTML('beforeend', postBtnHtml);
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
  localStorage.removeItem('token');
  window.location.reload();
}