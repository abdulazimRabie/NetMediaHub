import { showPosts } from "./showPosts.js";

const baseUrl = 'https://tarmeezacademy.com/api/v1';

export function fetchPosts() {
  const url = `${baseUrl}/posts?limit=50`;
  axios
    .get(url)
    .then(response => showPosts(response.data.data))
    .catch(error => console.error('Error fetching posts:', error));
}