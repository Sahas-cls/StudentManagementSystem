const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const morgan = require("morgan");
const db = require("./models");

// load .env
require("dotenv").config();
const frotendUrl = process.env.FRONTEND_URL;
// middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// ✅ Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.log("path from error handler ====== : ", err.path);
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
    path: err.path || null,
  });
});

db.sequelize
  .sync({})
  .then(() => {
    app.listen(4000, (err) => {
      if (err) {
        console.log("failed to start server: ", err);
      } else {
        console.log(`server is running on http://localhost:${port}`);
      }
    });
  })
  .catch((err) => {
    console.log("error while sync with database: ", err);
  });
