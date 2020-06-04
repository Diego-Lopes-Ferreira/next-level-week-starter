const buttonSearch = document.querySelector('#page-home main a');
buttonSearch.addEventListener('click', openClose)
const buttonX = document.querySelector('.search .header a')
buttonX.addEventListener('click', openClose)
const search = document.querySelector('.search');


function openClose() {
  search.classList.toggle('hide')
}