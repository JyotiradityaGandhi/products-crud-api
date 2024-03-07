const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "config.env" });

const app = express();
const { getAllProducts, createNewProduct } = require("./routes/products.route");
const {
  getSpecificProduct,
  updateSpecificProduct,
  deleteSpecificProduct,
} = require("./routes/product.route");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.route("/api/products").get(getAllProducts).post(createNewProduct);
app
  .route("/api/product/:id")
  .get(getSpecificProduct)
  .put(updateSpecificProduct)
  .delete(deleteSpecificProduct);

app.get("*", (req, res) => {
  res.status(404).json({ status: "failed", message: "Not Found" });
});
