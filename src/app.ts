import express, { Express } from "express";
import bodyparser from "body-parser";
import { Model } from "objection";
import octokit from "@octokit/rest";

import router from "./router";

const Knex = require("knex");
const knexConfig = require("../knexfile");
const knex = Knex(knexConfig.development);
Model.knex(knex);

const app = express();

const setRequiredVar = (key: string, app: Express) => {
  const value = process.env[key];
  if (!value) {
    throw Error(`${key} not set in environment`);
  }
  app.set(key, value);
};

["GITHUB_PAT"].forEach(key => setRequiredVar(key, app));
const octo = new octokit();
octo.authenticate({
  type: "oauth",
  token: app.get("GITHUB_PAT")
});
app.set("github", octo);

app.set("port", process.env.PORT || 3000);
app.set("views", process.env.VIEWS_DIR || "./src/templates");
app.set("view engine", "pug");

app.use(bodyparser.json());

router(app);

export default app;
