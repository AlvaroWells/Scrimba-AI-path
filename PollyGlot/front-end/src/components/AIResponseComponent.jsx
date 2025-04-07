export function AIResponseComponent({
  aiResponse,
  aiImageResponse
}) {
  return (
    <section>
      {aiResponse && <p>{aiResponse}</p>}
      {aiImageResponse && (
        <img 
          src={aiImageResponse}
          alt="Imagen generada por IA"
          style={{ 
            maxWidth: '100%', 
            marginTop: '20px', 
            maxHeight: '400px',
            width: 'auto',
            height: 'auto'
          }}
        />
      )}
    </section>
  )
}