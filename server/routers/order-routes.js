const express = require("express");
const { addOrder, getAllOrders, getOrder, updateOrder, deleteOrder } = require("../controllers/order-controllers");
const router = express.Router();

router.post("/api/add-order", addOrder);
router.get("/api/orders", getAllOrders);

router.get('/api/orders/:id', getOrder);
router.put('/api/update-order/:id', updateOrder)
router.delete('/api/delete-order/:id', deleteOrder)

module.exports = router;
