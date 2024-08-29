import Car from "../models/Car.js";
import cars from "../data/cars.json" assert { type: "json" };
import Service from "../models/Service.js";
import services from "../data/services.json" assert { type: "json" };
import Part from "../models/Part.js";
import parts from "../data/parts.json" assert { type: "json" };
import Order from "../models/Order.js";
import orders from "../data/orders.json" assert { type: "json" };
import User from "../models/User.js";
import users from "../data/users.json" assert { type: "json" };
import mongoose from "mongoose";

const populateCars = async () => {
  await Car.insertMany(cars);
};

const populateServices = async () => {
  await Service.insertMany(services);
};

const populateParts = async () => {
  await Part.insertMany(parts);
  const allParts = await Part.find({});
  const allCars = await Car.find({});
  allParts.forEach(async (p) => {
    const randQty = ((min, max) => Math.random() * (max - min) + min)(3, 8);
    const randCarsIndices = Array.from({ length: randQty }, () =>
      Math.floor(Math.random() * allCars.length)
    );
    p.cars = randCarsIndices.map((idx) => allCars[idx]);
    await p.save();
  });
};

const populateOrders = async () => {
  await Order.insertMany(orders);
  const allOrders = await Order.find({});
  const allParts = await Part.find({});
  const allServices = await Service.find({});

  allOrders[0].carServices = [getItem(allServices, 0, 1, 5, "processing")];
  await allOrders[0].save();

  allOrders[1].carParts = [
    getItem(allParts, 5, 1, 0, "pending"),
    getItem(allParts, 23, 1, 3, "pending"),
    getItem(allParts, 37, 1, 0, "pending"),
  ];
  await allOrders[1].save();

  allOrders[2].carParts = [getItem(allParts, 11, 2, 4, "delivered")];
  allOrders[2].carServices = [
    getItem(allServices, 2, 1, 2, "delivered"),
    getItem(allServices, 3, 1, 0, "delivered"),
  ];
  await allOrders[2].save();
};

const getItem = (collection, idx, amount, discount, status) => {
  return { item: collection[idx], amount, discount, status };
};

const populateUsers = async () => {
  await User.insertMany(users);
  const allUsers = await User.find({});
  const allCars = await Car.find({});
  const allOrders = await Order.find({});

  allUsers[0].car = { car: allCars[2], LPN: "20457221" };
  allUsers[0].orders = [allOrders[0], allOrders[1]];
  await allUsers[0].save();
  allOrders[0].user = allUsers[0];
  allOrders[1].user = allUsers[0];
  allOrders[0].save();
  allOrders[1].save();

  allUsers[1].car = { car: allCars[12], LPN: "76430710" };
  allUsers[1].orders = [allOrders[2]];
  await allUsers[1].save();
  allOrders[2].user = allUsers[1];
  allOrders[2].save();

  allUsers[2].car = { car: allCars[7], LPN: "03186339" };
  await allUsers[2].save();
};

const populateDB = async () => {
  try {
    await populateCars();
    await populateServices();
    await populateParts();
    await populateOrders();
    await populateUsers();
    console.log("DB is populated successfully ...");
  } catch (error) {
    console.log(error);
  }
};

const dropDB = async () => {
  try {
    // await mongoose.connection.db.dropDatabase();
    await Car.deleteMany({});
    await Service.deleteMany({});
    await Part.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});

    console.log("DB is dropped successfully ...");
  } catch (error) {
    console.log(error);
  }
};

export { populateDB, dropDB };
