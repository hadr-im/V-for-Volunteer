import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Field from "./Field";

/**
 * Dropdown with optional type-to-filter.
 *
 * Long lists (31 universities, 71 fields of study) are unusable as a
 * plain <select>, so this filters as you type. Keyboard: ↑/↓ to move,
 * Enter to pick, Escape to close.
 */
export default function Combobox({
  label,
  options,
  value,
  onChange,
  placeholder = "Select…",
  searchable = true,
  required,
  error,
  hint,
  full,
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef(null);
  const listRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!searchable || !q) return options;
    return options.filter((o) => o.toLowerCase().includes(q));
  }, [options, query, searchable]);

  // Close when the pointer goes down anywhere else.
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Keep the highlighted option scrolled into view.
  useEffect(() => {
    if (!open) return;
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const choose = (option) => {
    onChange(option);
    setQuery("");
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) setOpen(true);
      else setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && open) {
      e.preventDefault();
      if (filtered[active]) choose(filtered[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  };

  return (
    <Field id={id} label={label} required={required} error={error} hint={hint} full={full}>
      <div className={`combo ${open ? "is-open" : ""}`} ref={rootRef}>
        <input
          id={id}
          className="field__input combo__input"
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-autocomplete={searchable ? "list" : "none"}
          aria-invalid={Boolean(error)}
          autoComplete="off"
          readOnly={!searchable}
          placeholder={value ? undefined : placeholder}
          value={open && searchable ? query : value}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />

        <span className="combo__caret" aria-hidden="true">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>

        <AnimatePresence>
          {open && (
            <motion.ul
              id={`${id}-list`}
              ref={listRef}
              className="combo__list"
              role="listbox"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              {filtered.length === 0 && <li className="combo__empty">No match</li>}

              {filtered.map((option, i) => (
                <li
                  key={option}
                  role="option"
                  aria-selected={option === value}
                  className={`combo__opt${i === active ? " is-active" : ""}${option === value ? " is-selected" : ""}`}
                  onMouseEnter={() => setActive(i)}
                  // mousedown, not click — click fires after blur has
                  // already closed the list.
                  onMouseDown={(e) => {
                    e.preventDefault();
                    choose(option);
                  }}
                >
                  {option}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </Field>
  );
}
