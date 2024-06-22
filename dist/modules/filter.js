const newestBtn = document.getElementById('filter-newest');
const oldestBtn = document.getElementById('filter-oldest');

export function activeFilter() {
  console.log(oldestBtn);  
  newestBtn.onclick = activeNewest;
  oldestBtn.onclick = activeOldest;
}

function removeCheckIcon(element) {
  element.querySelector('svg').remove();
}

function addCheckIcon(element) {
  const svg = `
  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
    height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M5 11.917 9.724 16.5 19 7.5" />
  </svg>`;
  element.insertAdjacentHTML('afterbegin', svg);
}

function activeNewest() {
  const isActive = newestBtn.getAttribute('data-active');
  if (isActive == 'false') {
    addCheckIcon(newestBtn);
    removeCheckIcon(oldestBtn);
    moveDataActiveFromTo(oldestBtn, newestBtn);
    reversePosts();
  }
}

function activeOldest() {
  const isActive = oldestBtn.getAttribute('data-active');
  if (isActive == 'false') {
    addCheckIcon(oldestBtn);
    removeCheckIcon(newestBtn);
    moveDataActiveFromTo(newestBtn, oldestBtn);
    reversePosts();
  }
}

function reversePosts() {
  const postsWrapper = document.getElementById('postsWrapper');
  const posts = [...document.querySelectorAll('.post')].reverse();
  postsWrapper.innerHTML = ``;
  posts.forEach(post => {
    postsWrapper.appendChild(post);
  });
}

function moveDataActiveFromTo(element_from, element_to) {
  element_from.setAttribute('data-active', 'false');
  element_to.setAttribute('data-active', 'true');
}
// active => check if data-active=true => call active => false => do nothing