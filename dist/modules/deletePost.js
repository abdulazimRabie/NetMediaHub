export function deletePost() {
  deletePostBtnClicked();
}

function deleteModal() {
  const deleteModal = `
  <div id="delete-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-black">
        <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-modal-hide="delete-modal">
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-4 md:p-5 text-center">
          <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-100">Are you sure you want to delete this product?</h3>
          <button type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
          id="deletePostBtn">
              Delete
          </button>
          <button type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-black focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 dark:bg-black-second dark:text-white dark:border-gray-600"
          id="declineDeletingPostBtn">
          Decline
          </button>
        </div>
      </div>
    </div>
  </div>
  `;

  const backdrop = `
  <div modal-backdrop="delete-post" class="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>
  `;

  document.body.style.overflow = 'hidden';

  document.querySelector('.body').insertAdjacentHTML('afterbegin', deleteModal);
  document.body.insertAdjacentHTML('beforeend', backdrop);
};

function deletePostBtnClicked() {
  document.querySelectorAll('.deletePost').forEach(deletePostBtn => {
    deletePostBtn.onclick = function() {
      const post = this.closest('div.post'); // li -> ul -> menue -> header -> post
      const postId = post.getAttribute('post-id');

      deleteModal();
      closeDeleteModalClicked();
      deleteBtnClickd(postId);
    }
  })
};

function closeDeleteModal() {
  document.getElementById('delete-modal').remove();
  document.querySelector('div[modal-backdrop="delete-post"]').remove();
  document.body.style.overflow = 'scroll';
};

function closeDeleteModalClicked() {
  console.log(document.querySelector('button[data-modal-hide="delete-modal"]'));
  document.querySelector('button[data-modal-hide="delete-modal"]').onclick = closeDeleteModal;
  document.getElementById('declineDeletingPostBtn').onclick = closeDeleteModal;
};

function deleteBtnClickd(postId) {
  document.getElementById('deletePostBtn').onclick = function () {
    const url = `https://tarmeezacademy.com/api/v1/posts/${postId}`;
    const token = localStorage.getItem('token');

    const headers = {
      'Content-Type': 'mutlipart/form-data',
      'authorization': `Bearer ${token}`
    }

    axios
    .delete(url, {
      headers : headers
    })
    .then(_ => {
      removePost(postId);
      closeDeleteModal();
    })
    .catch(error => console.log(error))
  }
};

function removePost(postId) {
  document.querySelector(`div[post-id='${postId}']`).remove();
};