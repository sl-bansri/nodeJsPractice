const { DateOperator } = require("../models/OperatorData");

const getOperatorDate = async (req, res) => {
  const item = await DateOperator.find();
  // const item = await ItemData.find();
  if (item.length == 0) {
    return res.json({ message: "list is empty create your item first" });
  }
  if (!item) return res.status(204).json({ message: "No item found." });
  res.json(item);
};

const postOperatorDate = async (req, res) => {
  if (
    !req?.body?.item ||
    !req?.body?.price ||
    !req?.body?.purchased ||
    !req?.body?.delivered ||
    !req?.body?.date ||
    !req?.body?.filterNum ||
    !req?.body?.quantity
  ) {
    return res.status(400).json({ message: "product are required" });
  }

  try {
    const result = await DateOperator.create({
      item: req.body.item,
      price: req.body.price,
      purchased: req.body.purchased,
      delivered: req.body.delivered,
      date: req.body.date,
      filterNum: req.body.filterNum,
      quantity: req.body.quantity,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const dateOperatorResult = async (req, res) => {
  try {
    const result = await DateOperator.aggregate([
      // dateToString
      //   {
      //     $project: {
      //       yearMonthDayUTC: {
      //         $dateToString: { format: "%Y-%m-%d", date: "$date" },
      //       },
      //       timewithOffsetNY: {
      //         $dateToString: {
      //           format: "%H:%M:%S:%L%z",
      //           date: "$date",
      //           timezone: "America/New_York",
      //         },
      //       },
      //       timewithOffset430: {
      //         $dateToString: {
      //           format: "%H:%M:%S:%L%z",
      //           date: "$date",
      //           timezone: "+04:30",
      //         },
      //       },
      //       minutesOffsetNY: {
      //         $dateToString: {
      //           format: "%Z",
      //           date: "$date",
      //           timezone: "America/New_York",
      //         },
      //       },
      //       minutesOffset430: {
      //         $dateToString: { format: "%Z", date: "$date", timezone: "+04:30" },
      //       },
      //       abbreviated_month: {
      //         $dateToString: { format: "%b", date: "$date", timezone: "+04:30" },
      //       },
      //       full_month: {
      //         $dateToString: { format: "%B", date: "$date", timezone: "+04:30" },
      //       },
      //     },
      //   },
      // dateTrunc
      //   {
      //     $project: {
      //       _id: 1,
      //       date: 1,
      //       truncatedOrderDate: {
      //         $dateTrunc: {
      //           date: "$date",
      //           unit: "week",
      //           binSize: 2,
      //           timezone: "Indian/Maldives",
      //           startOfWeek: "Monday",
      //         },
      //       },
      //     },
      //   },
      //   {
      //     $project: {
      //       year: { $year: "$date" },
      //       month: { $month: "$date" },
      //       day: { $dayOfMonth: "$date" },
      //       hour: { $hour: "$date" },
      //       minutes: { $minute: "$date" },
      //       seconds: { $second: "$date" },
      //       milliseconds: { $millisecond: "$date" },
      //       dayOfYear: { $dayOfYear: "$date" },
      //       dayOfWeek: { $dayOfWeek: "$date" },
      //       week: { $week: "$date" },
      //     },
      //   },
      // {
      //   $project: {
      //     _id: 1,
      //     originalDate: "$date",
      //     newDate: {
      //       $dateAdd: {
      //         startDate: "$date",
      //         unit: "day",
      //         amount: 7,
      //       },
      //     },
      //   },
      // },
      // {
      //   $project: {
      //     orderId: 1,
      //     startDate: "$purchased",
      //     endDate: "$delivered",
      //     deliveryTimeInDays: {
      //       $dateDiff: {
      //         startDate: "$purchased",
      //         endDate: "$delivered",
      //         unit: "day",
      //       },
      //     },
      //   },
      // },
      // {
      //   $project: {
      //     _id: 0,
      //     filteredNumbers: {
      //       $filter: {
      //         input: "$filterNum",
      //         as: "num",
      //         cond: { $gt: ["$$num", 7] },
      //       },
      //     },
      //   },
      // },
      // {
      //   $project: {
      //     filteredNumbers: {
      //       $filter: {
      //         input: "$filterNum",
      //         as: "num",
      //         cond: { $gt: ["$$num", 2] },
      //       },
      //     },
      //     incrementedNumbers: {
      //       $map: {
      //         input: "$filterNum",
      //         as: "num",
      //         in: { $add: ["$$num", 1] },
      //       },
      //     },
      //   },
      // },

      // {
      //   $group: {
      //     _id: "$item",
      //     minQuantity: { $min: "$quantity" },
      //     maxQuantity: { $max: "$quantity" },
      //     totalQuantity: { $sum: "$quantity" },
      //   },
      // },

      // {
      //   $setWindowFields: {
      //     partitionBy: "$item",
      //     sortBy: { orderDate: 1 },
      //     output: {
      //       quantitiesForItems: {
      //         $push: "$quantity",
      //         window: {
      //           documents: ["unbounded", "current"],
      //         },
      //       },
      //     },
      //   },
      // },

      // {
      //   $group: {
      //     _id: "$item",
      //     filterArr: { $push: "$quantity" },
      //   },
      // },
      // {
      //   $project: {
      //     description: 1,
      //     results: {
      //       $reduce: {
      //         input: "$filterArr",
      //         initialValue: 1,
      //         in: { $sum: ["$$value", "$$this"] },
      //       },
      //     },
      //   },
      // },

      {
        $project: {
          item: {
            $replaceOne: {
              input: "$item",
              find: "abc",
              replacement: "mno",
            },
          },
        },
      },

      {
        $project: {
          item: {
            $replaceAll: {
              input: "$item",
              find: "xyz",
              replacement: "pqr",
            },
          },
        },
      },
    ]);

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
  getOperatorDate,
  postOperatorDate,
  dateOperatorResult,
};
