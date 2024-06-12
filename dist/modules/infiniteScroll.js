import { fetchPosts } from "./fetchPosts.js";

export function infiniteScroll() {
  const endOfPage = Math.ceil(window.innerHeight + window.scrollY) >= (window.document.body.offsetHeight - 500);
  if (endOfPage) {
    handleInfinteScroll();
    console.log('end of page');
  }
}

function handleInfinteScroll() {
  let 
    curr_page = sessionStorage.getItem('current_page'),
    last_page = sessionStorage.getItem('last_page');

  if (curr_page < last_page) {
    curr_page += 1;
    fetchPosts(curr_page)
  }
}