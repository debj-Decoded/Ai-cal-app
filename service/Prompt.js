export default {
    CALORIES_PROMPT: `Based on Weight,Height,Gender,Goal give me calories and protiens need daily Consider Age as 28 in JSON format and follow the schema:
    {
    calories:<>,
    protien:<>
    }
    `,

    GENERATE_RECIPE_OPTION_PROMPT: `:Depends on user instruction create 3 different Recipe variant with Recipe Name and Emoji, 2 line description and main ingredient list , cooking time in JSON format with field recipeName, Description, ingredients (without size) only ,Do not give me text response`
}

 
// [
//   {
//     "Description": "A bright and flavorful roast chicken infused with lemon and fresh herbs. Perfect for a Sunday dinner!",
//     "ingredients": [
//       "Chicken",
//       "Lemon",
//       "Rosemary",
//       "Thyme",
//       "Garlic",
//       "Olive Oil",
//       "Salt",
//       "Pepper"
//     ],
//     "recipeName": "🍋 Zesty Lemon & Herb Roasted Chicken"
//   },
//   {
//     "Description": "Tangy and sweet lemon bars with a buttery shortbread crust. A delightful dessert!",
//     "ingredients": [
//       "Lemons",
//       "Sugar",
//       "Eggs",
//       "Butter",
//       "Flour",
//       "Vanilla Extract"
//     ],
//     "recipeName": "🍋 Sunshine Lemon Bars"
//   },
//   {
//     "Description": "A bubbly and invigorating lemonade spritzer, perfect for a hot day.  Simple and delicious!",
//     "ingredients": [
//       "Lemons",
//       "Water",
//       "Sugar",
//       "Sparkling Water",
//       "Mint"
//     ],
//     "recipeName": "🍋 Refreshing Lemonade Spritzer"
//   }
// ]