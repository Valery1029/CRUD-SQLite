const express = require("express");
const cors = require("cors");
const db = require("./database");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// POST
app.post("/users", (req, res) => {
  const {name, email} = req.body;
  db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], function (err) {
    if (err) return res.status(500).json({error: err.message});
    res.json({id: this.lastID, name, email});
  });
});

// GET
app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({error: err.message});
    res.json(rows);
  });
});

// GET BY ID
app.get("/users/:id", (req, res) => {
  db.get("SELECT * FROM users WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({error: err.message});
    res.json(row);
  });
});

// DELETE
app.get("/users/:id", (req, res) => {
  db.run("DELETE FROM users WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({error: err.message});
    res.json(row);
  });
});

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});