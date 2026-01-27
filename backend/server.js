const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  <p>hello</p>;
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}/`);
});
