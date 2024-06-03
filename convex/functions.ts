import { mutation, query } from "./_generated/server"
import { Id } from "convex/schema";
import { api } from "convex/_generated/api";

export const getProducts = query(async ({ db }) => {
  return await db.query("products").collect();
});

export const addProduct = mutation(async ({ db }, { product }) => {
  return await db.insert("products", product);
});
