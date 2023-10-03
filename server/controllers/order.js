import Gig from "../models/gig.js";
import Order from "../models/order.js";
import Stripe from "stripe";
import { createError } from "../utils/createError.js";

export const paymentAmount = async (req, res, next) => {
  const { id, amount } = req.params;

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const gig = await Gig.findById(id);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    if (amount > gig.priceGoal) {
      return next(createError(409, "Order amount not valid."));
    }

    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      investAmount: amount,
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
    const order = await Order.findOneAndUpdate(
      {
        payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    if (!order) {
      return next(createError(404, "Order not found or saleAmount."));
    }
    if (order.isCompleted && order.payment_intent) {
      return next(
        createError(200, "Order has already been confirmed and paid.")
      );
    }

    const gig = await Gig.findByIdAndUpdate(order.gigId);
    if (gig) {
      gig.sales += 1;
      gig.totalInvestAmount += order.investAmount;
      gig.totalInvestor += 1;
    }

    await gig.save();
    res.status(200).send("Orders has been confirmed!👏");
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.roles === "Admin"
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
