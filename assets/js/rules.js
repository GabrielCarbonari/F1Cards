const rulesListElement = document.querySelector('.rules-list');

// O objeto rules vem do carregamento de /data/rules.js
rules.forEach(item => {
  const listItemElement = document.createElement('li');
  listItemElement.textContent = item.rule;
  rulesListElement.appendChild(listItemElement);
});