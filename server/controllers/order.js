import Gig from "../models/gig.js";
import Order from "../models/order.js";
import Stripe from "stripe";

export const paymentAmount = async (req, res, next) => {
  const { id } = req.params;

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const gig = await Gig.findById(id);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: paymentIntent.id,
    });

    await newOrder.save();
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
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

export const paymentConfirm = async (req, res, next) => {
  const { payment_intent } = req.body;
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );
    res.status(200).send("Orders has been confirmed!👏");
  } catch (err) {
    next(err);
  }
};
