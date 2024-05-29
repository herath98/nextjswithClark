import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    id: v.id("documents"),
    string: v.string(),
    number: v.number(),
    boolean: v.boolean(),
    nestedObject: v.object({
      property: v.string(),
    }),
  }),
});