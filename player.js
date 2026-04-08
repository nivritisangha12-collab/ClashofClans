
const urlParams = new URLSearchParams(window.location.search);
const playerTag = urlParams.get('tag');

const backBtn = document.getElementById('backBtn');
if (backBtn) {
  backBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

const detailsContainer = document.getElementById('player-details-container');

if (!playerTag) {
  detailsContainer.innerHTML = `<h2>No player tag specified!</h2>`;
} else {

  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      const player = data.players.find(p => p.tag === playerTag);
      
      if (!player) {
        detailsContainer.innerHTML = `<h2>Player not found!</h2>`;
        return;
      }

      renderPlayerDetails(player);
    })
    .catch(error => {
      console.error("Error loading data:", error);
      detailsContainer.innerHTML = `<h2>Error loading player data.</h2>`;
    });
}

function renderPlayerDetails(player) {
  let medalClass = "";
  if (player.rank === 1) medalClass = "gold-glow";
  if (player.rank === 2) medalClass = "silver-glow";
  if (player.rank === 3) medalClass = "bronze-glow";

  detailsContainer.innerHTML = `
    <div class="details-card ${medalClass}">
      <div class="details-header">
        <img src="${player.image}" alt="${player.name}" class="details-avatar" />
        <div class="details-title">
          <h2>${player.name}</h2>
          <div class="details-tag">${player.tag}</div>
        </div>
        <div class="details-rank">Rank #${player.rank}</div>
      </div>
      
      <div class="details-body">
        <div class="stat-box">
          <h3>Clan</h3>
          <p>🛡️ ${player.clan}</p>
        </div>
        <div class="stat-box">
          <h3>League</h3>
          <p>🏆 ${player.clanLeague}</p>
        </div>
        <div class="stat-box">
          <h3>Player ID</h3>
          <p>🔖 ${player.tag}</p>
        </div>
        <div class="stat-box">
          <h3>Status</h3>
          <p>🟢 Active Legend</p>
        </div>
      </div>
    </div>
  `;
}
