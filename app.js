import dependencyContainer from "./bootstrap.js";
import express from "express";
import initRoutes from "./src/user-rest-interface/rest-routes.js";

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

initRoutes(app, dependencyContainer);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})