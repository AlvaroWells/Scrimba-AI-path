import './App.css'
import { useState, useEffect } from 'react'
import { Title } from './components/Title'
import { LanguageLabel } from './components/LanguageLabel'
import { Main } from './components/Main'
import { TranslateButton } from './components/TranslateButton'
import { AIResponseComponent } from './components/AIResponseComponent'
import { useAITranslation } from './hooks/useAITranslation'
import { useAIImage } from './hooks/createAIImage'


function App() {
  const [userInput, setUserInput] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [AIResponse, setAIResponse] = useState('')
  const [AIImage, setAIImage] = useState(null)
  const { translateText } = useAITranslation()
  const { generateImage, isLoading } = useAIImage() //-> custom hook de la IA 
  
  //useEffect para verificar por console.log el idioma seleccionado
  useEffect(() => {
    console.log('Idioma seleccionado:', selectedLanguage)
    //limpiamos los estados al cambiar los parámetros de la app como user
    setAIResponse('')
    setAIImage(null)
  }, [selectedLanguage])
  
  //funcion para guardar la información del input de usuario
  const handleUserInput = (event) => {
    console.log(event.target.value)
    setUserInput(event.target.value)
  }
  //manejo del custom hook que devuelve la respuesta de la api ia
  const handleTranslate = async () => {
    try {
      //Limpiamos estados previos
      setAIResponse("")
      setAIImage(null)

      const textResponse = await translateText({ 
        userInput, selectedLanguage 
      })
      setAIResponse(textResponse)

      const imageURL = await generateImage({ 
        userInput: textResponse 
      })
      setAIImage(imageURL)

    } catch (error) {
      setAIResponse("error en la traducción", error.message)
    }
  }

  return (
    <>
      <Title 
        title='Text to translate'
      />
      <Main 
        value={userInput}
        onChange={handleUserInput}
      />
      <LanguageLabel
        language='Spanish'
        value='spanish'
        checked={selectedLanguage === 'spanish'}
        onChange={() => setSelectedLanguage('spanish')}
      />
      <LanguageLabel
        language='French'
        value='french'
        checked={selectedLanguage === 'french'}
        onChange={() => setSelectedLanguage('french')}
      />
      <LanguageLabel
        language='Japanese'
        value='japanese'
        checked={selectedLanguage === 'japanese'}
        onChange={() => setSelectedLanguage('japanese')}
      />
      <TranslateButton 
        onClick={handleTranslate}
        disabled={isLoading}
      />
      {isLoading && <div className='spinner'>Generating image...</div>}
      <AIResponseComponent 
        aiResponse={AIResponse}
        aiImageResponse={AIImage}
        isLoading={isLoading}
      />
    </>
  )
}

export default App
