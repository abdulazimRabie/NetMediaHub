// const times = 0;
export function toggleSpinner(show) {
  const spinner = document.getElementById('spinner');
  console.log("iam spinner", spinner);
  spinner.classList.toggle('hidden');
  spinner.classList.toggle('flex');
}