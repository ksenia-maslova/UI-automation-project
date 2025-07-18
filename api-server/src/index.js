import express from "express";
import sqlite3 from "sqlite3";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import { open } from "sqlite";

const SECRET = "your_jwt_secret";
const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());

let db;

// Initialize SQLite DB
(async () => {
    db = await open({
        filename: "./db.sqlite",
        driver: sqlite3.Database,
    });
    await db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'user'
  )`);
    await db.run(`CREATE TABLE IF NOT EXISTS concerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    ticket_price REAL NOT NULL,
    date TEXT NOT NULL
  )`);
    await db.run(`CREATE TABLE IF NOT EXISTS purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    concert_id INTEGER NOT NULL,
    purchase_date TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(concert_id) REFERENCES concerts(id)
  )`);
})();

// Register endpoint
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ error: "Missing fields" });
    if (typeof username !== "string" || username.trim() === "")
        return res.status(400).json({ error: "Username is required" });
    if (typeof password !== "string" || password.length < 4)
        return res
            .status(400)
            .json({ error: "Password must be at least 4 characters" });
    try {
        const result = await db.run(
            "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
            [username, password, "user"]
        );
        res.json({ success: true, id: result.lastID });
    } catch (e) {
        res.status(400).json({ error: "User already exists" });
    }
});

// Login endpoint
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await db.get(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password]
    );
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        SECRET,
        { expiresIn: "1h" }
    );
    res.json({ token });
});

// Auth middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        req.user = { role: "public" };
        return next();
    }
    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Middleware to check admin
function requireAdmin(req, res, next) {
    if (req.user.role !== "admin")
        return res.status(403).json({ error: "Admin access required" });
    next();
}

// Middleware to check logged-in user
function requireUser(req, res, next) {
    if (req.user.role !== "user" && req.user.role !== "admin")
        return res.status(403).json({ error: "User access required" });
    next();
}

// Protected endpoint
app.get("/protected", authenticateToken, (req, res) => {
    res.json({
        message: `Hello, ${req.user.username}! This is protected data.`,
    });
});

// Public: Get all concerts
app.get("/concerts", async (req, res) => {
    const concerts = await db.all("SELECT * FROM concerts");
    res.json(concerts);
});

// Public: Get concert by ID
app.get("/concerts/:id", async (req, res) => {
    const { id } = req.params;
    const concert = await db.all("SELECT * FROM concerts WHERE id = ?", [id]);
    res.json(concert);
});

// Admin: Add concert
app.post("/concerts", authenticateToken, requireAdmin, async (req, res) => {
    const { name, location, ticket_price, date } = req.body;
    if (!name || !location || !ticket_price || !date)
        return res.status(400).json({ error: "Missing fields" });
    const result = await db.run(
        "INSERT INTO concerts (name, location, ticket_price, date) VALUES (?, ?, ?, ?)",
        [name, location, ticket_price, date]
    );
    res.json({ success: true, id: result.lastID });
});

// Admin: Update concert
app.put("/concerts/:id", authenticateToken, requireAdmin, async (req, res) => {
    const { name, location, ticket_price, date } = req.body;
    const { id } = req.params;
    await db.run(
        "UPDATE concerts SET name = ?, location = ?, ticket_price = ?, date = ? WHERE id = ?",
        [name, location, ticket_price, date, id]
    );
    res.json({ success: true });
});

// Admin: Delete concert
app.delete(
    "/concerts/:id",
    authenticateToken,
    requireAdmin,
    async (req, res) => {
        const { id } = req.params;
        await db.run("DELETE FROM concerts WHERE id = ?", [id]);
        res.json({ success: true });
    }
);

// User: Purchase ticket
app.post('/purchase', authenticateToken, requireUser, async (req, res) => {
  const { concert_id } = req.body;
  if (!concert_id)
    return res.status(400).json({ error: 'Missing concert_id' });
  const concert = await db.get('SELECT * FROM concerts WHERE id = ?', [concert_id]);
  if (!concert) return res.status(404).json({ error: 'Concert not found' });
  const now = new Date().toISOString();
  const result = await db.run('INSERT INTO purchases (user_id, concert_id, purchase_date) VALUES (?, ?, ?)', [req.user.id, concert_id, now]);
  res.json({ success: true, id: result.lastID });
});

// User: Get my concerts (categorized)
app.get("/my-concerts", authenticateToken, requireUser, async (req, res) => {
    const purchases = await db.all(
        `
    SELECT c.*, p.purchase_date FROM concerts c
    JOIN purchases p ON c.id = p.concert_id
    WHERE p.user_id = ?
  `,
        [req.user.id]
    );
    const today = new Date().toISOString().slice(0, 10);
    const upcoming = [],
        todayList = [],
        past = [];
    for (const concert of purchases) {
        if (concert.date > today) upcoming.push(concert);
        else if (concert.date === today) todayList.push(concert);
        else past.push(concert);
    }
    res.json({ upcoming, today: todayList, past });
});

// Admin: Delete user by ID (cannot delete self)
app.delete('/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  if (parseInt(id) === req.user.id) {
    return res.status(400).json({ error: 'Admin cannot delete themselves' });
  }
  const user = await db.get('SELECT * FROM users WHERE id = ?', [id]);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  await db.run('DELETE FROM users WHERE id = ?', [id]);
  res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
});
