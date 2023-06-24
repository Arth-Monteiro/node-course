import express from "express";

import brandRouter from "./routes/brand.js";

global.carListFileName = "car-list.json"


const app = express();
app.use(express.json());

app.use("/brand", brandRouter);

app.listen(3001, () => {
    console.log("API Started!");
})