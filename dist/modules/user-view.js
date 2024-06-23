import { puplishingPost } from "./puplishPost.js"; 
import { showPostOptions } from "./editDeleteOption.js";
import { editPost } from "./editPost.js";
import { deletePost } from "./deletePost.js";

export function userView() {
  const profile = localStorage.getItem('profile');
  if (profile) {
    intergrateProfileAvatar(profile);
    intergratePostActions();
    integrateLogoutBtn();
    puplishingPost();
    commentsAction();
    showPostOptions();
    editPost();
    deletePost();
  };
}

export function intergrateProfileAvatar(profile) {
  profile = JSON.parse(profile);
  document.getElementById('login-register-wrapper').remove();
  const sidebarContentEle = document.getElementById('default-sidebar').firstElementChild;
  const navbar = document.getElementById('content').querySelector('nav')
  const avatarProfileHtml = `
  <!-- Profile avatar -->
  <div
    class="relative flex items-center justify-between hover:cursor-pointer my-4 p-2 bg-white dark:bg-black-second border border-gray-800 dark:border-black rounded-lg">
    <a class="flex items-center gap-2" href="profile.html?userId=${profile.id}">
      <div>
        <img class="w-10 h-10 rounded-full" src="${profile.profile_image}" alt="avatar">
        <span
          class="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
      </div>
      <div class="font-medium dark:text-white">
        <h2>${profile.name}</h2>
      </div>
    </a>
    <!-- : icon -> dropdown -->
    <div>
      <button class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
          <path
            d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>
    </div>
  </div>
  `
  const avatarNavbar = `
  <div id="navbar-user-image">
    <a href="profile.html?userId=${profile.id}">
      <img src="${profile.profile_image}" alt="" class="w-8 h-8 block me-3 rounded-full">
    </a>
  </div>
  `
  sidebarContentEle.insertAdjacentHTML('afterbegin', avatarProfileHtml);
  navbar.insertAdjacentHTML('beforeend', avatarNavbar);
}

function intergratePostActions() {
  postLi();
  postBox();
  postBtn();
  postModal();
}

function postLi() {
  const sidebarMenue = document.getElementById('sidebar-menue');
  const newPostHtml = `
  <li class="hidden md:block p-2">
    <button data-modal-target="post-modal" data-modal-toggle="post-modal"
      class="w-full relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md" type="button">
      <span
        class="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute">
      </span>
      <span class="w-full relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
        <span class="relative flex gap-2 text-white">
          <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
          </svg>
          New Post
        </span>
      </span>
    </button>
  </li>
  `;
  sidebarMenue.insertAdjacentHTML("afterbegin", newPostHtml);
}

function postBox() {
  const postWrapper = document.getElementById('postsWrapper');
  const profile = JSON.parse(localStorage.getItem('profile'));
  const postBoxHtml = `
  <div class="hidden md:block w-full p-5 mx-auto" id="postBox">
    <form>
      <div class="w-full mb-4 rounded-lg bg-gray-50 dark:bg-black-third">
        <div class="overflow-hidden">
          <img src="${profile.profile_image}" class="w-8 h-8 rounded-full ml-5 mt-5"></img>
          <label for="comment" class="sr-only">Waht do you think about ?</label>
          <textarea id="postBoxTextArea" rows="4"
            class="no-scrollbar resize-none textarea rounded-lg w-full p-5 text-md text-gray-900 bg-gray-50 border-0 dark:bg-[#151515] focus:ring-0 dark:text-white dark:placeholder-white"
            placeholder="What do think about ..." required></textarea>
        </div>
        <div id="images-uploaded-box">
          
        </div>
        <div class="flex items-center justify-between px-3 py-2">
          <div class="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
            <button type="button"
              class="inline-flex justify-center items-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 9h.01M8.99 9H9m12 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM6.6 13a5.5 5.5 0 0 0 10.81 0H6.6Z" />
              </svg>
              <span class="sr-only">Choose emoji</span>
            </button>
            <label for="inputImageBox" id="uploadImageBox"
              class="flex gap-1 hover:bg-gray-700 text-gray-800 text-base px-5 py-1 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]">
              <svg class=" w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z" clip-rule="evenodd"/>
              </svg>
              <input type="file" id='inputImageBox' accept="image/*" class="hidden" />
            </label>
          </div>
          <button type="submit" disabled id="postBoxPuplish"
            class="pointer-events-none opacity-35 inline-flex items-center py-1 px-9 text-md font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
            Post
          </button>
        </div>
      </div>
    </form>
  </div>
  `;

  postWrapper.insertAdjacentHTML('beforebegin', postBoxHtml);
}

