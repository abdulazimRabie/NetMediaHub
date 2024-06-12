
import { showPost } from "./showPosts.js";
import { updatePuplishingStateBox, updatePuplishingStateModal } from "./puplishingState.js";
import { uploadImage, removeUploadedImage } from "./uploadImage.js";

export function puplishingPost() {
  const textareaBox = document.getElementById('postBoxTextArea');
  const textareaPopup = document.getElementById('postPopupTextArea');

  const imageWrapperBox = document.getElementById("images-uploaded-box");
  const imageWrapperModal = document.getElementById("images-uploaded-modal");

  const inputImageBox = document.getElementById('inputImageBox');
  const inputImageModal = document.getElementById('inputImageModal');

  const puplishBtnBox = document.getElementById('postBoxPuplish');
  const puplishBtnPopup = document.getElementById('postPopupPuplish');

  textareaBox.addEventListener('keyup', () => updatePuplishingStateBox());
  textareaPopup.addEventListener('keyup', () => updatePuplishingStateModal());
  
  puplishBtnBox.addEventListener('click', 
    () => sendPost(textareaBox, inputImageBox, imageWrapperBox, removeUploadedImage, updatePuplishingStateBox));
  puplishBtnPopup.addEventListener('click', 
    () => sendPost(textareaPopup, inputImageModal, imageWrapperModal,removeUploadedImage, updatePuplishingStateModal));

  // i write it here since if it was global it will grap static forms only
  // and there are forms will be added from javascript if user mode is on
  const forms = [...document.getElementsByTagName('form')];
  preventForm(forms);
  uploadImage();
}

function sendPost(textarea, inputImage, wrapper, removeimage, update) {
  const postContent = textarea.value;
  const image = inputImage.files[0];
  const url = 'https://tarmeezacademy.com/api/v1/posts';
  const token = localStorage.getItem('token');  

  console.log(postContent, image);

  let formdata = new FormData();
  formdata.append('body', postContent);
  formdata.append('title', null);
  formdata.append('image', image)
  
  const headers = {
    'Content-Type': 'multipart/form-data',
    'authorization' : `Bearer ${token}`
  }
  // call api
  axios
  .post(url, formdata, {
    headers : headers
  })
  .then(response => showPost(response.data.data, 'up'))
  .then(_ => resetPost(textarea, removeimage,inputImage, wrapper,update))
  .catch(error => console.log(error))

  // handle response 
}

function resetPost(textarea, removeimage, inputfile, wrapper, update) {
  // reset textarea
  textarea.value = '';

  // remove loaded image
  removeimage(inputfile, wrapper, update);

  // update
  update();
}

function preventForm(forms) {
  forms.forEach(form => {
    console.log('prevented')
    form.addEventListener('submit', function(event) {
      event.preventDefault();
    });
  });
}

