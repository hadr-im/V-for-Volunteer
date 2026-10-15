import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Field from "./Field";
import { CV_ACCEPT, CV_MAX_BYTES } from "../../data/formOptions";

const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

export default function FileField({ label, value, onChange, required, error, onReject, full }) {
  const id = useId();
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const accept = (file) => {
    if (!file) return;
    if (file.size > CV_MAX_BYTES) {
      onReject?.(`${formatSize(file.size)} is over the 5 MB limit.`);
      return;
    }
    onReject?.(null);
    onChange(file);
  };

  return (
    <Field
      id={id}
      label={label}
      required={required}
      error={error}
      hint={!value ? "PDF, DOC or DOCX · 5 MB max" : undefined}
      full={full}
    >
      <div
        className={`drop${dragging ? " is-dragging" : ""}${value ? " has-file" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          accept(e.dataTransfer.files?.[0]);
        }}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          className="sr-only"
          accept={CV_ACCEPT}
          aria-invalid={Boolean(error)}
          onChange={(e) => accept(e.target.files?.[0])}
        />

        <AnimatePresence mode="wait" initial={false}>
          {value ? (
            <motion.div
              key="file"
              className="drop__file"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
              </svg>

              <span className="drop__name">{value.name}</span>
              <span className="drop__size">{formatSize(value.size)}</span>

              <button
                type="button"
                className="drop__clear"
                onClick={() => {
                  onChange(null);
                  onReject?.(null);
                  if (inputRef.current) inputRef.current.value = "";
                }}
                aria-label="Remove file"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          ) : (
            <motion.label
              key="empty"
              htmlFor={id}
              className="drop__empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="m7 9 5-5 5 5M12 4v12" />
              </svg>
              <span>
                <b>Choose a file</b> or drag it here
              </span>
            </motion.label>
          )}
        </AnimatePresence>
      </div>
    </Field>
  );
}
