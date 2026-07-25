const players = [
  {
  id: 1,
  name: "Erik",
  age: 24,
  position: "Midfielder",
  club: "AIK",
  nationality: "Sverige",
  value: 5000000
  },
  {
    id: 2,
    name: "Alex",
    age: 21,
    position: "Striker",
    club: "Malmö FF",
    nationality: "Sverige",
    value: 7500000
  }
];
console.log(players);

const scoutResults = document.getElementById("scout-results");
players.forEach(player => {
  const playerCard = document.createElement("article");
  playerCard.classList.add("player-card");
  const playerName = document.createElement("h3");
  playerName.textContent = player.name;
  const playerAge = document.createElement("p");
  playerAge.textContent = `${player.age} years old`;
  const playerPosition = document.createElement("p");
  playerPosition.textContent = player.position;
  const playerClub = document.createElement("p");
  playerClub.textContent = player.club;
  const playerNationality = document.createElement("p");
  playerNationality.textContent = player.nationality;
  const playerValue = document.createElement("p");
  playerValue.textContent = player.value.toLocaleString("sv-SE", { style: "currency", currency: "SEK", maximumFractionDigits: 0 });
 playerCard.append(
  playerName,
  playerAge,
  playerPosition,
  playerClub,
  playerNationality,
  playerValue
);

scoutResults.append(playerCard);
  
});