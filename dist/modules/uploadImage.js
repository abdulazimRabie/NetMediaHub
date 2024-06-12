import { updatePuplishingStateBox, updatePuplishingStateModal } from "./puplishingState.js";

export function uploadImage() {
  
  const imageBoxBtn = document.getElementById('uploadImageBox');
  const imageModalBtn = document.getElementById('uploadImageModal');
  
  const inputImageBox = document.getElementById('inputImageBox');
  const inputImageModal = document.getElementById('inputImageModal');
  
  const imageWrapperBox = document.getElementById("images-uploaded-box");
  const imageWrapperModal = document.getElementById("images-uploaded-modal");
  
  const puplishBtnBox = document.getElementById('postBoxPuplish');
  const puplishBtnPopup = document.getElementById('postPopupPuplish');

  imageBoxBtn.addEventListener('change', function() {
    console.log('image box btn clicked');
    checkImageUpload(inputImageBox, imageWrapperBox, updatePuplishingStateBox);
  })

  imageModalBtn.addEventListener('change', function() {
    checkImageUpload(inputImageModal, imageWrapperModal, updatePuplishingStateModal);
  })

  // click on upBtn
  // call function of check upload image
  // inside of check if it's right , we push it to ui 
  // and enable to remove 
  // removing element will calle
}

function checkImageUpload(input, wrapper, update) {
  wrapper.innerHTML = '';
  update();
  const imageUi = `
  <div class="flex gap-2 items-center w-fit max-w-[calc(100%-1rem)] border rounded-md border-gray-600 p-1 m-2 box-border">
    <!-- Icon from Flowbite library -->
    <svg class="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path fill-rule="evenodd" d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
      <path fill-rule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z" clip-rule="evenodd"/>
    </svg>

    <!-- Name of the image -->
    <span class="flex-grow truncate overflow-hidden dark:text-white" id="image-uploaded-name">${input.files[0].name}</span>

    <!-- Delete icon -->
    <button class="text-red-300 hover:text-red-500 focus:outline-none p-1 rounded-md hover:bg-slate-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>
  `
  wrapper.insertAdjacentHTML('afterbegin', imageUi);

  // delete button of image
  wrapper.firstElementChild.lastElementChild
  .addEventListener('click', function() {
    removeUploadedImage(input, wrapper, update);
  })
}

export function removeUploadedImage(input, wrapper, update) {
  wrapper.innerHTML = '';
  input.value = '';
  update();
}