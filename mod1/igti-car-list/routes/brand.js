import express from "express";

import { readFile } from "fs/promises";

const brand = express.Router();

brand.get("/:brand", async (req, res, next) => {
    try {
        const brandParam = req.params.brand;
        const carList = JSON.parse(await readFile(global.carListFileName));

        const models = carList
                        .find(carBrand => carBrand.brand.toLocaleLowerCase() === brandParam.toLocaleLowerCase())
                        .models;

        res.send(models);

    } catch (error) {
        next(error);

    }
})

brand.get("/maxModels", async (_req, res, next) => {
    try {
        const carList = JSON.parse(await readFile(global.carListFileName));
        const maxModels = carList
                            .sort((a, b) => b.models.length - a.models.length)
                            .filter((brand) => brand.models.length === carList[0].models.length)
                            .map(({brand}) => brand);

        res.send(maxModels);

    } catch (error) {
        next(error);

    }

}).get("/maxModels/qntd/:qntd", async (req, res, next) => {
    try {

        const qntd = req.params.qntd;

        const carList = JSON.parse(await readFile(global.carListFileName));
        const maxModels = carList
                            .sort((a, b) => {
                                if (b.models.length === a.models.length) {
                                    return a.brand > b.brand ? 1 : -1;
                                }
                                return b.models.length - a.models.length}
                            )
                            .map(({brand, models}) => `${brand} - ${models.length}`)
                            .slice(0, qntd);

        res.send(maxModels);

    } catch (error) {
        next(error);

    }

});

brand.get("/minModels", async (_req, res, next) => {
    try {
        const carList = JSON.parse(await readFile(global.carListFileName));
        const minModels = carList
                            .sort((a, b) => {
                                if (a.models.length === b.models.length) {
                                    return a.brand > b.brand ? 1 : -1;
                                }
                                return a.models.length - b.models.length}
                            )
                            .map(({brand, models}) => `${brand} - ${models.length}`)
                            .slice(0, qntd);

        res.send(minModels);

    } catch (error) {
        next(error);

    }

}).get("/minModels/qntd/:qntd", async (req, res, next) => {
    try {

        const qntd = req.params.qntd;

        const carList = JSON.parse(await readFile(global.carListFileName));
        const minModels = carList
                            .sort((a, b) => a.models.length - b.models.length)
                            .map(({brand, models}) => `${brand} - ${models.length}`);

        res.send(minModels.slice(0, qntd));

    } catch (error) {
        next(error);

    }

});

brand.use((error, _req, res, _next) => {

    res.status(500).send({ error: error.message });

});



export default brand;