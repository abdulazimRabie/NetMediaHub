export function showPostOptions() {
  const posts = [...document.getElementById('postsWrapper').children];
  posts.forEach(post => {
    console.log(post);
    const postAuthorId = post.getAttribute('author-id');
    const userId = JSON.parse(localStorage.getItem('profile')).id;
    const postId = post.getAttribute('post-id');
    if(postAuthorId == userId) {
      
    const optionsHTML = `
      <button id="postOptions${postId}" data-dropdown-toggle="postOptionsDots${postId}"
      data-dropdown-placement="left-end" data-dropdown-offset-distance="15" data-dropdown-offset-skidding="-10px"
      class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-black  dark:focus:ring-gray-600" type="button">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
        </svg>
      </button>

      <!-- Dropdown menu -->
      <div id="postOptionsDots${postId}" 
      class="px-2 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-black dark:divide-gray-800">
        <ul class="py-2 text-sm text-black dark:text-white" aria-labelledby="dropdownMenuIconButton">
          <li>
            <button class="flex gap-x-1 items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-black-second rounded-md editPostBtn">
              <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4.988 19.012 5.41-5.41m2.366-6.424 4.058 4.058-2.03 5.41L5.3 20 4 18.701l3.355-9.494 5.41-2.029Zm4.626 4.625L12.197 6.61 14.807 4 20 9.194l-2.61 2.61Z"/>
              </svg>
              <span>Edit</span>
            </button>
          </li>
        </ul>
        <div class="py-2">
          <button class="flex gap-x-1 items-center w-full px-4 py-2 border border-red-700  text-red-700 hover:bg-red-700 hover:text-white rounded-md deletePost">
              <svg class="w-[24px] h-[24px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
              </svg>
              <span>Delete</span>
            </button>
        </div>
      </div>
    `;

      const header = post.querySelector('header');
      header.insertAdjacentHTML('beforeend', optionsHTML);
    }
  })
}