import Gig from "../models/gig.js";
import Order from "../models/order.js";
import { createError } from "../utils/createError.js";

export const createOrder = async (req, res, next) => {
  const { gigId } = req.params;

  try {
    const gig = await Gig.findById(gigId);

    // console.log(gig._id.toString());

    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: "temporary",
    });

    await newOrder.save();
    res.status(200).send("Order Successful!🌞");
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};
