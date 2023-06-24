import AccountRepository from '../repository/account.repository.js';

async function createAccount(account) {
    return await AccountRepository.insertAccount(account);
}

async function updateAccount(account) {
    return await AccountRepository.updateAccount(account);
}

async function updateBalance(account) {
    const acc = await AccountRepository.getAccount(account.id);
    acc.balance = account.balance;
    return await AccountRepository.updateAccount(acc);
}
 
async function getAllAccounts() {
    return await AccountRepository.getAllAccounts();
}

async function getAccount(id) {
    return await AccountRepository.getAccount(id);
}

async function deleteAccount(id) {
   return await AccountRepository.deleteAccount(id);
}

export default {
    createAccount,
    updateAccount,
    updateBalance,
    getAllAccounts,
    getAccount,
    deleteAccount,
}