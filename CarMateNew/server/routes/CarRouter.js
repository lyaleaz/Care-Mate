import BaseRouter from './BaseRouter.js';
import Car from '../models/Car.js';

class CarRouter extends BaseRouter {
    constructor() {
        super(Car);
    }

    async getAll(req, res) {
        try {
            const cars = await this.model.find({});
            res.send(cars);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

}

export default new CarRouter().router;
