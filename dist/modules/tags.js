export async function showTags() {
  await fetchTags();
}

function fetchTags() {
  const url = `https://tarmeezacademy.com/api/v1/tags`;

  return new Promise((resolve, reject) => {
    axios
    .get(url)
    .then(response => {
      console.log(response.data.data);
      addTags(response.data.data)
      resolve()
    })
    .catch(error => {
      console.log(error);
    })
  })
}

function addTags(tags) {
  console.log('add tags is running');
  const icons = ['🏐', '📰', '💵', '🎥' ];
  const colors = ['pink', 'violet', 'orange', 'red'];

  for(let i = 0; i < 4; i++) {
    const li = `<li class="m-1 py-2 px-5 outline-2 outline-dashed outline-black dark:outline-white border-gray-50 bg-${colors[i]}-200 rounded-lg">${tags[i].name} ${icons[i]}</li>`
    document.getElementById('tags').insertAdjacentHTML('beforeend', li);
  }
}