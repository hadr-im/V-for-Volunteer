import { team } from "../data/content";
import { SectionLabel } from "./Speakers";

export default function Team() {
  return (
    <section id="team" style={{ padding: "120px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel
          tag="Organizing Team"
          title="Project Lead"
          sub="Meet the person behind the event."
        />

        {/* Centered large card */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 48,
          }}
        >
          {team.map((member) => (
            <div
              key={member.id}
              className="reveal"
              style={{
                width: "100%",
                maxWidth: 520, // 👈 bigger card
                background: "var(--bg-card)",
                border: "0.5px solid var(--border)",
                borderRadius: 20,
                padding: "40px 36px",
                textAlign: "center",
                transition: "border-color 0.25s, transform 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  "rgba(0,176,155,0.45)";
                e.currentTarget.style.transform = "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* BIG Photo */}
              <div
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: 16,
                  background: "var(--teal)",
                  margin: "0 auto 24px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 48,
                      color: "#fff",
                    }}
                  >
                    {member.avatar}
                  </span>
                )}
              </div>

              {/* Name */}
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                {member.name}
              </h3>

              {/* Role */}
              <p
                style={{
                  fontSize: 14,
                  color: "var(--teal)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 20,
                }}
              >
                {member.role}
              </p>

              {/* Contact */}
              <div
                style={{
                  borderTop: "0.5px solid var(--border)",
                  paddingTop: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                {member.phone && (
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--text-secondary, #aaa)",
                    }}
                  >
                    {member.phone}
                  </p>
                )}
                {member.email && (
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--text-secondary, #aaa)",
                    }}
                  >
                    {member.email}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}