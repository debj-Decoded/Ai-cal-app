import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateMealPlan = mutation({
    args: {
        recipeId: v.id('recipes'),
        date: v.string(),
        mealType: v.string(),
        userId: v.id('users'),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert('mealPlan', {
            recipeId: args.recipeId,
            date: args.date,
            mealType: args.mealType,
            userId: args.userId,
        })
          return result;
    }
})