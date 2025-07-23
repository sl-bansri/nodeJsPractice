const OperatorData = require("../models/OperatorData");

const getOperatorItems = async (req, res) => {
  const item = await OperatorData.find();
  // const item = await ItemData.find();
  if (item.length == 0) {
    return res.json({ message: "list is empty create your item first" });
  }
  if (!item) return res.status(204).json({ message: "No item found." });
  res.json(item);
};

const postOperatorItem = async (req, res) => {
  if (
    !req?.body?.product ||
    !req?.body?.price ||
    !req?.body?.fees ||
    !req?.body?.description ||
    !req?.body?.favorites ||
    !req?.body?.quantity
  ) {
    return res.status(400).json({ message: "product are required" });
  }

  try {
    const result = await OperatorData.create({
      product: req.body.product,
      price: req.body.price,
      fees: req.body.fees,
      description: req.body.description,
      favorites: req.body.favorites,
      quantity: req.body.quantity,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateOperatorResult = async (req, res) => {
  try {
    const result = await OperatorData.aggregate([
      // $add operator]
      //   { $project: { item: 1, total: { $add: ["$price", "$fees"] } } },
      //  $addToSet operator
      //   {
      //     $group: {
      //       _id: { day: { $dayOfYear: "$date" }, year: { $year: "$date" } },
      //       itemsSold: { $addToSet: "$product" },
      //     },
      //   },
      // $and
      //   {
      //     $project: {
      //       product: 1,
      //       quantity: 3,
      //       result: {
      //         $and: [{ $gt: ["$quantity", 1] }, { $lt: ["$quantity", 3] }],
      //       },
      //     },
      //   },
      // $anyElementTrue
      //   {
      //     $project: {
      //       //   favorites: 1,
      //       isAnyTrue: { $anyElementTrue: ["$favorites"] },
      //       _id: 1,
      //     },
      //   },
      // $arrayElemAt
      // {
      //   $project: {
      //     name: 1,
      //     first: { $arrayElemAt: ["$favorites", 0] },
      //     last: { $arrayElemAt: ["$favorites", -1] },
      //   },
      // },
      //  $ cmp
      // {
      //   $project: {
      //     product: 1,
      //     quantity: 1,
      //     cmpTo250: { $cmp: ["$quantity", 2] },
      //     _id: 0,
      //   },
      // },
      // $concat
      // {
      //   $project: {
      //     productDescription: { $concat: ["$product", " - ", "$description"] },
      //   },
      // },
      // $cond => condition using if , then , else
      // {
      //   $project: {
      //     product: 1,
      //     discount: {
      //       $cond: { if: { $gte: ["$quantity", 3] }, then: 30, else: 20 },
      //     },
      //   },
      // },
      // $count

      {
        $group: {
          _id: "$product",
          countNumberOfDocumentsForProduct: {
            $count: {},
          },
        },
      },
    ]);

    console.log("res=>>>>", result);

    if (res) {
      res.status(200).json(result);
    }
  } catch (err) {
    console.error(err);
    if (res) {
      res.status(500).json({ message: "Error updating product summary" });
    }
  }
};

module.exports = {
  getOperatorItems,
  postOperatorItem,
  updateOperatorResult,
};
