const express = require("express");
const cors = require("cors");
const db = require("./database");
const bcrypt = require("./appBcrypt");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

/********** ROUTES API ROLES**********/
app.post('/api_v1/roles', (req, res) => {
  const { name } = req.body;
  db.run("INSERT INTO role (Role_name) VALUES (?)", [name], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, name });
  });
});

// Get all role
app.get('/api_v1/roles', (req, res) => {
  db.all("SELECT * FROM role", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get role by id
app.get('/api_v1/roles/:id', (req, res) => {
  db.get("SELECT * FROM role WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// Update role
app.put('/api_v1/roles/:id', (req, res) => {
  const { user } = req.body;
  db.run("UPDATE role SET Role_user = ? WHERE Role_id = ?", [user, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

// Delete role
app.delete('/api_v1/roles/:id', (req, res) => {
  db.run("DELETE FROM role WHERE Role_id = ?", [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

/**********END ROUTES API ROLES**********/
/**********ROUTES API USERS**********/
// POST
app.post("/api_v1/users", async (req, res) => {
  const {user, password, role} = req.body;
  const hashedPassword = await bcrypt.encryptPassword(password);
  db.run("INSERT INTO users (User_email, User_password, Role_fk) VALUES (?, ?, ?)", [user, hashedPassword, role], function (err) {
    if (err) return res.status(500).json({error: err.message});
    res.json({id: this.lastID, user, hashedPassword, role});
  });
});

// GET
app.get("/api_v1/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({error: err.message});
    res.json(rows);
  });
});

// GET BY ID
app.get("/api_v1/users/:id", (req, res) => {
  db.get("SELECT * FROM users WHERE User_id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({error: err.message});
    res.json(row);
  });
});

// PUT
app.put("/api_v1/users/:id", (req, res) => {
  const {user, role} = req.body;
  db.run("UPDATE users SET User_email = ?, Role_fk = ? WHERE User_id = ?", [user, role, req.params.id], function (err) {
    if (err) return res.status(500).json({error: err.message});
    res.json({updated: this.changes});
  });
});

// DELETE
app.delete("/api_v1/users/:id", (req, res) => {
  db.run("DELETE FROM users WHERE User_id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({error: err.message});
    res.json({deleted: this.changes});
  });
});
/********** END ROUTES API USERS**********/
/****************ROUTES API LOGIN */

app.post("/api_v1/login", (req, res) => {
  const { user, password } = req.body;
  db.get("SELECT * FROM users WHERE User_email = ?", [user], async (err, row) => {
    if (err) return res.status(500).json({ error: "Query error" });
    if (!row) return res.status(401).json({ error: "User not found" });
    const isMatch = await bcrypt.comparePassword(password, row.User_password);
    if (!isMatch) {
        return res.status(401).json({status:401, message: 'Error password' });
      }
    res.status(200).json({status:200,row});
  });
});
/****************END ROUTES API LOGIN */

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});