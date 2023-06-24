import express from 'express'

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    let stringReturn = "<p>GET / Hello Express</p>";
    stringReturn += '<p>' + JSON.stringify(req.query) + '</p>';

    res.send(stringReturn);

}).post("/", (req, res) => {

    let stringReturn = "<p>POST / Hello Express</p>";
    stringReturn += `<p>${JSON.stringify(req.body)}</p>`

    res.send(stringReturn);

}).get("/buzz+", (_req, res) => {
    res.send("GET /buzz+ Hello Express");

});

app.get("/cliente/:id/:email", (req, res) => {
    const id = req.params.id;
    const email = req.params.email;
    const stringReturn = `<p>GET /cliente/${id}/email/${email} Hello Express</p>`;
    res.send(stringReturn);
})

app.listen(3001, () => console.log("First Express Started Successfully"))


