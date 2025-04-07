import { aiConfig, ai } from "../utils/AI_config";

export const useAITranslation = () => {
  const translateText = async ({ userInput, selectedLanguage }) => {
    try {
      const contents = [
        {
          role: 'model',
          parts: [
            {
              text: `You are a translator expert, you will only translate the word o phrase between "###"
              ###
              ${userInput}
              ###
              in ${selectedLanguage} never use the #`
            }
          ]
        },
        {
          role: 'user',
          parts: [
            {
              text: `${userInput}`
            }
          ]
        }
      ]

      const generateResponse = await ai.models.generateContent({
        model: aiConfig.modelName,
        contents: contents,
        config: aiConfig.config,
      })
      
      console.log(generateResponse.text)
      return generateResponse.text
    } catch (error) {
      console.error("Error en la traducción:", error)
      throw error
    }
  }

  return { translateText }
}