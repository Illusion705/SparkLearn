// dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

// create app
const app = express();

// app setup
app.set("view-engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 5 } // 5 days
}));

// routers
const mainRouter = require("./routes/main");
const apiRouter = require("./routes/api");
const adminRouter = require("./routes/admin");

app.use("/", mainRouter);
app.use("/api", apiRouter);
app.use("/admin", adminRouter);

// database setup
const dbString = process.env.DB_STRING;
const port = process.env.PORT || 3001;

console.log("Connecting to database...");
mongoose.connect(dbString, () => {
  console.log("Connected to database.");

  // init app
  app.listen(port, () => console.log(`Server listening on port ${port}.`));
});