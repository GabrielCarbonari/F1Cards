let cards = [...drivers];
let pagination = createPaginationObject();

function createPaginationObject() {
  let paginationObject = {};
  let pageSize = 10;
  let totalPages = cards.length % pageSize === 0
      ? Math.floor(cards.length / pageSize)
      : Math.floor(cards.length / pageSize) + 1;

  paginationObject.currentPage = 1;
  paginationObject.pageSize = pageSize;
  paginationObject.totalPages = totalPages;
  paginationObject.elements = cards.slice(0, pageSize);

  return paginationObject;
}

function generateCard(driver) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card')
  
  const cardContent = `
    <h4 class="driver-name">${driver.name}</h4>
    <div class="nationality ${driver.color}">${driver.nationality}</div>
    <div class="driver-image">
      <img src="..${driver.imageUrl}" alt="foto piloto">
    </div>
    <div class="driver-stats">
      <div class="stat">
        <span class="stat-name">Títulos</span>
        <span class="stat-value">${driver.titles}</span>
      </div>
      <div class="stat">
        <span class="stat-name">GPs</span>
        <span class="stat-value">${driver.grandPrix}</span>
      </div>
      <div class="stat">
        <span class="stat-name">Vitórias</span>
        <span class="stat-value">${driver.victories}</span>
      </div>
      <div class="stat">
        <span class="stat-name">Pódios</span>
        <span class="stat-value">${driver.podiums}</span>
      </div>
      <div class="stat">
        <span class="stat-name">Poles</span>
        <span class="stat-value">${driver.polePosition}</span>
      </div>
      <div class="stat">
        <span class="stat-name">Voltas Rápidas</span>
        <span class="stat-value">${driver.fastestLap}</span>
      </div>
    </div>
  `;
  cardElement.innerHTML = cardContent;
  return cardElement;
}

function validatePageNumber(page) {
  if (typeof page !== "number") {
    page = 1;
  }
  page = Math.floor(page);
  page = page < 1 ? 1 : page;
  page = page > pagination.totalPages ? pagination.totalPages : page;
  
  return page;
}

function updatePagination(newPage) {
  pagination.currentPage = validatePageNumber(newPage);
  let startIndex = (pagination.currentPage - 1) * pagination.pageSize;

  pagination.elements = cards.slice(startIndex, startIndex + pagination.pageSize);
}

function updateScreen() {
  const mainElement = document.querySelector('.main');
  const noResultsElement = document.querySelector('.no-results');
  const paginationContainerElement = document.querySelector('.pagination-container');
  mainElement.replaceChildren();

  let isPaginationContainsElements = pagination.elements.length > 0;

  if (isPaginationContainsElements) {
    noResultsElement.classList.add('hidden');
    paginationContainerElement.classList.remove('hidden');
    pagination.elements.forEach(driver => mainElement.appendChild(generateCard(driver)));
    const pageInfoElement = document.querySelector('.page-info');
    pageInfoElement.innerHTML = `Página ${pagination.currentPage} de ${pagination.totalPages}`;
  } else {
    noResultsElement.classList.remove('hidden');
    paginationContainerElement.classList.add('hidden');
  }
}

function nextPage() {
  updatePagination(pagination.currentPage + 1);
  updateScreen();
}

function previousPage() {
  updatePagination(pagination.currentPage - 1);
  updateScreen();
}

function searchDrivers(event) {
  event.preventDefault();
  cards = [...drivers];
  const inputSearchElement = document.querySelector('#input-search');

  let searchValue = inputSearchElement.value.toUpperCase();

  cards = cards.filter(driver => driver.name.toUpperCase().match(`.*${searchValue}.*`));
  pagination = createPaginationObject();
  updateScreen();
}

function openFilterMenu() {
  const filterMenuElement = document.querySelector('.filter-menu');

  filterMenuElement.classList.toggle("open");
}

function applyDriverFilter(sortFunction) {
  cards.sort(sortFunction);
  pagination = createPaginationObject();
  updateScreen();
}

function titlesAscSort(driver1, driver2) {
  return driver1.titles - driver2.titles;
}

function titlesDescSort(driver1, driver2) {
  return driver2.titles - driver1.titles;
}

function gpsAscSort(driver1, driver2) {
  return driver1.grandPrix - driver2.grandPrix;
}

function gpsDescSort(driver1, driver2) {
  return driver2.grandPrix - driver1.grandPrix;
}

function podiumsAscSort(driver1, driver2) {
  return driver1.podiums - driver2.podiums;
}

function podiumsDescSort(driver1, driver2) {
  return driver2.podiums - driver1.podiums;
}

function polePositionAscSort(driver1, driver2) {
  return driver1.polePosition - driver2.polePosition;
}

function polePositionDescSort(driver1, driver2) {
  return driver2.polePosition - driver1.polePosition;
}

function victoriesAscSort(driver1, driver2) {
  return driver1.victories - driver2.victories;
}

function victoriesDescSort(driver1, driver2) {
  return driver2.victories - driver1.victories;
}

function fastestLapAscSort(driver1, driver2) {
  return driver1.fastestLap - driver2.fastestLap;
}

function fastestLapDescSort(driver1, driver2) {
  return driver2.fastestLap - driver1.fastestLap;
}

updateScreen();