function postBtn() {
  
  const content = document.getElementById('content');
  const postBtnHtml = `
  <div data-dial-init class="md:hidden fixed end-3 bottom-3 group" id="postBtn">
    <button type="button" data-modal-target="post-modal" data-modal-toggle="post-modal"
      aria-expanded="false" id="newPostIcon"
      class="flex items-center justify-center text-white dark:text-black bg-black rounded-full w-10 h-16 hover:bg-blakc-second dark:bg-gray-50 dark:hover:bg-white">
      <svg class="w-5 h-5 transition-transform group-hover:rotate-45" aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
      </svg>
      <span class="sr-only">Open post modal</span>
    </button>
  </div>
  `;

  content.insertAdjacentHTML('afterend', postBtnHtml);
}

function postModal() {
  const contentDiv = document.getElementById("content");
  const modalPost = `
  <div id="post-modal" tabindex="-1"
    class="fixed top-0 left-0 md:left-1/2 md:translate-x-[-50%] z-50 hidden w-full md:w-[800px] md:p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-full">
    <div class="relative w-full h-lvh md:h-fit">
      <!-- Modal content -->
      <div class="flex flex-col h-full md:block md:h-fit relative bg-white rounded-lg shadow dark:bg-black">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-800">
          <h3 class="text-xl font-medium text-gray-900 dark:text-white">
            New Post
          </h3>
          <button type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="post-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="md:grow p-4 md:p-5 space-y-4">
          <div class="w-full">
            <form>
              <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-black-third dark:border-black-second">
                <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-black">
                  <label for="comment" class="sr-only">Waht do you think about ?</label>
                  <textarea id="postPopupTextArea" rows="4"
                    class="w-full px-0 text-md text-gray-900 bg-white border-0 dark:bg-black focus:ring-0 dark:text-white dark:placeholder-white"
                    placeholder="Write a comment..." required></textarea>
                </div>
                <div id="images-uploaded-modal">
                </div>
                <div class="flex items-center justify-between px-3 py-2 border-t dark:border-black-second">
                  <div class="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                    <button type="button"
                      class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 9h.01M8.99 9H9m12 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM6.6 13a5.5 5.5 0 0 0 10.81 0H6.6Z" />
                      </svg>
                      <span class="sr-only">Choose emoji</span>
                    </button>
                    <label for="inputImageModal" id="uploadImageModal"
                      class="flex gap-1 bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-2 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]">
                      <svg class=" w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
                        <path fill-rule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z" clip-rule="evenodd"/>
                      </svg>
                      Upload
                      <input type="file" id='inputImageModal' accept="image/*" class="hidden" />
                    </label>
                  </div>
                  <button type="submit" id="postPopupPuplish" disabled
                    class="pointer-events-none opacity-35 inline-flex items-center py-2.5 px-9 text-md font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

  contentDiv.insertAdjacentHTML('afterend', modalPost);
}

export function commentsAction() {
  document.querySelectorAll('.comment-btn').forEach(comment => {
    const post = comment.parentElement.parentElement;
    comment.onclick = function() {
      localStorage.setItem('postId',post.getAttribute('post-id'))
      window.location = './post.html';
    }
  });
}

export function integrateLogoutBtn() {
  const sidebarContent = document.getElementById('default-sidebar').firstElementChild;
  const html = `
  <button type="button" id='logoutBtn' class="block my-3 w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Logout</button>
  `;

  sidebarContent.insertAdjacentHTML('beforeend', html);
  document.getElementById('logoutBtn').onclick = logout;
}

export function logout() {
  localStorage.removeItem('profile');
  localStorage.removeItem('token');
  window.location.reload();
}