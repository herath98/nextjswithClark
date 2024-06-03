import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    name: v.string(),
    status: v.string(),
    price: v.string(),
    sales: v.number(),
    createdAt: v.string(),
    image: v.string(),
  })
});
