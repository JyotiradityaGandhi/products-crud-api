const Product = require("./../models/product.model");

exports.getAllProducts = async (req, res) => {
  try {
    
    const products = await Product.find(req.query);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createNewProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
