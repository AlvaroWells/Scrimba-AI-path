import { GoogleGenAI } from "@google/genai"

const GEMINIAI_API_KEY = import.meta.env.VITE_GEMINIAI_API_KEY
export const ai = new GoogleGenAI({ apiKey: GEMINIAI_API_KEY })

const safetySettings = [
  {
    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    threshold: "BLOCK_LOW_AND_ABOVE"
  }
]

export const aiConfig = {
  aiInstance: ai,
  modelName: 'gemini-2.0-flash',
  config: {
    safetySettings: safetySettings,
  }
}

export const aiImgConfig = {
  aiInstance: ai,
  modelName: 'gemini-2.0-flash-exp-image-generation',
  config: {
    safetySettings: safetySettings,
    responseModalities: ['Text', 'Image'],
    style: 'vivid',
    size: '1024x1024'
  }
}




