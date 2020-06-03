async function fetchUfs() {
  console.log('Buscando estados')
  const ufSelect = document.querySelector('.field #uf')
  const data = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  const ufs = await data.json();
  for (let uf of ufs) {
    ufSelect.innerHTML += `<option value="${uf.id}">${uf.nome}</option>`;
  }
  console.log('Estados concluido')
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

fetchUfs()

const ufSelect = document.querySelector('.field #uf')
ufSelect.addEventListener('change', async () => {
  console.log(`Buscando cidades do estado ${ufSelect[ufSelect.selectedIndex].text} com id ${ufSelect[ufSelect.selectedIndex].value}`)
  await fetchCities(ufSelect[ufSelect.selectedIndex].value)
  console.log('terminei')
})
