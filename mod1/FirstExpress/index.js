import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("GET / First Express Nodemon");
});

app.listen(3001, () => console.log("API Started Successfully"));