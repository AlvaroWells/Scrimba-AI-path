export function LanguageLabel({
  language,
  value,
  checked,
  onChange
}) {
  return (
    <section>
      <label>
        <input
          type="radio"
          name="language"
          value={value}
          checked={checked}
          onChange={onChange}
        />
        {language}
      </label>
    </section>
  )
}