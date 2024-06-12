import { showPosts } from "./showPosts.js";
import { showComments } from "./commentsModal.js";

const baseUrl = 'https://tarmeezacademy.com/api/v1';

export function fetchPosts(page) {
  const url = `${baseUrl}/posts?page=${page}&limit=50`;
  axios
    .get(url)
    .then(response => {
      showPosts(response.data.data, 'down'); 
      return response.data.meta}
    )
    .then(response => {
      sessionStorage.setItem('current_page', response.current_page);
      sessionStorage.setItem('last_page', response.last_page);
    })
    .then(_ => {showComments()})
    .catch(error => console.error('Error fetching posts:', error));

}