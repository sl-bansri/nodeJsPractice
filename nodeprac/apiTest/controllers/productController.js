// each crud logic
const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "..", "products.json");
const writeProducts = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), "utf8");
};
const product = {
  items: require("../products.json"),
  setItems: function (product) {
    this.items = product;
  },
};
// console.log("items", product.items);

const getAllProduct = (req, res) => {
  res.json(product.items);
};

const createNewProduct = (req, res) => {
  const newProduct = {
    id: product.items[product.items.length - 1].id + 1 || 1,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    inStock: req.body.inStock,
  };
  if (!newProduct.id) {
    return res.status(400).json({ message: "id not found" });
  }
  if (newProduct === "") {
    return res.status(400).json({ message: "name is empty" });
  }
  product.setItems([...product.items, newProduct]);
  writeProducts(product.items);
  res.json(newProduct);
};

const updateProduct = (req, res) => {
  const productdata = product.items.find(
    (item) => item.id === parseInt(req.body.id)
  );

  if (!productdata) {
    return res.status(400).json({ message: "product does not exists" });
  }
  if (req.body.name === "")
    return res.status(400).json({ message: "product write" });

  if (req.body.name) productdata.name = req.body.name;
  if (req.body.description) productdata.description = req.body.description;
  if (req.body.price) productdata.price = req.body.price;
  if (req.body.inStock) productdata.inStock = req.body.inStock;
  const productlist = product.items.filter(
    (item) => item.id !== parseInt(req.body.id)
  );
  const data = [...productlist, productdata];
  product.setItems(
    data.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(product.items);
};

const patchProduct = (req, res) => {
  const userId = parseInt(req.params.id);
  const updates = req.body;

  const userIndex = product.items.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    product.items[userIndex] = { ...product.items[userIndex], ...updates };
    res.json(product.items[userIndex]);
  } else {
    res.status(404).send("User not found");
  }
};

const deleteProduct = (req, res) => {
  const productdata = product.items.find(
    (item) => item.id === parseInt(req.body.id)
  );
  console.log("productdata", productdata);
  if (!productdata) {
    return res.status(400).json({ message: "product does not exists" });
  }
  const productlist = product.items.filter(
    (item) => item.id !== parseInt(req.body.id)
  );
  product.setItems([...productlist]);
  writeProducts(product.items);

  res.json(product.items);
};

const getProductById = (req, res) => {
  const productdata = product.items.find(
    (item) => item.id === parseInt(req.params.id)
  );
  if (!productdata) {
    return res.status(400).json({ message: "product does not exists" });
  }
  res.json(productdata);
  console.log(productdata, "dataId");
};

module.exports = {
  getAllProduct,
  createNewProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
  getProductById,
};
