export function AIResponseComponent({
  aiResponse,
  aiImageResponse,
  isLoading
}) {
  return (
    <section>
      {aiResponse && <p>{aiResponse}</p>}

      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Creando imagen...</p>
        </div>
      ) : (
        aiImageResponse && (
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
        )
      )}
    </section>
  );
}
