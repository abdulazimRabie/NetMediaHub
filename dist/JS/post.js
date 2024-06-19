import { intergrateProfileAvatar } from "../modules/user-view.js";
import { activeFavTheme } from "../modules/darkmode.js"
import { showPost } from "../modules/showPosts.js";
import { showPostOptions } from "../modules/editDeleteOption.js";
import { editPost } from "../modules/editPost.js";
import { deletePost } from "../modules/deletePost.js";

const postId = localStorage.getItem('postId');
const postWrapper = document.getElementById('postsWrapper');

function enableTheme() {
  if (localStorage.getItem('theme') === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function fetchPost() {
  return new Promise((resolve , reject) => {
    const url = `https://tarmeezacademy.com/api/v1/posts/${postId}`;
    axios
    .get(url)
    .then(response => showPost(response.data.data, 'up'))
    .then(_ => commentsAction())
    .then (_ => resolve());
  })
}

function commentsAction() {
  const comments = `
    <!-- comments -->
    <div class="mt-5 grid gap-3" id='commentsWrapper'>
      <!-- commnet -->
      <div >
        <header>
          <div class="p-1 rounded-md flex flex-wrap items-center gap-1 hover:cursor-pointer">
            <img class="w-7 h-7 rounded-full mr-1" src="../assets/avatars/girl.jpg" alt="">
            <div class="font-medium dark:text-white">
              <div>Manar Mohamed</div>
            </div>
            <span class="text-gray-500 tex-sm">m.r.m@outlook.com</span>
          </div>
        </header>
        <!-- comment body -->
        <div>
          <p class="pl-10 text-gray-500 dark:text-gray-200">We have been passionated following all hot ternds in design industry</p>
        </div>        
      </div>
    </div>

    <!-- add comment -->
    <div>
      <label for="chat" class="sr-only">Your message</label>
      <div class="grid gap-3 items-center mt-3 px-3 py-2 rounded-lg bg-gray-50 dark:bg-black-second">
        <textarea id="chat" rows="1"
        class="border-none resize-none block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg focus:ring-0 dark:bg-black-second dark:placeholder-gray-400 dark:text-white"
        placeholder="Your Comment ..."></textarea>
        <div class="flex justify-between">
          <button type="button"
            class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z" />
            </svg>
            <span class="sr-only">Add emoji</span>
          </button>
          <button type="submit"
            class="inline-flex justify-center py-2 px-4 font-medium text-md rounded-lg bg-blue-400 text-white cursor-not-allowed"
            id='addCommentBtn' disabled>
            comment
            <span class="sr-only">Send message</span>
          </button>
        </div>
      </div>
    </div>
  `;
  postWrapper.firstElementChild.insertAdjacentHTML('beforeend', comments)
}

function fetchComments() {
  const url = `https://tarmeezacademy.com/api/v1/posts/${postId}`;

  axios
  .get(url)
  .then(response => showComments(response.data.data.comments))
  .catch(error => console.log(error));
}

function addComment() {
  const comment = document.getElementById('chat');
  const addCommentBtn = document.getElementById('addCommentBtn');

  addCommentBtn.onclick = function() {
    const url = `https://tarmeezacademy.com/api/v1/posts/${postId}/comments`;
    const token = localStorage.getItem('token');

    const params = {
      'body' : comment.value
    }

    const headers = {
      'authorization' : `Bearer ${token}`
    }

    axios
    .post(url, params, {
      headers : headers
    })
    .then(response => showComment(response.data.data))
    .then( _ => resetTextarea())
    .then( _ => increaseCommentsNumber())
    .catch(error => console.log(error))
  }
}

function showComments(comments) {
  for (const comment of comments) {
    showComment(comment);
  }
}

function showComment(comment) {
  const commentHTML = `
    <div >
      <header>
        <div class="p-1 rounded-md flex flex-wrap items-center gap-1 hover:cursor-pointer">
          <img class="w-7 h-7 rounded-full mr-1" src="${comment.author.profile_image}" alt="">
          <div class="font-medium dark:text-white">
            <div>${comment.author.name}</div>
          </div>
          <span class="text-gray-500 tex-sm">${comment.author.username}</span>
        </div>
      </header>
      <!-- comment body -->
      <div>
        <p class="pl-10 text-gray-500 dark:text-gray-200">${comment.body}</p>
      </div>        
    </div>
    `;
    document.getElementById('commentsWrapper').insertAdjacentHTML('beforeend', commentHTML);
}

function textareaCheck() {
  document.getElementById('chat').onkeyup = function() {
    if(this.value.trim().length > 0) activeButton();
    else disableButton();
  }
}

function activeButton() {
  const addBtn = document.getElementById('addCommentBtn');
  addBtn.disabled = false;
  addBtn.classList.remove('bg-blue-400');
  addBtn.classList.add('bg-blue-700');

  addBtn.classList.remove('cursor-not-allowed');
  addBtn.classList.add('cursor-pointer');
}

function disableButton() {
  const addBtn = document.getElementById('addCommentBtn');
  addBtn.disabled = true;
  addBtn.classList.remove('bg-blue-700');
  addBtn.classList.add('bg-blue-400');

  addBtn.classList.remove('cursor-pointer');
  addBtn.classList.add('cursor-not-allowed');
}

function resetTextarea() {
  const textarea = document.getElementById('chat');
  textarea.value = '';
  disableButton();
}

function increaseCommentsNumber() {
  console.log('increase');
  const commentNumberSpan = document.querySelector('.comment-btn').querySelector('span');
  let newCommentsNumber = +commentNumberSpan.textContent;
  newCommentsNumber++;
  commentNumberSpan.textContent = newCommentsNumber;
  console.log(newCommentsNumber);

  //update localStorage if the page is reloaded => still updated
  console.log(commentNumberSpan.parentElement.parentElement.parentElement);
  localStorage.setItem('postHTML',
    commentNumberSpan.parentElement.parentElement.parentElement.outerHTML)
}

async function init() {
  intergrateProfileAvatar(localStorage.getItem("profile"));
  activeFavTheme();
  enableTheme();
  await fetchPost();
  textareaCheck();
  fetchComments();
  addComment();
  showPostOptions();
  editPost();
  deletePost();
}

init();