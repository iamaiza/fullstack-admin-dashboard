const express = require("express");
const {
  addSupplier,
  getAllSuppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplier-controllers");
const router = express.Router();

router.post("/api/add-supplier", addSupplier);

router.get("/api/suppliers", getAllSuppliers);
router.get("/api/suppliers_list", getAllSuppliers);
router.get("/api/all_suppliers", getAllSuppliers);

router.get('/api/suppliers/:id', getSupplier);
router.put('/api/update-supplier/:id', updateSupplier)
router.delete('/api/delete-supplier/:id', deleteSupplier)

module.exports = router;
