import { GoogleGenAI } from '@google/genai'
import fs from 'fs'

const GEMINIAI_API_KEY = import.meta.env.VITE_GEMINIAI_API_KEY

const ai = new GoogleGenAI({ apiKey: GEMINIAI_API_KEY })

async function generateImage(prompt) {
  const contents = `${prompt}`;
  const outputImg = document.getElementById('output-img')
  try {
      const response = await ai.models.generateContent({
          model: 'gemini-2.0-flash-exp-image-generation',
          contents: contents,
          config: {
              responseModalities: ['Text', 'Image'],
              style: 'vivid',
              size: '1024x1024'
          },
      });

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
              const url = URL.createObjectURL(blob);
              
              // Opción A: Descargar automáticamente
              // const a = document.createElement('a');
              // a.href = url;
              // a.download = 'gemini-image.png';
              // a.click();

              //Opción B: Mostrar en el DOM
              outputImg.innerHTML = ''
              const img = document.createElement('img');
              img.src = url;
              img.alt = 'Imagen generada por Gemini'
              img.style.maxWidth = '100%'
              outputImg.appendChild(img);

              console.log('¡Imagen lista!');
          }
      }
  } catch (error) {
      console.error("Error generando contenido:", error);
  }
}

document.getElementById('submit-btn').addEventListener("click", () => {
  const prompt = document.getElementById("instruction").value
  generateImage(prompt)
})





