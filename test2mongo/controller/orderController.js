const { orderData } = require("../model/Order");

const getOrder = async (req, res) => {
  const order = await orderData.find();
  console.log(order);
  if (order.length == 0) {
    return res.json({ message: "list is empty create your Order first" });
  }
  if (!order) return res.status(204).json({ message: "No Order found." });
  res.json(order);
};

const newOrder = async (req, res) => {
  try {
    // const customer = await orderData.find();
    console.log(
      req.body.items.productId,
      req.body.items.quantity,
      req.body.items.price
    );

    if (
      !req.body.customerId ||
      !req.body.status ||
      !req.body.orderDate ||
      !req.body.items.productId ||
      !req.body.items.quantity ||
      !req.body.items.price
    ) {
      res.json({ message: " not valid Data " });
    }
    const newOrder = new orderData({
      customerId: req.body.customerId,
      status: req.body.status,
      orderDate: req.body.orderDate,
      items: [
        {
          productId: req.body.items.productId,
          quantity: req.body.items.quantity,
          price: req.body.items.price,
        },
      ],
    });

    const savedData = await newOrder.save();

    res.status(201).json(savedData);
  } catch (error) {
    console.error("Error in adding new Order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAgreegateData = async (req, res) => {
  try {
    const pipeline = [
      // filter group and unwind item

      //   {
      //     $match: {
      //       status: "delivered",
      //     },
      //   },
      //   {
      //     $unwind: "$customerId",
      //   },
      //   {
      //     $group: {
      //       _id: "$customerId",
      //     },
      //   },
      //
      //   {
      //     $group: {
      //       _id: "$items.productId",
      //       totalRevenue: {
      //         $sum: { $multiply: ["$items.quantity", "$items.price"] },
      //       },
      //     },
      //   },

      // {
      //   $lookup: {
      //     from: "customers",
      //     localField: "customerId",
      //     foreignField: "customerId",
      //     as: "customerInfo",
      //   },
      // },
      // {
      //   $group: {
      //     _id: "$customerId",
      //     customerName: { $first: "$customerName" },
      //   },
      // },
      // {
      //   $project: {
      //     _id: 0,
      //     customerId: "$customerId",
      //     quantity: "$items.quantity",
      //     customerInfo: 1,
      //   },
      // },

      { $unwind: "$items" },

      {
        $addFields: {
          "items.totalRevenue": {
            $multiply: ["$items.quantity", "$items.price"],
          },
        },
      },

      { $sort: { totalProductRevenue: -1 } },
      // {
      //   $group: {
      //     _id: "$items.productId",
      //     totalProductRevenue: { $sum: "$items.totalRevenue" },
      //   },
      // },
      // { $limit: 3 },

      {
        $facet: {
          totalRevenuePerCity: [
            {
              $lookup: {
                from: "customers",
                localField: "customerId",
                foreignField: "customerId",
                as: "customerInfo",
              },
            },

            {
              $group: {
                _id: "$customerInfo.city",
                totalCityRevenue: { $sum: "$items.totalRevenue" },
              },
            },
          ],
        },
      },
    ];
    const userOrders = await orderData.aggregate(pipeline);

    res.json(userOrders);
  } catch (error) {
    console.error("Error in aggregate data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  getOrder,
  newOrder,
  getAgreegateData,
};
