// show edit button
// enable edit button
export function editPost() {
  editPostBtnClicked();
}

function editModal(post) {
  const profile = JSON.parse(localStorage.getItem('profile'));
  let noPostImage = (post.image == "") ? 'hidden' : post.image; // image wrapper will appear or not
  const editModal = `
  <div id="edit-modal" tabindex="-1" aria-hidden="true"
    class="md:grid justify-center items-center overflow-y-scroll overflow-x-hidden fixed z-50 w-full h-full">
    <div class="relative p-4 w-full h-full md:w-[800px] md:h-fit max-h-full">
      <!-- Modal content -->
      <div class="flex flex-col relative bg-white rounded-lg shadow dark:bg-black w-full h-full">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 rounded-t">
          <h3 class="text-xl font-semibold text-black dark:text-white">
            Edit <span class="author-post">${profile.name}</span>'s Post
          </h3>
          <button type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="edit-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="grow overflow-y-scroll no-scrollbar p-4 md:p-5 space-y-4">
          <div class="grid items-center grid-cols-[auto,1fr] gap-y-0 gap-x-3">
            <div><img src="${profile.profile_image}" class="block w-10 h-10 rounded-full border border-gray-100" alt=""></div>
            <div class="grid text-black dark:text-white">
              <div class="font-bold text-md">${profile.name}</div>
              <div class="text-sm">${profile.username}</div>
            </div>

            <div class="stick relative self-stretch"></div>
            <div class="p-3 pl-0">
              <button type="button"
                class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                <svg class="w-[22px] h-[22px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"
                    d="M15 9h.01M8.99 9H9m12 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM6.6 13a5.5 5.5 0 0 0 10.81 0H6.6Z" />
                </svg>
                <span class="sr-only">Add emoji</span>
              </button>
              <button type="button"
                class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                <label for="inputEditedImageModal" id="uploadEditedImageModal"
                  class="flex gap-1 text-base px-5 py-2 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]">
                  <svg class="w-[22px] h-[22px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"
                      d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                  </svg>
                  <input type="file" id='inputEditedImageModal' accept="image/*" class="hidden" />
                </label>
                <span class="sr-only">Add image</span>
              </button>
            </div>

            <div></div>
            <div>
              <textarea id="edited-post-textarea" rows="1"
                class="border-none resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg focus:ring-0 dark:bg-black-second dark:placeholder-gray-400 dark:text-white"
                placeholder="Your Comment ...">${post.content.trimStart()}</textarea>

                <div class="w-10 h-10 block m-3 relative ${noPostImage}" id="imageUploadedContainer">
                  <img src="${post.image}" alt="" class="w-full h-full rounded-md"
                  id="edited-post-image">
                  <button type="button"
                    class="text-red-400 bg-transparent hover:bg-gray-200 hover:text-red-600 rounded-full text-sm ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white absolute top-0 -right-5 p-1"
                    id="removeImage">
                    <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Remove image post</span>
                  </button>
                </div>
            </div>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="flex justify-end items-center p-4 md:p-5 rounded-b">
          <button data-modal-hide="default-modal" type="button"
            class="text-white bg-black focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-black dark:bg-white"
            id="udateEditPost">
            update</button>
        </div>
      </div>
    </div>
  </div>
  `;

  const backdrop = `
  <div modal-backdrop="edit-post" class="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>
  `;

  document.body.style.overflow = 'hidden';

  document.querySelector('.body').insertAdjacentHTML('afterbegin', editModal);
  document.body.insertAdjacentHTML('beforeend', backdrop);
}

function editPostBtnClicked() {
  document.querySelectorAll('.editPostBtn').forEach(editPostBtn => {
    editPostBtn.onclick = function() {
      const post = this.closest('div.post'); // li -> ul -> menue -> header -> post
      const postContet = post.querySelector('.user-post');
      const postImage = post.querySelector('.user-post-image');

      const postObj = {
        'content' : postContet.textContent,
        'image' : postImage.getAttribute('src')
      }

      editModal(postObj);
      closeEditModalClicked();
      updateBtnClickd(post);
    }
  })
}

function closeEditModal() {
  document.getElementById('edit-modal').remove();
  document.querySelector('div[modal-backdrop="edit-post"]').remove();
  document.body.style.overflow = 'scroll';
}

function closeEditModalClicked() {
  document.querySelector('button[data-modal-hide="edit-modal"]')
  .onclick = function () {
    closeEditModal();
  }
}

function updateBtnClickd(post) {
  document.getElementById('udateEditPost').onclick = function() {
    const postId = post.getAttribute('post-id');
    const textarea = document.getElementById('edited-post-textarea');
    const image = document.getElementById('edited-post-image');
    const token = localStorage.getItem('token');

    const url = `https://tarmeezacademy.com/api/v1/posts/${postId}`;
    const params = {
      'body': textarea.value
    };

    const headers = {
      'authorization' : `Bearer ${token}`,
    }

    axios
    .put(url, params , {
      headers : headers
    })
    .then(response => updatePost(response.data.data))
    .then(_ => closeEditModal())
    .catch(error => console.log(error))
  }
}

function updatePost(newPost) {
  const post = document.querySelector(`div[post-id="${newPost.id}"]`);
  const postContent = post.querySelector('.user-post');
  const postImage = post.querySelector('.user-post-image');

  postContent.textContent = newPost.body;
  postImage.setAttribute('src', newPost.image);
}


function editImageButtonClickes() {
  const post = document.getElementById('ed')
}