const express = require("express");
const cors = require("cors");

const app = express();

// Verifica se a requisição está vindo de um ambiente de desenvolvimento local
if (process.env.NODE_ENV === "development") {
  corsOptions = {
    origin: ["http://localhost:8080", "http://localhost:3000"],
  };
} else {
  // Configuração para ambiente de produção (substitua a URL correta da Vercel)
  corsOptions = {
    origin: [
      "https://api-vistoria-app-florareiro.vercel.app",
      "https://vistoria-app-florareiro.vercel.app",
    ],
  };
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Api Vistoria Go" });
});

require("./app/routes/vistoria.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

export default app;
