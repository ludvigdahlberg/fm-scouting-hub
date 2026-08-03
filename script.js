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
    value: 75000000
  }
];
console.log(players);

const storedPlayers = localStorage.getItem("players");
const players = storedPlayers ? JSON.parse(storedPlayers) :players;


const scoutResults = document.getElementById("scout-results");
const positionFilter = document.getElementById("position-filter");
const sortFilter = document.getElementById("sort-filter");

function updatePlayerList() {
  const selectedPosition = positionFilter.value;
  const selectedSort = sortFilter.value;

  let updatedPlayers = [...players];

  if (selectedPosition !== "alla") {
    updatedPlayers = updatedPlayers.filter(player => player.position === selectedPosition);
  }

  updatedPlayers.sort((a, b) => {
    if (selectedSort === "name") return a.name.localeCompare(b.name);
    if (selectedSort === "age") return a.age - b.age;
    if (selectedSort === "value") return a.value - b.value;
    return 0;
  });

  renderPlayers(updatedPlayers);
}

function renderPlayers(playerList) {
  scoutResults.replaceChildren();
  if (playerList.length === 0) {
    const noPlayersMessage = document.createElement("p");
    noPlayersMessage.classList.add("no-players-message");
    noPlayersMessage.textContent = "Inga spelare hittades.";
    scoutResults.append(noPlayersMessage);
    return;
  }

  playerList.forEach(player => {
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
    playerValue.textContent = player.value.toLocaleString("sv-SE", {
      style: "currency",
      currency: "SEK",
      maximumFractionDigits: 0
    });

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
}

const playerForm = document.getElementById("player-form");
const playerNameInput = document.getElementById("player-name");
const playerAgeInput = document.getElementById("player-age");
const playerPositionInput = document.getElementById("player-position");
const playerClubInput = document.getElementById("player-club");
const playerNationalityInput = document.getElementById("player-nationality");
const playerValueInput = document.getElementById("player-value");
playerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newPlayer = {
    id: players.length + 1,
    name: playerNameInput.value,
    age: parseInt(playerAgeInput.value),
    position: playerPositionInput.value,
    club: playerClubInput.value,
    nationality: playerNationalityInput.value,
    value: Number(playerValueInput.value)
  };

  players.push(newPlayer);
  savePlayersToLocalStorage();
  updatePlayerList();
  playerForm.reset();
});

function savePlayersToLocalStorage() {
  localStorage.setItem("players", JSON.stringify(players));
}
positionFilter.addEventListener("change", updatePlayerList);
sortFilter.addEventListener("change", updatePlayerList);
updatePlayerList();
