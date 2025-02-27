import { sql } from "../config/db.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await sql`SELECT * FROM products`;
    res.status(200).json({ success: true, data: products });
    console.log("Products fetched successfully");
  } catch (error) {
    console.log("Error while fetching products", error);
    res
      .status(500)
      .json({ success: false, error: "Internal server error occurred" });
  }
};

export const createProduct = async (req, res) => {
  const { name, image, price } = req.body;
  if (!name || !image || !price) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide all the details" });
  }

  try {
    const product = await sql`
    INSERT INTO products (name, image, price) VALUES (${name}, ${image}, ${price}) RETURNING *`;
    res.status(201).json({ success: true, data: product[0] });
    console.log("Product created successfully");
  } catch (error) {}
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide product id" });
  }
  try {
    const product = await sql`SELECT * FROM products WHERE id = ${id}`;
    res.status(200).json({ success: true, data: product[0] });
    console.log("Product fetched successfully");
  } catch (error) {
    console.log("Error while fetching product", error);
    res
      .status(500)
      .json({ success: false, error: "Internal server error occurred" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, image, price } = req.body;
  if (!id || !name || !image || !price) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide all the details" });
  }
  try {
    const product = await sql`
  UPDATE products SET name = ${name}, image = ${image}, price = ${price} WHERE id = ${id} RETURNING *`;
    if (product.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    res.status(200).json({ success: true, data: product[0] });
    console.log("Product updated successfully");
  } catch (error) {
    console.log("Error while updating product", error);
    res
      .status(500)
      .json({ success: false, error: "Internal server error occurred" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide product id" });
  }
  try {
    const deleteProduct =
      await sql`DELETE FROM products WHERE id = ${id} RETURNING *`;
    if (deleteProduct.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    res.status(200).json({ success: true, data: {} });
    console.log("Product deleted successfully");
  } catch (error) {
    console.log("Error while deleting product", error);
    res
      .status(500)
      .json({ success: false, error: "Internal server error occurred" });
  }
};
