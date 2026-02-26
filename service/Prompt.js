export default {
    CALORIES_PROMPT: `Based on Weight,Height,Gender,Goal give me calories and proteins need daily Consider Age as 28 in JSON format and follow the schema:
    {
    calories:<>,
    protein:<>
    }
    `,

    GENERATE_RECIPE_OPTION_PROMPT: `:Depends on user instruction create 3 different Recipe variant with Recipe Name and Emoji, 2 line description and main ingredient list , cooking time in JSON format with field recipeName, Description, ingredients (without size) only ,Do not give me text response`,

    GENERATE_COMPLETE_RECIPE_PROMPT: `
    -As per recipeName and description give me recipeName and Description on as field , Give me all list of ingredients as ingredient,
    -emoji icons for each ingredient as icon, quantity as quantity, along with detail step by step  recipe steps
    -total calories as calories (only  number), Minutes to cook as cookTime and serving number as ServeTo
    -realistic image Text prompt as per reciepe as imagePrompt
    -Give me  catrgory List for recipe from [Breakfast , Lunch , Dinner , Salad , Dessert , Fastfood , Drink , Cake ] as catrgory ,
    -Give me response in JSON format only
    -Schema format should be:

    {
        "description":"string",
        "recipeName":"string",    
        "calories":"string",    
        "category":["string"],    
        "cookTime":"string",    
        "imagePrompt":"string",    
        "ingredients":
        
        [{
            "icon":"string",
            "ingredient":"string",
            "quantity":"string",
        }],

        "serveTo":"number",
        "steps":["string"],
        
       
    }
    
    `,

    GENERATE_COMPLETE_RECIPE_PROMPT2: `
You are an AI recipe generator. 
Based on the given recipeName and description, return a complete recipe object in JSON format ONLY. 
Do not include any explanations, comments, or text outside of the JSON.

Requirements:
- Use the provided recipeName and description.
- Include emoji icons for each ingredient as "icon", with "ingredient" and "quantity".
- Provide total calories as "calories" (number only, no units).
- Provide cook time in minutes as "cookTime" (number only, no units).
- Generate a realistic image description prompt based on the recipe as "imagePrompt".
- Provide one or more categories as "category" (array of strings).
- Provide number of servings as "serveTo".
- Provide step-by-step instructions as "steps" (array of strings).

Schema format must be exactly:

{
  "description": "string",
  "recipeName": "string",
  "calories": "number",
  "category": ["string"],
  "cookTime": "number",
  "imagePrompt": "string",
  "ingredients": [
    {
      "icon": "string",
      "ingredient": "string",
      "quantity": "string"
    }
  ],
  "serveTo": "number",
  "steps": ["string"]
}

Rules:
- All values must be valid JSON.
- All strings must be wrapped in double quotes.
- Do not include trailing commas.
- Do not include any text outside of the JSON object.
`
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