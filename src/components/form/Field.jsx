/** Shared label / error chrome for every control on the form. */
export default function Field({ id, label, required, error, hint, full, children }) {
  return (
    <div className={`field ${full ? "field--full" : ""} ${error ? "has-error" : ""}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required && <i aria-hidden="true">*</i>}
        {!required && <em>optional</em>}
      </label>

      {children}

      {error ? (
        <p className="field__msg field__msg--error" role="alert">{error}</p>
      ) : hint ? (
        <p className="field__msg">{hint}</p>
      ) : null}
    </div>
  );
}
