import express from "express";
import bodyparser from "body-parser";
import { Model } from "objection";

import router from "./router";

const Knex = require("knex");
const knexConfig = require("../knexfile");
const knex = Knex(knexConfig.development);
Model.knex(knex);

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", process.env.VIEWS_DIR || "./src/templates");
app.set("view engine", "pug");

app.use(bodyparser.json());

router(app);

export default app;
