const postsWrapper = document.getElementById("postsWrapper");

export function showComments () {
  const allPosts = [...postsWrapper.childNodes];
  allPosts.forEach(post => {
    post.onclick = function() {
      console.log(this);
    }
  })
}