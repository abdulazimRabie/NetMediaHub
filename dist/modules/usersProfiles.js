export function enableUsersProfiles() {
  document.querySelectorAll('.user-image').forEach(userImage => {
    userImage.onclick = function() {
      const postId = userImage.closest('.post').getAttribute('author-id');
      directToProfilePage(postId);
    }
  });

  document.querySelectorAll('.user-name').forEach(userName => {
    userName.onclick = function() {
      const postId = userName.closest('.post').getAttribute('author-id');
      directToProfilePage(postId);
    }
  })
}

function directToProfilePage(userId) {
  window.location = `profile.html?userId=${userId}`;
}