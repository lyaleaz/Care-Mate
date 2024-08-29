import BaseRouter from "./BaseRouter.js";
import Service from "../models/Service.js";

class ServiceRouter extends BaseRouter {
  constructor() {
    super(Service);
  }

  async getAll(req, res) {
    try {
      const services = await this.model.find({});
      res.send(services);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async create(req, res) {
    const newService = req.body;
    try {
      await this.model.create(newService);
      const services = await this.model.find({}).populate("car");
      res.send(services);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async getOne(req, res) {
    const id = req.params.id;
    try {
      const service = await this.model.findById(id).populate("car");
      res.send(service);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default new ServiceRouter().router;
