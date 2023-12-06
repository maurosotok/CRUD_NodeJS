import dotenv from "dotenv";
dotenv.config();

import { pool } from "../DB.js";
import jwt from "jsonwebtoken";

export const testmethod = async (req, res) => {
  const [rows] = await pool.query("select * from usuarios");

  if (rows.length <= 0)
    return res.status(404).json({
      message: "Usuario no encontrado",
    });
  res.json(rows);
};
let accessToken;
export const getT = async(req, res) =>{
    res.json({accessToken})
}

export const auth = async (req, res) => {
  try {
    const verifyPassword = async (password, hashedPassword) => {
      if (password == hashedPassword) return true;
      else return false;
    };

    const { parcel } = req.body;

    const [rows] = await pool.query(
      "select * from usuarios where UserName = ?",
      parcel.Usuario
    );
    if (!parcel) {
      return res.status(400).send({ status: "failed" });
    }

    if (rows[0].length <= 0) return res.status(400).send("Error");
    else {
    }
    const passwordsMatch = await verifyPassword(
      parcel.Clave,
      rows[0].SavedPassword
    );

    if (passwordsMatch) {
      const user = { name: parcel.Usuario };
      //const accessToken = jwt.sign(user, "SECRET", { expiresIn: "1h" });

      accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

      // res.json({ accessToken: accessToken });
      console.log(accessToken);
      const data = { message: "OK" };

      return res.status(200).send(data);
    } else {
      return res.status(400).send("Error");
    }
  } catch (error) {
    console.log(error);
  }
};

export const tempToken = accessToken;

export const testgetproducts = async (req, res) => {
  const [rows] = await pool.query("select * from usuarios");

  if (rows.length <= 0)
    return res.status(404).json({
      message: "Usuario no encontrado",
    });
  res.json(rows);
};
