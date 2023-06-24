import express from "express";

import OrderController from '../controllers/order.controller.js';

const order = express.Router();

order.get("/",              OrderController.getAllOrders);
order.get("/:id",           OrderController.getOrder);
order.get("/total/client",  OrderController.getSumTotalOrders);
order.get("/total/product", OrderController.getSumTotalOrders);
order.get("/products/sold", OrderController.getSoldProducts);

order.post("/",             OrderController.createOrder);
order.put("/",              OrderController.updateOrder);
order.patch("/delivered",   OrderController.updateDelivered);
order.delete("/:id",        OrderController.deleteOrder);

order.use((error, req, res, _next) => {

    logger.error(`${req.method} ${req.baseUrl} -  ${error.message}`);
    res.status(500).send({ error: error.message });

});

export default order;