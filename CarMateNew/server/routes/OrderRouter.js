import BaseRouter from './BaseRouter.js';
import Order from '../models/Order.js';

class OrderRouter extends BaseRouter {
    constructor() {
        super(Order);
    }

    async getAll(req, res) {
        try {
            const orders = await this.model.find({}).populate('car').populate('parts').populate('services');
            res.send(orders);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }
}

export default new OrderRouter().router;
