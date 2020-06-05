async function fetchUfs() {
  const ufSelect = document.querySelector('.field #uf')
  const data = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  const ufs = await data.json();
  for (let uf of ufs) {
    ufSelect.innerHTML += `<option value="${uf.id}">${uf.nome}</option>`;
  }
  ufSelect.disabled = false
}

async function fetchCities(ufid) {
  const citySelect = document.querySelector('.field #city')
  citySelect.disabled = true
  citySelect.innerHTML = '<option value="">Selecione a cidade</option>'
  const data = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufid}/municipios`)
  const cities = await data.json()
  for (let city of cities) {
    citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
  }
  citySelect.disabled = false
}

function handleSelectItem(event) {
  let itemId = event.target.dataset.id
  event.target.classList.toggle('selected')
  if (selectedItems.includes(itemId)) {
    selectedItems = selectedItems.filter( item => item != itemId)
  } else {
    selectedItems.push(itemId)
  }
}
var selectedItems = []
function main() {
  fetchUfs()
  const ufSelect = document.querySelector('.field #uf')
  ufSelect.addEventListener('change', async () => {
    await fetchCities(ufSelect[ufSelect.selectedIndex].value)
  })
  const colectItems = document.querySelectorAll('.items-grid li');
  for (let item of colectItems) {
    item.addEventListener('click', handleSelectItem)
  }
}

main()
