import { showPosts } from "./showPosts.js";
const baseUrl = 'https://tarmeezacademy.com/api/v1';

export function fetchPosts(page) {
  return new Promise((resolve,reject) => {
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
        resolve();
      })
      .catch(error => console.error('Error fetching posts:', error));
  })

}