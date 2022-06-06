import dependencyContainer from "./bootstrap.js";
import express from "express";
import initRoutes from "./src/user-rest-interface/rest-routes.js";
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());
app.use(cors({origin:true,credentials: true}));

initRoutes(app, dependencyContainer);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})