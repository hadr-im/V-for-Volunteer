import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { event } from "../data/content";
import {
  CV_MAX_BYTES,
  FIELDS_OF_STUDY,
  REFERRALS,
  UNIVERSITIES,
  YEARS_OF_STUDY,
} from "../data/formOptions";
import SplitText from "../components/ui/SplitText";
import Wordmark from "../components/ui/Wordmark";
import ApplyLink from "../components/ui/ApplyLink";
import TextField from "../components/form/TextField";
import Combobox from "../components/form/Combobox";
import FileField from "../components/form/FileField";

const EASE = [0.16, 1, 0.3, 1];

/* Set VITE_REGISTER_ENDPOINT to a URL that accepts multipart/form-data
   and the form posts there. Without it the submit is simulated — a file
   upload cannot work from the browser alone. */
const ENDPOINT = import.meta.env.VITE_REGISTER_ENDPOINT || "";

const EMPTY = {
  firstName: "",
  lastName: "",
  email: "",
  whatsapp: "",
  university: "",
  referral: "",
  fieldOfStudy: "",
  yearOfStudy: "",
  linkedin: "",
  cv: null,
};

function validate(values) {
  const e = {};

  if (!values.firstName.trim()) e.firstName = "Required";
  if (!values.lastName.trim()) e.lastName = "Required";

  if (!values.email.trim()) e.email = "Required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    e.email = "That doesn't look like an email address";

  const digits = values.whatsapp.replace(/[^\d]/g, "");
  if (!values.whatsapp.trim()) e.whatsapp = "Required";
  else if (digits.length < 8) e.whatsapp = "Enter a full number, with country code";

  if (!values.university) e.university = "Required";
  if (!values.referral) e.referral = "Required";
  if (!values.fieldOfStudy) e.fieldOfStudy = "Required";
  if (!values.yearOfStudy) e.yearOfStudy = "Required";

  if (!values.cv) e.cv = "Required";
  else if (values.cv.size > CV_MAX_BYTES) e.cv = "File is over the 5 MB limit";

  const url = values.linkedin.trim();
  if (url && !/^(https?:\/\/)?([\w-]+\.)*linkedin\.com\/.+/i.test(url))
    e.linkedin = "Paste a linkedin.com profile URL";

  return e;
}

