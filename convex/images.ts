import { action, internalMutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";
import { query } from "./_generated/server"

export const generateAndStore = action({
  args: { prompt: v.string() },
  handler: async (ctx, args) => {
    // Not shown: generate imageUrl from `prompt`
    const imageUrl = "https://....";

    // Download the image
    const response = await fetch(imageUrl);
    const image = await response.blob();

    // Store the image in Convex
    const storageId: Id<"_storage"> = await ctx.storage.store(image);

    // Write `storageId` to a document
    await ctx.runMutation(internal.images.storeResult, {
      storageId,
      prompt: args.prompt,
    });
  },
});

export const storeResult = internalMutation({
  args: {
    storageId: v.id("_storage"),
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    const { storageId, prompt } = args;
    await ctx.db.insert("images", { storageId, prompt });
  },
});

export const deleteById = mutation({
    args: {
      storageId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
      return await ctx.storage.delete(args.storageId);
    },
  });

  export const getMetadata = query({
    args: {
      storageId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
      return await ctx.db.system.get(args.storageId);
    },
  });
  
  export const listAllFiles = query({
    handler: async (ctx) => {
      // You can use .paginate() as well
      return await ctx.db.system.query("_storage").collect();
    },
  });  