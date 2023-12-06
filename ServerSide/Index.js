import express from "express";
import cors from "cors";
import { testmethod, auth, getT, testgetproducts } from "./Routes/Routes.js";
import jwt from "jsonwebtoken";
const app = express();

app.use(express.json());
app.use(cors());

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

app.listen(3000);
app.post("/auth", auth);
app.get('/getT', getT)
app.get("/testgetproducts", authenticateToken, testgetproducts);
app.get("/testmethod", testmethod);
