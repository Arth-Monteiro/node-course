import OrderService from '../services/order.service.js'

async function getAllOrders(req, res, next) {
    try {

        res.send(await OrderService.getAllOrders());
        logger.info(`${req.method} ${req.baseUrl + req.path}`);

    } catch (error) {
        next(error);

    }
}

async function getOrder(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const order = await OrderService.getOrder(id);

        res.send(order);
        logger.info(`${req.method} ${req.baseUrl + req.path} -  ${JSON.stringify(order)}`);

    } catch (error) {
        next(error);

    }
}

async function getSumTotalOrders(req, res, next) {
    try {
        const name = req.query.name;
        const orders   = await OrderService.getAllOrders();

        let filteredOrders;
        switch (req.path) {
            case '/total/client':
                filteredOrders = orders.filter(order => order.cliente === name && order.entregue);
                break;

            case '/total/product':
                filteredOrders = orders.filter(order => order.produto === name && order.entregue);
                break;
        }

        const sum = filteredOrders.reduce((accumulator, curValue) => accumulator + curValue.valor, 0);

        const stringReturn = `Total Value Order By ${name}: R$ ${sum}`;

        res.send(stringReturn);
        logger.info(`${req.method} ${req.baseUrl + req.path} -  ${stringReturn}`);

    } catch (error) {
        next(error);

    }
}

async function getSoldProducts(req, res, next) {

    try {

        const orders   = await OrderService.getAllOrders();
        const deliveredOrders = orders.filter(order => order.entregue);

        const orderedProducts = deliveredOrders.reduce((a, c) => (a[c.produto] = (a[c.produto] || 0) + 1, a), {});

        res.send(orderedProducts);

    } catch (error) {
        next(error);

    }

}


async function createOrder(req, res, next) {
    try {
        const order = req.body;

        if (!order.cliente || !order.produto || order.valor == null) {
            throw new Error("Name, Product and Value are required!")
        }

        res.send(await OrderService.createOrder(order));
        logger.info(`${req.method} ${req.baseUrl + req.path} -  ${JSON.stringify(order)}`);

    } catch (error) {
        next(error);

    }
}

async function updateOrder(req, res, next) {
    try {
        const order = req.body;

        if (!order.id || !order.cliente || !order.produto 
            || order.valor == null || order.entregue == null) {
            throw new Error("Id, Name, Product, Value and Delivery are required!")
        }

        res.send(await OrderService.updateOrder(order));
        logger.info(`${req.method} ${req.baseUrl + req.path} -  ${JSON.stringify(order)}`);

    } catch (error) {
        next(error);

    }
}

async function updateDelivered(req, res, next) {
    try {
        let order = req.body;

        if (!order.id || order.entregue == null) {
            throw new Error("ID and Delivered are required!");
        }

        if (typeof order.entregue !== 'boolean') {
            throw new Error("Delivered must be boolean!");
        }

        order = await OrderService.updateDelivered(order);
        res.send(order);
        logger.info(`${req.method} ${req.baseUrl + req.path} -  ${JSON.stringify(order)}`);

    } catch (error) {
        next(error);

    }
}

async function deleteOrder(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        
        OrderService.deleteOrder(id);

        res.end();
        logger.info(`${req.method} ${req.baseUrl + req.path} -  id: ${id}`);

    } catch (error) {
        next(error);

    }
}

export default {
    getAllOrders,
    getOrder,
    getSumTotalOrders,
    getSoldProducts,
    createOrder,
    updateOrder,
    updateDelivered,
    deleteOrder,
};