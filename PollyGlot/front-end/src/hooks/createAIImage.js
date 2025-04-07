import { aiImgConfig, ai } from "../utils/AI_config";

export const useAIImage = () => {
  const generateImage = async ({ userInput }) => {
    try {
      const response = await ai.models.generateContent({
        model: aiImgConfig.modelName,
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Generate an image that represents ${userInput}`
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
            const binaryString = window.atob(imageData);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            // 2. Crear imagen descargable
            const blob = new Blob([bytes], { type: 'image/png' });
            return URL.createObjectURL(blob);
        }
      }


      throw new Error("No se encontró imagen en la respuesta")
    } catch (error) {
      console.error("Error generando imagen:", error)
      throw error
    }
  }

  return { generateImage }
}