import { mutation } from "../_generated/server";

export const addProduct = mutation(async ({ db }, { name, status, price, sales, createdAt, image }) => {
  const product = {
    name,
    status,
    price,
    sales,
    createdAt,
    image,
  };
  const id = await db.collection('products').insertOne(product);
  return id;
});
