// https://tarmeezacademy.com/api/v1/posts?limit=50

// const { default: axios } = require("axios");

// async function posts() {
//   const response = await fetch('https://tarmeezacademy.com/api/v1/posts?limit=50');
//   const data = response.ok ? await response.json() : new Error("error");;
//   console.log(data);

//   // fetch('https://jsonplaceholder.typicode.com/todos/1')
//   //     .then(response => response.json())
//   //     .then(data => console.log(data))
// }

axios
  .get('https://tarmeezacademy.com/api/v1/posts?limit=50')
  .then(data => showPosts(data.data.data));

function showPosts(posts) {
  const postsWrapper = document.getElementById("postsWrapper");

  for (let post of posts) {
    const html = `
      <div class="grid gap-2 bg-white dark:bg-black-second border rounded-lg border-gray-100 dark:border-black shadow-sm p-5 w-full lg:w-[800px]">
            <!-- header -->
            <header class="flex justify-between items-center">
              <!-- info -->
              <div>
                <div class="flex items-center gap-4">
                  <div class="relative">
                    <img class="w-10 h-10 rounded-full" src="${post.author.profile_image}" alt="">
                    <span
                      class="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                  </div>
  
                  <div class="">
  
                    <div class="flex gap-2">
                      <span class="font-medium dark:text-white">${post.author.name}</span>
                      <div>
                        <span class="font-medium text-blue-700">.</span>
                        <span class="dark:text-gray-300">
                          ${post.created_at}
                        </span>
                      </div>
                    </div>
  
                    <div class="text-sm text-gray-500 dark:text-gray-400">${post.author.username}</div>
  
                  </div>
                </div>
              </div>
  
              <!-- follow -->
              <button type="button"
                class="text-white bg-black dark:bg-white dark:text-black  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Follow
              </button>
            </header>
  
            <!-- Tags -->
            <div>
              <span
                class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Default</span>
              <span
                class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Dark</span>
              <span
                class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Red</span>
              <span
                class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Green</span>
              
            <!-- body -->
            <div>
              <p class="my-4 text-gray-500 dark:text-gray-200">
                ${post.body}
              </p>
              <img src="${post.image}" alt="" class="block my-2 rounded-md">
            </div>

            <!-- reactions -->
            <div class="flex gap-1">
              <span
                class="inline-flex gap-1 items-center rounded-full my-1 px-3 py-1 me-2 text-sm text-gray-800 bg-white dark:bg-gray-700 dark:text-gray-300 cursor-pointer">
                <span>❤</span>
                <span>12</span>
              </span>
            </div>

            <!-- comments -->
            <div class="mt-5 grid gap-3">
              <span class="text-sm text-slate-400 block ">${post.comments_count} Commnets</span>
            <div>
        </div>
      </div>
    `

    postsWrapper.insertAdjacentHTML("beforeend", html);
  }
}