import express from "express";

import AccountController from '../controllers/account.controller.js';

const account = express.Router();

account.post("/",           AccountController.createAccount);
account.put("/",            AccountController.updateAccount);
account.patch("/balance",   AccountController.updateBalance);
account.get("/",            AccountController.getAllAccounts);
account.get("/:id",         AccountController.getAccount)
account.delete("/:id",      AccountController.deleteAccount);

account.use((error, req, res, _next) => {

    logger.error(`${req.method} ${req.baseUrl} -  ${error.message}`);
    res.status(500).send({ error: error.message });

});

export default account;