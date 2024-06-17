const postsWrapper = document.getElementById("postsWrapper");

export function showPosts(posts, position) {
  for (let post of posts) {
    showPost(post, position);
  }

}

export function showPost(post, position) {
  // if image is empty its value was => [object object] and i don't want this - i want it to be empty if there is no image
  if (typeof post.image == 'object') post.image = ""; 
  
  const html = `
    <div class="grid gap-2 bg-white dark:bg-black-second border rounded-lg border-gray-100 dark:border-black shadow-sm p-5 w-full lg:w-[800px] post"
    post-id='${post.id}' author-id='${post.author.id}'>
      <!-- header -->
      <header class="flex justify-between items-center">
        <!-- info -->
        <div>
          <div class="flex items-center gap-4">
            <div class="relative">
              <img class="w-10 h-10 rounded-full user-image" src="${post.author.profile_image}" alt="">
              <span
                class="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
            </div>

            <div class="">

              <div class="flex gap-2">
                <span class="font-medium dark:text-white user-name">${post.author.name}</span>
                <div>
                  <span class="font-medium text-blue-700">.</span>
                  <span class="dark:text-gray-300">
                    ${post.created_at}
                  </span>
                </div>
              </div>

              <div class="text-sm text-gray-500 dark:text-gray-400 user-username">${post.author.username}</div>

            </div>
          </div>
        </div>
      </header>

      <!-- Tags -->
      <div class="tags">
        
      </div>

      <!-- body -->
      <div>
        <p class="my-4 text-gray-500 dark:text-gray-200 user-post">
          ${post.body}
        </p>
        <img src="${post.image}" alt="" class="block my-2 rounded-md user-post-image">
      </div>

      <!-- comments -->
      <div class="mt-5 grid gap-3">
        <button class="text-sm text-slate-400 block comment-btn">
          <span>${post.comments_count}</span> 
          Commnets
        </button>
      <div>
    </div>
  </div>
  `;

  if (position == 'up')
    postsWrapper.insertAdjacentHTML("afterbegin", html);
  else
    postsWrapper.insertAdjacentHTML("beforeend", html);

  const tagsWrapper = [...document.querySelectorAll('.tags')].pop();
  const tagsColor = ['blue', 'gray', 'red', 'green'];

  for(let i = 0, j = 0; i < post.tags.lenght; i++) {
    let color = j >= 4 ? tagsColor[j = 0] : tagsColor[j++];
    const tagHtml = `
    <span
      class="bg-${color}-100 text-${color}-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-${color}-900 dark:text-${color}-300">${post.tags[i]}</span>
    `;

    tagsWrapper.insertAdjacentHTML('beforeend', tagHtml);
  }
}