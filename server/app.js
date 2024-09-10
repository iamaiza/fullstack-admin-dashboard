require("dotenv").config;

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { PrismaClient } = require("@prisma/client");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Supplier = require("./resolvers/Supplier");
const Product = require("./resolvers/Product");
const Order = require("./resolvers/Order");

const startServer = async () => {
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
      origin: process.env.HOST_URL,
      credentials: true,
    })
  );
  app.use("/uploads", express.static(__dirname + "/uploads"));
  const schema = fs.readFileSync("./schema.graphql", "utf8");

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: { Query, Mutation, Supplier, Product, Order },
  });

  const { url } = await startStandaloneServer(server, {
    listen: 4000,
    context: async (req, res) => {
      const prisma = new PrismaClient();
      return { req, res, prisma };
    },
  });
  app.post("/api/upload-img", upload.single("file"), async (req, res) => {
    try {
      const filePath = req.file ? `/uploads/${req.file.filename}` : null;
      res.status(200).json({ filePath });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  app.listen(3000, () => console.log('Express server is running on port 3000'))
  console.log("Server is listening on " + url);
};

startServer().catch((err) => console.log(err.message));
