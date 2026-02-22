import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

export const GetTodayMealPlan = query({
    args: {
        uid: v.id('users'),
        date: v.string()
    },
    handler: async (ctx, args) => {
        //Fetch selected all meal plan
        const mealPlans = await ctx.db.query('mealPlan')
            .filter(q => q.and(
                //q.and = logical AND - both conditions must be true
                q.eq(q.field('userId'), args.uid),
                // checks if the two values are equal(tables field name(userId), the user ID you passed in from the frontend).    
                q.eq(q.field('date'), args.date)
            ))
            .collect();

        //Fetch Recipes belong to Meal Plan
        const result = await Promise.all(
            mealPlans.map(async (mealPlan) => {
                const recipe = await ctx.db.get(mealPlan.recipeId);
                // - returns the full object stored in that table, not just the ID
                return {
                    mealPlan,
                    recipe
                }
            })
        )
        return result;
    }
})

export const updateStatus = mutation({
    args: {
        id: v.id("mealPlan"),
        status: v.boolean(),
        calories: v.number()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.patch(args.id, {
            status: args.status,
            calories: args.calories
        })
        return result;
    }
})

export const GetTotalCaloriesConsumed = query({
    args: {
        date: v.string(),
        uid: v.id('users'),
    },
    handler: async (ctx, args) => {
        const mealPlanResult = await ctx.db.query('mealPlan')
            .filter(q =>
                q.and(
                    q.eq(q.field('userId'), args.uid),
                    q.eq(q.field('date'), args.date)
                )
            )
            .collect();
        const totalCalories = mealPlanResult?.reduce((sum, meal) => {
            // return sum + (meal.calories ?? 0);
            return sum + (meal.calories ? parseFloat(meal.calories) : 0);

        }, 0)
        return totalCalories
    }
})