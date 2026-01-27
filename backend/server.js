const dotenv = require("dotenv");
const express = require("express");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use((req, res, next) => {
  res.send("hello from server");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}/`);
});
