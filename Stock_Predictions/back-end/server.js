import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

// cargar variables de entorno
config()

// Inicializamos express
const app = express()
app.use(cors()) //--> habilitamos cors

// Rutas para obtener la clave de API
app.get('/polygon-api-key', (req, res) => {
  res.json({ apiKey: process.env.POLYGON_API_KEY})
})

app.get('/openai-api-key', (req, res) => {
  res.json({ apiKey: process.env.OPENAI_API_KEY})
})


//iniciamos el servidor

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Servidor conectado en http:localhost:${PORT}`))
