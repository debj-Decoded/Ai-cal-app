import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users:defineTable({
        name:v.string(),
        email:v.string(),
        picture:v.optional(v.string()),
        subscription:v.optional(v.string()),
        credit:v.number(),
        height:v.optional(v.string()),
        weight:v.optional(v.string()),
        goal:v.optional(v.string()),
        gender:v.optional(v.string()),
        calories:v.optional(v.number()),
        protien:v.optional(v.number()),
    })
})