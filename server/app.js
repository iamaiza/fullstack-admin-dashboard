const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const supplierRouter = require("./routers/supplier-routes");
const productRouter = require("./routers/product-routes");
const orderRouter = require("./routers/order-routes");

const port = 4000;
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname + "/uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(supplierRouter, productRouter, orderRouter);
app.use("/uploads", express.static(__dirname + "/uploads"));

app.post("/api/upload-img", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;
    res.status(200).json({ filePath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
