import { aiImgConfig, ai } from "../utils/AI_config";
import { useState } from "react";

export const useAIImage = () => {
  const [isLoading, setIsLoading] = useState(false)
  
  const generateImage = async ({ userInput, selectedLanguage }) => {
    setIsLoading(true)
    try {
      const response = await ai.models.generateContent({
        model: aiImgConfig.modelName,
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Generate an image that represents the ${userInput}, and if possible, make it representative from the country of the ${selectedLanguage}`
              }
            ]
          }
        ], 
        config: aiImgConfig.config
      })

      
      for (const part of response.candidates[0].content.parts) {
        if (part.text) {
          console.log(part.text);
        } else if (part.inlineData) {
            const imageData = part.inlineData.data;
            
            // 1. Decodificar base64 (sin Buffer)
            const byteCharacters = Uint8Array.from(atob(imageData), c => c.charCodeAt(0));
            const blob = new Blob([byteCharacters], { type: 'image/png' });

            // 2. Crear imagen descargable
            // const blob = new Blob([bytes], { type: 'image/png' });
            return URL.createObjectURL(blob);
        }
      }


      throw new Error("No se encontró imagen en la respuesta")
    } catch (error) {
      console.error("Error generando imagen:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { generateImage, isLoading }
}