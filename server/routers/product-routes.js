const express = require("express");
const {
  addProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product-controllers");
const router = express.Router();

router.post("/api/add-product", addProduct);
router.get("/api/products", getAllProducts);
router.get("/api/products_list", getAllProducts);

router.get('/api/products/:id', getProduct);
router.put('/api/update-product/:id', updateProduct)
router.delete('/api/delete-product/:id', deleteProduct)

module.exports = router;
