import OpenAI from "openai"
const axios = require('axios');
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,

})


export const CalculateCaloriesAI = async (PROMPT) => await openai.chat.completions.create({
  model: "google/gemma-3-4b-it:free",
  // model: "google/gemma-3-12b-it:free",
  messages: [
    { role: "user", content: PROMPT }
  ],
  response_format: "json_object"
})

export const GenerateRecipeOptionsAiModel = async (PROMPT) => await openai.chat.completions.create({
  model: "google/gemma-3-4b-it:free",
  // model: "google/gemma-3-12b-it:free",
  messages: [
    { role: "user", content: PROMPT }
  ],
  response_format: "json_object"
})



const BASE_URL = 'https://aigurulab.tech';
export const AiImageGenerate=async(prompt) => await axios.post(BASE_URL + '/api/generate-image',
  {
    width: 1024,
    height: 1024,
    input: prompt,
    model: 'sdxl',//'flux'
    aspectRatio: "1:1"//Applicable to Flux model only
  },
  {
    headers: {
      'x-api-key': process.env.EXPO_PUBLIC_CONVEX_TEXT_TO_IMAGE_URL, // Your API Key
      'Content-Type': 'application/json', // Content Type
    },
  })
// console.log(result.data.image) //Output Result: Base 64 Image
//   console.log(completion.choices[0].message)


