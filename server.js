const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjA0ZTJmYjVkLTI3NzktNGM3Ny05YmU5LThhMjVmMDA0Y2UzNyIsImlhdCI6MTc3NTA1MTk1Nywic3ViIjoiZGV2ZWxvcGVyLzI5ODFkOGYyLTQxMjMtY2FmZC0yZDBmLTFmOTc2N2VmMzYzOCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjExNS4yNDQuMTQxLjIwMiJdLCJ0eXBlIjoiY2xpZW50In1dfQ.Ba3XCeWPfspCu31Kr3s59aoQg4rMCAtsQYGuEcSZ_TOO_RwAZ9jWYp867SBQq87H7VKsCR_vIXJeAMqFytpV9w"; // 👈 your key

app.get("/player/:tag", async (req, res) => {
    try {
        const tag = req.params.tag.replace("#", "%23");

        const response = await fetch(`https://api.clashofclans.com/v1/players/${tag}`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        });

        const data = await response.json();
        res.json(data);

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(3000, () => console.log("🔥 Server running on port 3000"));
