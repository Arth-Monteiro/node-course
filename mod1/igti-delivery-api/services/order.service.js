import OrderRepository from '../repository/order.repository.js';

async function createOrder(order) {
    return await OrderRepository.insertOrder(order);
}

async function updateOrder(order) {
    return await OrderRepository.updateOrder(order);
}

async function updateDelivered(order) {
    const ord = await OrderRepository.getOrder(order.id);
    ord.entregue = order.entregue;
    return await OrderRepository.updateOrder(ord);
}

async function deleteOrder(id) {
    return await OrderRepository.deleteOrder(id);
}

async function getAllOrders() {
    return await OrderRepository.getAllOrders();
}

async function getOrder(id) {
    return await OrderRepository.getOrder(id);
}

export default {
    getAllOrders,
    getOrder,
    createOrder,
    updateOrder,
    updateDelivered,
    deleteOrder,
}