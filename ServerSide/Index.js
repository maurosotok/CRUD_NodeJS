import express from "express";
import cors from "cors";
import {
  auth,
  AddProductos,
  getProductos,
  updateProducts,
  deleteProduct,
} from "./EndPoint/EndPoints.js";
import jwt from "jsonwebtoken";
const app = express();
import dotenv from "dotenv";
dotenv.config();

app.use(express.json());
app.use(cors());

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res.sendStatus(403);
      87;
    }
    req.user = user;
    next();
  });
}

app.listen(3000);
app.post("/auth", auth);
app.get("/getProductos", authenticateToken, getProductos); // ver productos
app.put("/updateProducts", authenticateToken, updateProducts); // actualizar productos
app.post("/AddProductos", authenticateToken, AddProductos); // agregar productos
app.delete("/deleteProduct", authenticateToken, deleteProduct); // eliminar productos
