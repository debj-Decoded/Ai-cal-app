import OpenAI from "openai"

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
   
})

 
  export const CalculateCaloriesAI = async(PROMPT)=> await openai.chat.completions.create({
    model: "google/gemma-3-4b-it:free",
    messages: [
      { role: "user", content: PROMPT }
    ],
        response_format:"json_object"
  })
  
  export const GenerateRecipeOptionsAiModel = async(PROMPT)=> await openai.chat.completions.create({
    model: "google/gemma-3-4b-it:free",
    messages: [
      { role: "user", content: PROMPT }
    ],
    response_format:"json_object"
  })

//   console.log(completion.choices[0].message)
 
 
