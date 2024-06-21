export function toggleErrorMsg() {
  const errorMsg = document.getElementById('error-msg');

  errorMsg.classList.toggle('hidden');
  errorMsg.classList.toggle('grid');
}