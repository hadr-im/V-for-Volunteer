import { useId } from "react";
import Field from "./Field";

export default function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  error,
  hint,
  full,
  inputMode,
  autoComplete,
}) {
  const id = useId();

  return (
    <Field id={id} label={label} required={required} error={error} hint={hint} full={full}>
      <input
        id={id}
        className="field__input"
        type={type}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}
