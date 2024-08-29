import express from 'express';

class BaseRouter {
    constructor(model) {
        this.router = express.Router();
        this.model = model;
        this.initializeRoutes();
    }

    async getAll(req, res) {
        try {
            const items = await this.model.find({});
            res.send(items);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async create(req, res) {
        const newItem = req.body;
        try {
            await this.model.create(newItem);
            const items = await this.model.find({});
            res.send(items);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async getOne(req, res) {
        const id = req.params.id;
        try {
            const item = await this.model.findById(id);
            res.send(item);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async getMany(req, res) {
        const category = req.params.category;
        try {
            const parts = await this.model.find({category: category}).populate('car');
            res.send(parts);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    initializeRoutes() {
        this.router.get('/', this.getAll.bind(this));
        this.router.post('/', this.create.bind(this));
        this.router.get('/:id', this.getOne.bind(this));
        this.router.get('/category/:category', this.getMany.bind(this));
    }
}

export default BaseRouter;
