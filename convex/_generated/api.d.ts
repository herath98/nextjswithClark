/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.12.0.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as Customer from "../Customer.js";
import type * as functions_addProduct from "../functions/addProduct.js";
import type * as functions from "../functions.js";
import type * as images from "../images.js";
import type * as listMessages from "../listMessages.js";
import type * as messages from "../messages.js";
import type * as tableData from "../tableData.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  Customer: typeof Customer;
  "functions/addProduct": typeof functions_addProduct;
  functions: typeof functions;
  images: typeof images;
  listMessages: typeof listMessages;
  messages: typeof messages;
  tableData: typeof tableData;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
