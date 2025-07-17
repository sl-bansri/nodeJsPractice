const express = require("express");
const router = express.Router();
const { Order } = require("../models/ItemData");

const getOrderItems = async (req, res) => {
  const item = await Order.find();
  // const item = await ItemData.find();
  if (item.length == 0) {
    return res.json({ message: "list is empty create your item first" });
  }
  if (!item) return res.status(204).json({ message: "No item found." });
  res.json(item);
};

const PostorderItems = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ error: "Invalid userId or productId" });
    }

    const newOrder = new Order({
      userId: userId,
      productId: productId,
      quantity: quantity,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOrderData = async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    console.log(userId);

    const pipeline = [
      {
        $match: {
          userId: userId,
        },
      },
      {
        $lookup: {
          from: "items",
          localField: "productId",
          foreignField: "_id",
          as: "itemDetails",
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "userId",
          foreignField: "productId",
          as: "productDetails",
        },
      },

      {
        $addFields: {
          OrdeCount: {
            $size: "$productDetails",
          },
          itemCount: {
            $size: "$itemDetails",
          },
          isOrdered: {
            $cond: {
              if: { $in: ["$productId", "$itemDetails._id"] },
              then: true,
              else: false,
            },
          },
        },
      },

      {
        $project: {
          _id: 0,
          price: "$itemDetails.price",
          itemname: "$itemDetails.Itemname",
          orderId: "$_id",
          quantity: 1,
          orderDate: 1,
          itemCount: 1,
          itemTotal: 1,
          OrdeCount: 1,
        },
      },
    ];

    const userOrders = await Order.aggregate(pipeline);
    console.log(userOrders);
    res.json(userOrders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getOrderData, PostorderItems, getOrderItems };
