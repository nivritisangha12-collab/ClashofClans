async function searchPlayer() {
    const tag = document.getElementById("tagInput").value;

    if (!tag) {
        alert("Enter a player tag!");
        return;
    }

    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");

    // 🔥 Dummy data (replace later with API)
    setTimeout(() => {
        const data = {
            name: "ClashKing",
            trophies: 5200,
            expLevel: 180,
            clan: { name: "Warriors" }
        };

        document.getElementById("name").innerText = data.name;
        document.getElementById("trophies").innerText = data.trophies;
        document.getElementById("level").innerText = data.expLevel;
        document.getElementById("clan").innerText = data.clan.name;

        document.getElementById("loading").classList.add("hidden");
        document.getElementById("result").classList.remove("hidden");
    }, 1000);
}