export default function Register() {
  const reduced = useReducedMotion();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | failed

  const set = (key) => (val) => {
    setValues((v) => ({ ...v, [key]: val }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).some((k) => found[k])) {
      document
        .querySelector(".field.has-error")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("sending");

    try {
      if (ENDPOINT) {
        const body = new FormData();
        Object.entries(values).forEach(([k, v]) => v != null && body.append(k, v));
        const res = await fetch(ENDPOINT, { method: "POST", body });
        if (!res.ok) throw new Error(`Server replied ${res.status}`);
      } else {
        // No endpoint configured — nothing is actually sent.
        console.warn(
          "[register] VITE_REGISTER_ENDPOINT is not set, so this submission was not sent anywhere.",
          values
        );
        await new Promise((r) => setTimeout(r, 900));
      }
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("[register]", err);
      setStatus("failed");
    }
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.055, delayChildren: 0.25 } },
  };

  const row = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      };

  return (
    <div className="reg">
      <header className="nav nav--scrolled" style={{ position: "sticky" }}>
        <div className="nav__inner">
          <Link to="/" className="nav__brand">
            <Wordmark height={44} />
          </Link>
          <ApplyLink to="/" label="Back home" icon="back" iconFirst className="link-apply--back" />
        </div>
      </header>

      <div className="reg__wrap">
        <AnimatePresence mode="wait">
          {status === "done" ? (
            <motion.div
              key="done"
              className="reg__done"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <motion.span
                className="reg__tick"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                aria-hidden="true"
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </motion.span>

              <SplitText as="h1" className="display" lines={["YOU'RE ON", "THE _LIST_"]} style={{ fontSize: "clamp(32px, 6vw, 64px)", "--outline-size": "1em" }} />

              <p className="lede" style={{ margin: "0 auto" }}>
                Thanks {values.firstName}. We've got your application for {event.name}{" "}
                {event.edition}. Watch your inbox at <b className="brand">{values.email}</b>.
              </p>

              <Link to="/" className="link-apply link-apply--outline" style={{ marginTop: 10 }}>
                <span className="link-apply__label">Back to the event</span>
              </Link>
            </motion.div>
          ) : (
            <motion.div key="form" exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <div style={{ textAlign: "center", marginBottom: "clamp(34px, 5vh, 54px)" }}>
                <SplitText
                  as="h1"
                  className="display"
                  lines={["GET YOUR", "_BOARDING PASS_"]}
                  style={{ fontSize: "clamp(32px, 6vw, 72px)", lineHeight: 1.12, "--outline-size": "1em", marginBottom: 16 }}
                />
                <motion.p
                  className="lede"
                  style={{ margin: "0 auto" }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
                >
                  Ten questions and your CV. Three minutes, start to finish.
                </motion.p>
              </div>

              <motion.form
                className="form"
                onSubmit={onSubmit}
                noValidate
                variants={container}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={row} className="form__cell">
                  <TextField label="First name" value={values.firstName} onChange={set("firstName")} error={errors.firstName} required autoComplete="given-name" />
                </motion.div>

                <motion.div variants={row} className="form__cell">
                  <TextField label="Last name" value={values.lastName} onChange={set("lastName")} error={errors.lastName} required autoComplete="family-name" />
                </motion.div>

                <motion.div variants={row} className="form__cell">
                  <TextField label="Email" type="email" value={values.email} onChange={set("email")} error={errors.email} required autoComplete="email" placeholder="you@example.com" />
                </motion.div>

                <motion.div variants={row} className="form__cell">
                  <TextField label="WhatsApp number" type="tel" inputMode="tel" value={values.whatsapp} onChange={set("whatsapp")} error={errors.whatsapp} required autoComplete="tel" placeholder="+216 …" />
                </motion.div>

                <motion.div variants={row} className="form__cell form__cell--full">
                  <Combobox label="University" options={UNIVERSITIES} value={values.university} onChange={set("university")} error={errors.university} required full placeholder="Search your university…" />
                </motion.div>

                <motion.div variants={row} className="form__cell">
                  <Combobox label="Field of study" options={FIELDS_OF_STUDY} value={values.fieldOfStudy} onChange={set("fieldOfStudy")} error={errors.fieldOfStudy} required placeholder="Search…" />
                </motion.div>

                <motion.div variants={row} className="form__cell">
                  <Combobox label="Year of study" options={YEARS_OF_STUDY} value={values.yearOfStudy} onChange={set("yearOfStudy")} error={errors.yearOfStudy} required searchable={false} />
                </motion.div>

                <motion.div variants={row} className="form__cell">
                  <Combobox label="How did you hear about us?" options={REFERRALS} value={values.referral} onChange={set("referral")} error={errors.referral} required searchable={false} />
                </motion.div>

                <motion.div variants={row} className="form__cell">
                  <TextField label="LinkedIn profile" type="url" value={values.linkedin} onChange={set("linkedin")} error={errors.linkedin} placeholder="linkedin.com/in/…" />
                </motion.div>

                <motion.div variants={row} className="form__cell form__cell--full">
                  <FileField label="Attach your CV" value={values.cv} onChange={set("cv")} error={errors.cv} onReject={(msg) => setErrors((e) => ({ ...e, cv: msg || undefined }))} required full />
                </motion.div>

                <motion.div variants={row} className="form__cell form__cell--full form__foot">
                  <button type="submit" className="link-apply link-apply--solid form__submit" disabled={status === "sending"}>
                    <span className="link-apply__label">
                      {status === "sending" ? "Sending…" : "Submit application"}
                    </span>
                    <span className="link-apply__track" aria-hidden="true">
                      <svg className="link-apply__plane" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <g transform="rotate(90 12 12)">
                          <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
                        </g>
                      </svg>
                    </span>
                  </button>

                  {status === "failed" && (
                    <p className="field__msg field__msg--error" role="alert">
                      Something went wrong sending that. Try again in a moment.
                    </p>
                  )}
                </motion.div>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
