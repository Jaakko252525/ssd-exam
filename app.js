const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// Load common passwords into a Set for quick lookup
const commonPasswords = new Set(
  fs
    .readFileSync(
      path.join(__dirname, "10-million-password-list-top-1000.txt"),
      "utf-8"
    )
    .split("\n")
    .map((password) => password.trim())
);

// Password validation function
function validatePassword(password) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/; // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
  if (!passwordRegex.test(password)) return false;
  if (commonPasswords.has(password)) return false; // Block common passwords
  return true;
}

// Routes
app.get("/", (req, res) => {
  res.render("home", { error: null });
});

app.post("/login", (req, res) => {
  const { password } = req.body;

  if (!validatePassword(password)) {
    return res.render("home", {
      error: "Password does not meet requirements.",
    });
  }

  // If password is valid
  res.render("welcome", { password });
});

app.post("/logout", (req, res) => {
  res.redirect("/");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
