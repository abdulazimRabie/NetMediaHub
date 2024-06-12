function enablePostBtn(postBtn) {
  postBtn.disabled = false;
  postBtn.classList.remove('pointer-events-none','opacity-35')
}

function disablePostBtn(postBtn) {
  postBtn.disabled = true;
  postBtn.classList.add('pointer-events-none','opacity-35')  
}

// textarea box
// textarea modal
// inputfile box
// inputfile modal

export function updatePuplishingStateBox() {
  const textareaBox = document.getElementById('postBoxTextArea');
  const inputImageBox = document.getElementById('inputImageBox');
  const puplishBtnBox = document.getElementById('postBoxPuplish');

  if (textareaBox.value.trim().length > 0 || inputImageBox.files.length > 0) {
    enablePostBtn(puplishBtnBox);
  } else {
    disablePostBtn(puplishBtnBox);
  }
}
  
export function updatePuplishingStateModal() {
  console.log('updating modal post');
  const textareaModal = document.getElementById('postPopupTextArea');
  const puplishBtnModal = document.getElementById('postPopupPuplish');
  const inputImageModal = document.getElementById('inputImageModal');
  if (textareaModal.value.trim().length > 0 || inputImageModal.files.length > 0) {
    enablePostBtn(puplishBtnModal);
  } else {
    disablePostBtn(puplishBtnModal);
  }
}