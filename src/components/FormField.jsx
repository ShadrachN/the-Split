import './FormField.css'

// Label always visible above the field. Errors are text (with an "Error:" prefix),
// linked to the field with aria-describedby, not shown by color alone.
export default function FormField({ id, label, hint, error, announce = false, ...inputProps }) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ')
  return (
    <div className={`field ${error ? 'field--invalid' : ''}`}>
      <label htmlFor={id} className="field__label">{label}</label>
      {hint && <p id={`${id}-hint`} className="field__hint">{hint}</p>}
      <input
        id={id}
        className="field__input"
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy || undefined}
        {...inputProps}
      />
      {error && <p id={`${id}-error`} className="field__error" role={announce ? "alert" : undefined}>Error: {error}</p>}
    </div>
  )
}
