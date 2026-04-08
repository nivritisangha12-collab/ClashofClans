let allPlayers = []; 

let isListView = false;
function renderPlayers(players) {
  const container = document.getElementById("players-container");
  container.innerHTML = ""; 

  const sortValue = document.getElementById("sortToggle").value;

  const sortedPlayers = [...players].sort((a, b) => {
    if (sortValue === "rank") return a.rank - b.rank;
    if (sortValue === "name") return a.name.localeCompare(b.name);
    if (sortValue === "clan") return a.clan.localeCompare(b.clan);
    return 0;
  });

  sortedPlayers.forEach((player, index) => {
    const card = document.createElement("div");
    card.classList.add("player-card");


    if (player.rank === 1) card.classList.add("top-1");
    if (player.rank === 2) card.classList.add("top-2");
    if (player.rank === 3) card.classList.add("top-3");


    card.style.animationDelay = `${index * 0.05}s`;

    card.innerHTML = `
      <div class="rank-badge">#${player.rank}</div>
      <img src="${player.image}" alt="${player.name}" />
      <div class="player-name">${player.name}</div>
      <div class="player-info">🔖 <span>${player.tag}</span></div>
      <div class="player-info">🛡️ <span>${player.clan}</span></div>
      <div class="player-info">🏆 <span>${player.clanLeague}</span></div>
    `;
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      window.location.href = `player.html?tag=${encodeURIComponent(player.tag)}`;
    });

    container.appendChild(card);
  });
}

const spinner = document.getElementById("loadingSpinner");
const playersContainer = document.getElementById("players-container");

if (spinner) spinner.style.display = "flex";

fetch("data.json")
  .then(response => {
    if (!response.ok) throw new Error("Server communication failed.");
    return response.json();
  })
  .then(data => {
    setTimeout(() => {
      if (spinner) spinner.style.display = "none";
      allPlayers = data.players;
      populateClanFilter(allPlayers);
      renderPlayers(allPlayers);
    }, 1500);
  })
  .catch(error => {
    console.error("Error loading data:", error);
    if (spinner) {
      spinner.innerHTML = `<p style="color:#ef4444; font-weight:bold;">🚨 Failed to connect to server. Please try again.</p>`;
    }
  });
function populateClanFilter(players) {
  const clanFilter = document.getElementById("clanFilter");
  const clans = [...new Set(players.map(p => p.clan))].sort();
  
  clans.forEach(clan => {
    const option = document.createElement("option");
    option.value = clan;
    option.textContent = clan;
    clanFilter.appendChild(option);
  });
}

const searchInput = document.getElementById("searchInput");
const leagueFilter = document.getElementById("leagueFilter");
const clanFilter = document.getElementById("clanFilter");

function applyFilters() {
  const query = searchInput.value.toLowerCase();
  const league = leagueFilter.value.toLowerCase();
  const clan = clanFilter.value.toLowerCase();

  const filteredPlayers = allPlayers.filter(player => {
    const matchesQuery = 
      player.name.toLowerCase().includes(query) ||
      player.tag.toLowerCase().includes(query);

    const matchesLeague = player.clanLeague.toLowerCase().includes(league);
    const matchesClan = clan === "" || player.clan.toLowerCase() === clan;

    return matchesQuery && matchesLeague && matchesClan;
  });

  renderPlayers(filteredPlayers);
}

searchInput.addEventListener("input", applyFilters);
leagueFilter.addEventListener("change", applyFilters);
clanFilter.addEventListener("change", applyFilters);
document.getElementById("sortToggle").addEventListener("change", applyFilters);

document.getElementById("viewToggle").addEventListener("click", (e) => {
  isListView = !isListView;
  const container = document.getElementById("players-container");
  
  if (isListView) {
    container.classList.add("list-view");
    e.target.textContent = "🎛️ Grid View";
  } else {
    container.classList.remove("list-view");
    e.target.textContent = "🏆 Leaderboard View";
  }
});
