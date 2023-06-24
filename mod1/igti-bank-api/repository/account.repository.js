import { readFile, writeFile } from 'fs/promises';

async function getAllAccounts() {
    const data = JSON.parse(await readFile(global.fileName));
    return data.accounts;
}

async function getAccount(id) {
    const accounts = await getAllAccounts();

    const account = accounts.find(acc => acc.id === id);

    if (!account) {
        throw new Error("Register not found!");
    }

    return account;
}

async function insertAccount(account) {
    const data = JSON.parse(await readFile(global.fileName));

    account = {
        id: data.nextId++,
        name: account.name,
        balance: account.balance
    };

    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    return account;
}

async function deleteAccount(id) {
    const data = JSON.parse(await readFile(global.fileName));

    data.accounts = data.accounts.filter(acc => acc.id !== id);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

}

async function updateAccount(account) {
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex(acc => acc.id === account.id);

    if (index === -1) {
        throw new Error("Register not found");
    }

    data.accounts[index] = {
        id: account.id,
        name: account.name,
        balance: account.balance
    };

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    return account;
}

export default {
    getAllAccounts,
    getAccount,
    insertAccount,
    deleteAccount,
    updateAccount,
}