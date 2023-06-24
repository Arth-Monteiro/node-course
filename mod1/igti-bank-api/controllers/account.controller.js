import AccountService from '../services/account.service.js'

async function createAccount(req, res, next) {
    try {
        const account = req.body;

        if (!account.name || account.balance == null) {
            throw new Error("Name and Balance are required!")
        }

        res.send(await AccountService.createAccount(account));
        logger.info(`${req.method} ${req.baseUrl} -  ${JSON.stringify(account)}`);

    } catch (error) {
        next(error);

    }
}

async function updateAccount(req, res, next) {
    try {
        const account = req.body;

        if (!account.id || !account.name || account.balance == null) {
            throw new Error("Id, name and Balance are required!")
        }

        res.send(await AccountService.updateAccount(account));
        logger.info(`${req.method} ${req.baseUrl} -  ${JSON.stringify(account)}`);

    } catch (error) {
        next(error);

    }
}

async function updateBalance(req, res, next) {
    try {
        let account = req.body;

        if (!account.id || account.balance == null) {
            throw new Error("ID and balance are required!")
        }

        account = await AccountService.updateBalance(account);
        res.send(account);
        logger.info(`${req.method} ${req.baseUrl} -  ${JSON.stringify(account)}`);

    } catch (error) {
        next(error);

    }
}

async function getAllAccounts(req, res, next) {
    try {

        res.send(await AccountService.getAllAccounts());
        logger.info(`${req.method} ${req.baseUrl}`);

    } catch (error) {
        next(error);

    }
}

async function getAccount(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const account = await AccountService.getAccount(id);
        
        res.send(account);
        logger.info(`${req.method} ${req.baseUrl} -  ${JSON.stringify(account)}`);

    } catch (error) {
        next(error);

    }
}

async function deleteAccount(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        
        AccountService.deleteAccount(id);

        res.end();
        logger.info(`${req.method} ${req.baseUrl} -  id: ${id}`);

    } catch (error) {
        next(error);

    }
}

export default {
    createAccount,
    updateAccount,
    updateBalance,
    getAllAccounts,
    getAccount,
    deleteAccount
};