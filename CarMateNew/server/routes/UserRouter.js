import BaseRouter from './BaseRouter.js';
import User from '../models/User.js';

class UserRouter extends BaseRouter {
    constructor() {
        super(User);
    }

    async getAll(req, res) {
        try {
            const users = await this.model.find({}).populate('orders');
            res.send(users);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async getOne(req, res) {
        const id = req.params.id;
        try {
            const user = await this.model.findById(id).populate('orders');
            res.send(user);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async update(req, res) {
        const id = req.params.id;
        const updatedUser = req.body;
        try {
            await this.model.findByIdAndUpdate(id, updatedUser);
            const users = await this.model.find({}).populate('orders');
            res.send(users);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async delete(req, res) {
        const id = req.params.id;
        try {
            await this.model.findByIdAndDelete(id);
            const users = await this.model.find({}).populate('orders');
            res.send(users);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }
}

export default new UserRouter().router;
