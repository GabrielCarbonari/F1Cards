const deckSize = 5;
const deckPlayer = [];
const deckRival = [];

function generatePlayerCard(driver) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('driver-card')
  
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

function generateRivalCard(driver) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('driver-card')
  
  return cardElement;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function extractDrivers() {
  const driversCopy = [...drivers];
  let max = 33;
  const deck = [];
  for (let index = 0; index < deckSize * 2; index++) {
    const driverIndex = randomInt(0, max);
    deck[index] = driversCopy[driverIndex];
    driversCopy.splice(driverIndex, 1);
    max--;
  }
  deckPlayer.push(...deck.slice(0, deckSize));
  deckRival.push(...deck.slice(deckSize));
}

extractDrivers();

const boardPlayerElement = document.querySelector('.board.player');
const boardRivalElement = document.querySelector('.board.rival');
for (let index = 0; index < deckSize; index++) {
  const playerDriver = deckPlayer[index];
  const rivalDriver = deckRival[index];
  
  boardPlayerElement.appendChild(generatePlayerCard(playerDriver));
  boardRivalElement.appendChild(generateRivalCard(rivalDriver));
}