import dotenv from "dotenv";
dotenv.config();
import { pool } from "../DB.js";
import jwt from "jsonwebtoken";

export const updateProducts = async (req, res) => {
  const { parcel } = req.body;

  await pool.query(
    "Update productos set ProductName = ? where ProductoID = ?",
    [parcel.Nombre, parcel.ID]
  );
  await pool.query(
    "Update productos set Descripcion = ? where ProductoID = ?",
    [parcel.Descripcion, parcel.ID]
  );
  await pool.query("Update productos set Price = ? where ProductoID = ?", [
    parcel.Precio,
    parcel.ID,
  ]);
  await pool.query("Update productos set Stock = ? where ProductoID = ?", [
    parcel.Inventario,
    parcel.ID,
  ]);

  const rows = await pool.query("select * from productos");

  res.json(rows);
};

export const AddProductos = async (req, res) => {
  const { parcel } = req.body;

  let maxRowx = await pool.query(
    "SELECT ProductoID FROM productos ORDER BY Productoid DESC LIMIT 1;"
  );
  const newID = maxRowx[0][0].ProductoID + 1;

  await pool.query(`insert into productos values(?,?,?,?,?)`, [
    newID,
    parcel.Nombre,
    parcel.Descripcion,
    parcel.Precio,
    parcel.Inventario,
  ]);
  const rows = await pool.query("select * from productos");
  res.json(rows);
};

export const deleteProduct = async (req, res) => {
  const { parcel } = req.body;

  await pool.query("delete from productos where ProductoID = ?", parcel.ID);
  const rows = await pool.query("select * from productos");
  res.json(rows);
};
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
    if (rows.length <= 0)
    return res.status(404).json({
      message: "Usuario no encontrado",
    });
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
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3600s",
      });
      const data = { message: "OK", accessToken };
      return res.status(200).send(data);
    } else {
      return res.status(400).send("Error");
    }
    
  } catch (error) {
    console.log(error);
  }
};
export const getProductos = async (req, res) => {
  const [rows] = await pool.query("select * from productos");
  if (rows.length <= 0)
    return res.status(404).json({
      message: "Usuario no encontrado",
    });
  res.json(rows);
};
