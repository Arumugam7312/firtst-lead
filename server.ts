import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("salon.db");

// Check if 'image' column exists in 'services' table
try {
  const tableInfo = db.prepare("PRAGMA table_info(services)").all() as any[];
  const hasImageColumn = tableInfo.some(col => col.name === 'image');
  if (tableInfo.length > 0 && !hasImageColumn) {
    console.log("Dropping 'services' table to add 'image' column...");
    db.exec("DROP TABLE services");
  }
} catch (e) {
  // Table might not exist yet
}

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    price TEXT,
    duration TEXT,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    service_id INTEGER,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    stylist TEXT,
    notes TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id)
  );
`);

// Seed initial services if empty
const serviceCount = db.prepare("SELECT COUNT(*) as count FROM services").get() as { count: number };
if (serviceCount.count === 0) {
  const insert = db.prepare("INSERT INTO services (name, description, category, price, duration, image) VALUES (?, ?, ?, ?, ?, ?)");
  const initialServices = [
    ["Layer Cut", "Professional layered haircut for women", "Haircuts", "₹499", "45 mins", "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800"],
    ["Feather Cut", "Stylish feather cut for a light feel", "Haircuts", "₹599", "45 mins", "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=800"],
    ["Regular Cut", "Standard trim and cut", "Haircuts", "₹299", "30 mins", "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=800"],
    ["Hair Styling", "Blow dry and styling for events", "Styling", "₹399", "30 mins", "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800"],
    ["Hair Coloring", "Full hair color or highlights", "Coloring", "₹999", "90 mins", "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=800"],
    ["Gold Facial", "Premium facial for glowing skin", "Facials", "₹1499", "60 mins", "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800"],
    ["Eyebrow Threading", "Precise eyebrow shaping", "Threading", "₹50", "15 mins", "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=800"],
    ["Hair Spa", "Deep conditioning and scalp massage", "Spa", "₹799", "60 mins", "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800"],
    ["Bridal Makeup", "Complete bridal transformation", "Bridal", "₹4999", "180 mins", "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800"]
  ];
  for (const s of initialServices) {
    insert.run(...s);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/services", (req, res) => {
    const services = db.prepare("SELECT * FROM services").all();
    res.json(services);
  });

  app.post("/api/appointments", (req, res) => {
    const { name, phone, email, service_id, date, time, stylist, notes } = req.body;
    try {
      const stmt = db.prepare(`
        INSERT INTO appointments (name, phone, email, service_id, date, time, stylist, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const result = stmt.run(name, phone, email, service_id, date, time, stylist, notes);
      res.status(201).json({ id: result.lastInsertRowid, message: "Appointment requested successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create appointment" });
    }
  });

  app.get("/api/appointments", (req, res) => {
    const appointments = db.prepare(`
      SELECT a.*, s.name as service_name 
      FROM appointments a 
      LEFT JOIN services s ON a.service_id = s.id
      ORDER BY a.created_at DESC
    `).all();
    res.json(appointments);
  });

  app.patch("/api/appointments/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      db.prepare("UPDATE appointments SET status = ? WHERE id = ?").run(status, id);
      res.json({ message: "Appointment updated" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update appointment" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
