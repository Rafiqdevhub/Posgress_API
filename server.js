const express = require("express");
const dotenv = require("dotenv");
const pool = require("./config/database");
const errorHandling = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoute");
const createUserTable = require("./data/createUserTable");

const app = express();
app.use(express.json());
dotenv.config();

const port = process.env.PORT || 500;

app.use(errorHandling);

createUserTable();

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.json(`Connected to database: ${result.rows[0].current_database}`);
});

app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
