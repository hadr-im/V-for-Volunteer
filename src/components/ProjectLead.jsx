import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { crew } from "../data/content";
import SplitText from "./ui/SplitText";

const EASE = [0.16, 1, 0.3, 1];

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 6 10-6" />
  </svg>
);

const Chevron = ({ dir }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir > 0 ? "m9 6 6 6-6 6" : "m15 6-6 6 6 6"} />
  </svg>
);

/* Direction-aware: forward slides left, back slides right, so the motion
   always matches the arrow that caused it. */
const photoVariants = {
  enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", scale: 1.08, opacity: 0 }),
  center: { x: "0%", scale: 1, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? "-60%" : "60%", scale: 1.04, opacity: 0 }),
};

const blockVariants = {
  enter: (dir) => ({ y: dir > 0 ? 26 : -26, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (dir) => ({ y: dir > 0 ? -20 : 20, opacity: 0 }),
};

export default function ProjectLead() {
  const reduced = useReducedMotion();
  const [[index, direction], setPage] = useState([0, 0]);

  const member = crew[index];
  const many = crew.length > 1;

  const paginate = (dir) =>
    setPage(([i]) => [(i + dir + crew.length) % crew.length, dir]);

  // With reduced motion the slides cross-fade in place instead of travelling.
  const photo = reduced
    ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
    : photoVariants;
  const block = reduced
    ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
    : blockVariants;

  // Scroll-entrance variants (distinct from the pager's above).
  const frame = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
        show: {
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          transition: { duration: 0.95, ease: EASE },
        },
      };

  const column = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
      };

  return (
    <section id="lead" className="section">
      <div
        className="glow"
        style={{ width: "44vw", height: "44vw", maxWidth: 500, maxHeight: 500, bottom: "4%", right: "-10%", "--aurora-dur": "32s", "--aurora-delay": "-4s" }}
      />

      <div className="shell">
        <div className="lead__head">
          {/* --outline-size 1em so TEAM matches MEET THE rather than
              running larger as the hero's outlined word does. */}
          <SplitText
            as="h2"
            className="display h2"
            lines={["MEET THE _TEAM_"]}
            style={{ "--outline-size": "1em" }}
          />

          <motion.div
            className="crew-nav"
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          >
            <span className="crew-nav__count">
              <b>{String(index + 1).padStart(2, "0")}</b> / {String(crew.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              className="crew-nav__btn"
              onClick={() => paginate(-1)}
              disabled={!many}
              aria-label="Previous team member"
            >
              <Chevron dir={-1} />
            </button>
            <button
              type="button"
              className="crew-nav__btn"
              onClick={() => paginate(1)}
              disabled={!many}
              aria-label="Next team member"
            >
              <Chevron dir={1} />
            </button>
          </motion.div>
        </div>

        {/* Scroll entrance for the block as a whole. The pager's own
            AnimatePresence handles everything after that, so the two
            never animate the same element at the same time. */}
        <motion.div
          className="lead__grid"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div className="lead__photo" variants={frame}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={member.id}
                className="lead__slide"
                custom={direction}
                variants={photo}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.75, ease: EASE }}
              >
                {member.photo ? (
                  <img src={member.photo} alt={member.name} />
                ) : (
                  <span className="lead__initials">{member.initials}</span>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div variants={column}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={member.id}
                custom={direction}
                variants={block}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: EASE }}
              >
                <SplitText
                  as="h3"
                  className="display"
                  lines={[member.name]}
                  style={{ fontSize: "clamp(28px, 5.5vw, 52px)", marginBottom: 10 }}
                  duration={0.7}
                />

                <p className="mono teal" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 22 }}>
                  {member.role}
                </p>

                <p className="lede">{member.bio}</p>

                <div className="lead__contacts">
                  {member.phone && (
                    <a className="lead__contact" href={`tel:${member.phone.replace(/\s/g, "")}`}>
                      <PhoneIcon />
                      {member.phone}
                    </a>
                  )}
                  {member.email && (
                    <a className="lead__contact" href={`mailto:${member.email}`}>
                      <MailIcon />
                      {member.email}
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
