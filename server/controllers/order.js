import Gig from "../models/gig.js";
import Order from "../models/order.js";
import Stripe from "stripe";
import { createError } from "../utils/createError.js";

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

export const paymentConfirm = async (req, res, next) => {
  const { payment_intent } = req.body;

  try {
    const order = await Order.findOne({
      payment_intent,
    });

    if (!order) {
      return next(createError(404, "Order not found or saleAmount mismatch."));
    }

    if (order.isCompleted && order.payment_intent) {
      return next(
        createError(200, "Order has already been confirmed and paid.")
      );
    }
    order.isCompleted = true;
    order.payment_intent = payment_intent;

    await order.save();
    await Gig.findByIdAndUpdate(
      order.gigId,
      { $inc: { sales: 1 } },
      { new: true }
    );
    res.status(200).send("Orders has been confirmed!👏");
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.roles === "Seller" || "Admin"
        ? { sellerId: req.userId }
        : { buyerId: req.userId }),
      isCompleted: true,
    });
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};

// export const deleteOrder = async (req, res, next) => {
//   const { orderId } = req.params;

//   try {
//     const order = await Order.findById(orderId);

//     if (!order) {
//       return next(createError(404, "Order not found."));
//     }

//     // Assuming you want to reduce the sale count when an order is deleted
//     await Gig.findByIdAndUpdate(
//       order.gigId,
//       { $inc: { sales: -1 } },
//       { new: true }
//     );

//     await order.remove(); // Delete the order

//     res.status(200).send("Order has been deleted.");
//   } catch (err) {
//     next(err);
//   }
// };
