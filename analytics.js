
document.getElementById('backBtn').addEventListener('click', () => {
  window.location.href = 'index.html';
});

fetch("data.json")
  .then(response => response.json())
  .then(data => {
    const players = data.players;
    

    document.getElementById("totalPlayersStat").textContent = players.length;


    const clanCounts = {};
    players.forEach(p => {
      clanCounts[p.clan] = (clanCounts[p.clan] || 0) + 1;
    });


    const leagueCounts = {};
    players.forEach(p => {
      leagueCounts[p.clanLeague] = (leagueCounts[p.clanLeague] || 0) + 1;
    });

    renderCharts(clanCounts, leagueCounts);
  })
  .catch(error => console.error("Error loading analytics data:", error));

function renderCharts(clanCounts, leagueCounts) {
  Chart.defaults.color = "#94a3b8";
  Chart.defaults.font.family = "'Outfit', sans-serif";

  const ctxBar = document.getElementById('clanBarChart').getContext('2d');
  new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: Object.keys(clanCounts),
      datasets: [{
        label: 'Players per Clan',
        data: Object.values(clanCounts),
        backgroundColor: 'rgba(251, 191, 36, 0.7)',
        borderColor: '#fbbf24',
        borderWidth: 1,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { 
          beginAtZero: true,
          ticks: { stepSize: 1 },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });

  const ctxPie = document.getElementById('leaguePieChart').getContext('2d');
  const leagueLabels = Object.keys(leagueCounts);
  const leagueData = Object.values(leagueCounts);
  
  const colors = [
    '#fbbf24', '#f59e0b', '#d97706', '#b45309', 
    '#e2e8f0', '#94a3b8', '#64748b', '#cbd5e1'
  ];

  new Chart(ctxPie, {
    type: 'doughnut',
    data: {
      labels: leagueLabels,
      datasets: [{
        data: leagueData,
        backgroundColor: colors.slice(0, leagueLabels.length),
        borderColor: '#1e293b',
        borderWidth: 2,
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}
