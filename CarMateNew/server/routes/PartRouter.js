import BaseRouter from './BaseRouter.js';
import Part from '../models/Part.js';

class PartRouter extends BaseRouter {
    constructor() {
        super(Part);
    }

    async getAll(req, res) {
        try {
            const parts = await this.model.find({});
            res.send(parts);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async getMany(req, res) {
        const category = req.params.category;
        try {
            const parts = await this.model.find({categorey: category});
            res.send(parts);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }
}

export default new PartRouter().router;
