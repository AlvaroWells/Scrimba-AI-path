export function Main({
  value, 
  onChange
}) {
  return (
    <main>
      <section>
        <input 
          type="text"
          placeholder="text to translate"
          value={value}
          onChange={onChange}
        />
      </section>

      <h2>Select language</h2>
    </main>
  )
}