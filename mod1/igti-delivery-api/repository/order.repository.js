import { readFile, writeFile } from 'fs/promises';

async function insertOrder(order) {
    const data = JSON.parse(await readFile(global.fileName));

    order = {
        id: data.nextId++,
        cliente: order.cliente,
        produto: order.produto,
        valor: order.valor,
        entregue: false,
        timestamp: new Date()
    };

    data.pedidos.push(order);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    return order;
}

async function updateOrder(order) {
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.pedidos.findIndex(acc => acc.id === order.id);

    if (index === -1) {
        throw new Error("Register not found");
    }

    data.pedidos[index] = {
        id: order.id,
        cliente: order.cliente,
        produto: order.produto,
        valor: order.valor,
        entregue: order.entregue,
    };

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    return order;
}


async function getAllOrders() {
    const data = JSON.parse(await readFile(global.fileName));
    return data.pedidos;
}

async function getOrder(id) {
    const orders = await getAllOrders();

    const order = orders.find(ord => ord.id === id);

    if (!order) {
        throw new Error("Register not found!");
    }

    return order;
}


async function deleteOrder(id) {
    const data = JSON.parse(await readFile(global.fileName));

    data.pedidos = data.pedidos.filter(order => order.id !== id);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

}

export default {
    insertOrder,
    updateOrder,
    getAllOrders,
    getOrder,
    deleteOrder,
}