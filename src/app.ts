import express from "express";
import bodyparser from "body-parser";

import router from "./router";

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", process.env.VIEWS_DIR || "./src/templates");
app.set("view engine", "pug");

app.use(bodyparser.json());

router(app);

export default app;
