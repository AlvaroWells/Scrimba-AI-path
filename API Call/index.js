import 'dotenv/config'
import { GoogleGenAI } from "@google/genai";

const history = [
  {
    role: 'model',
    parts: [
      { 
        text: 'You are a helpful assistant that knows a lot about books.'
      }
    ]
  },
  {
    role: 'user',
    parts: [
      { 
        text: 'Recommend me a list of the best 10 programming books.'
      }
    ]
  }
]

const ai = new GoogleGenAI({ apiKey: process.env.GEMINIAI_API_KEY });
//const prompt = 'Who was the king in te battle of the thermopylae'
const countTokensResponse = await ai.models.countTokens({
  model: 'gemini-2.0-flash',
  contents: history
})

console.log(countTokensResponse.totalTokens)

async function main() {
  const generateResponse = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: history,
    config: {
      //stopSequences: ['3.']
      presencePenalty: 0,
      frequencyPenalty: 0
    }
  });
  console.log(generateResponse.text);
}

await main();

