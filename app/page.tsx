import Link from "next/link";

const identityCards = [
  {
    title: "Cohort-Based Learning",
    description: "Structured timelines, guided progression, and defined outcomes.",
  },
  {
    title: "Mentor-Led Methodology",
    description:
      "Programs designed and delivered by active research professionals.",
  },
  {
    title: "Verified Credentials",
    description: "QR-enabled certificate verification with unique IDs.",
  },
];

const programs = [
  {
    title: "Systematic Review & Meta-Analysis",
    description: "Rigorous evidence synthesis with publication-ready workflows.",
  },
  {
    title: "Global Burden of Disease Analytics",
    description: "Interpret and communicate comparative population health metrics.",
  },
  {
    title: "Qualitative Research Methods",
    description:
      "Design, coding, and interpretation for robust qualitative inquiry.",
  },
  {
    title: "AI Tools for Research & Manuscript Writing",
    description:
      "Responsible AI integration for efficient scholarly research practice.",
  },
];

const modelPillars = [
  {
    title: "Clarity",
    description: "Methodological rigor",
  },
  {
    title: "Practice",
    description: "Real datasets and guided execution",
  },
  {
    title: "Proof",
    description: "Verified certification pathways",
  },
  {
    title: "Progression",
    description: "Foundation to publication support",
  },
];

const audiences = [
  "PhD & MPH Scholars",
  "Clinicians & Faculty",
  "Public Health Professionals",
  "Health Economists & Analysts",
  "Research Teams & Institutions",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F2FCF6] text-[#0F172A]">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10">
        <section className="relative overflow-hidden rounded-3xl border border-[#D8EDE8] bg-[#F2FCF6] px-8 py-16 shadow-[0_15px_35px_rgba(10,77,104,0.06)] md:px-14">
          <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_20%_20%,rgba(10,77,104,0.08)_0,transparent_35%),radial-gradient(circle_at_80%_30%,rgba(45,212,191,0.08)_0,transparent_30%),linear-gradient(rgba(10,77,104,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(10,77,104,0.03)_1px,transparent_1px)] [background-size:100%_100%,100%_100%,28px_28px,28px_28px]" />
          <div className="relative max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0A4D68]">
              MentorMost Private Limited
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-[#0A4D68] md:text-5xl">
              Research Mentorship. Global Standards. Built in India.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#475569]">
              MentorMost Private Limited is a research education platform designed
              to build publication-ready competence through structured cohorts,
              verified certifications, and mentorship-led training across
              high-impact methodologies.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#programs"
                className="rounded-lg bg-[#2DD4BF] px-6 py-3 text-sm font-semibold text-[#0F172A] transition hover:bg-[#23b8a5]"
              >
                Explore Programs
              </Link>
              <Link
                href="#verification"
                className="rounded-lg border border-[#0A4D68] px-6 py-3 text-sm font-semibold text-[#0A4D68] transition hover:bg-[#E3F4F3]"
              >
                Verify a Certificate
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-3xl bg-[#E6EEF3] px-8 py-14 md:px-12">
          <h2 className="text-3xl font-semibold text-[#0A4D68]">
            A Research Education Platform — Not Just Workshops
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-[#475569]">
            MentorMost is designed for long-term research competence with
            structured pathways, applied mentorship, verified certification, and
            outcomes that strengthen professional research credibility.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {identityCards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-[#D8EDE8] bg-[#F2FCF6] p-6 shadow-[0_8px_18px_rgba(10,77,104,0.05)]"
              >
                <h3 className="text-lg font-semibold text-[#0F172A]">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="programs" className="mt-16">
          <h2 className="text-3xl font-semibold text-[#0A4D68]">
            Flagship Learning Pathways
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {programs.map((program) => (
              <article
                key={program.title}
                className="rounded-2xl border border-[#D8EDE8] bg-white p-6 transition hover:border-[#2DD4BF] hover:shadow-[0_10px_24px_rgba(10,77,104,0.08)]"
              >
                <h3 className="text-lg font-semibold text-[#0F172A]">
                  {program.title}
                </h3>
                <p className="mt-2 text-sm text-[#475569]">{program.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="#"
              className="inline-flex rounded-lg border border-[#0A4D68] px-5 py-2.5 text-sm font-semibold text-[#0A4D68] transition hover:bg-[#E3F4F3]"
            >
              View All Programs
            </Link>
          </div>
        </section>

        <section
          id="verification"
          className="mt-16 grid gap-8 rounded-3xl border border-[#D8EDE8] bg-white px-8 py-12 md:grid-cols-2 md:px-12"
        >
          <div>
            <h2 className="text-3xl font-semibold text-[#0A4D68]">
              Certification That Can Be Verified
            </h2>
            <p className="mt-4 leading-relaxed text-[#475569]">
              Every MentorMost certificate is issued with transparent validation
              standards to support institutional credibility and professional use.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-[#0F172A]">
              <li>• Unique ID</li>
              <li>• QR verification</li>
              <li>• Professional design</li>
              <li>• Public verification page</li>
            </ul>
            <Link
              href="#"
              className="mt-8 inline-flex rounded-lg bg-[#2DD4BF] px-6 py-3 text-sm font-semibold text-[#0F172A] transition hover:bg-[#23b8a5]"
            >
              Verify a Certificate
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm rounded-2xl border border-[#D8EDE8] bg-[#F2FCF6] p-6 shadow-[0_8px_20px_rgba(10,77,104,0.08)]">
              <div className="rounded-xl border border-dashed border-[#0A4D68]/30 bg-white p-6 text-center">
                <p className="text-xs uppercase tracking-[0.16em] text-[#475569]">
                  Certificate Mockup
                </p>
                <p className="mt-5 text-lg font-semibold text-[#0A4D68]">
                  MentorMost Private Limited
                </p>
                <div className="mt-5 rounded-lg border border-[#D8EDE8] bg-[#E3F4F3] p-3 text-left text-xs text-[#475569]">
                  Certificate ID: MM-2026-00427
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-3xl bg-[#E3F4F3] px-8 py-12 md:px-12">
          <h2 className="text-3xl font-semibold text-[#0A4D68]">
            The MentorMost Model
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {modelPillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-2xl border border-[#D8EDE8] bg-white p-5"
              >
                <h3 className="text-base font-semibold text-[#0F172A]">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm text-[#475569]">{pillar.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-semibold text-[#0A4D68]">Who We Serve</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((audience) => (
              <article
                key={audience}
                className="rounded-2xl border border-[#D8EDE8] bg-white px-5 py-4 text-sm font-medium text-[#0F172A]"
              >
                {audience}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-[#D8EDE8] bg-white px-8 py-12 md:px-12">
          <h2 className="text-3xl font-semibold text-[#0A4D68]">
            Research Intelligence, Explained.
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-[#475569]">
            MentorMost publishes methodology-first resources designed to clarify
            advanced research concepts for scholars, clinicians, and institutions
            seeking robust analytical practice.
          </p>
          <Link
            href="#"
            className="mt-7 inline-flex rounded-lg border border-[#0A4D68] px-5 py-2.5 text-sm font-semibold text-[#0A4D68] transition hover:bg-[#E3F4F3]"
          >
            Explore Resources
          </Link>
        </section>

        <section className="mt-16 rounded-3xl bg-[#0A4D68] px-8 py-14 text-white md:px-12">
          <h2 className="text-3xl font-semibold leading-tight">
            Ready to Build Publication-Grade Competence?
          </h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#programs"
              className="rounded-lg bg-[#2DD4BF] px-6 py-3 text-sm font-semibold text-[#0F172A] transition hover:bg-[#23b8a5]"
            >
              Explore Upcoming Cohorts
            </Link>
            <Link
              href="#"
              className="rounded-lg border border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contact MentorMost
            </Link>
          </div>
        </section>
      </div>

      <footer className="border-t border-[#D8EDE8] bg-[#F2FCF6] px-6 py-10 md:px-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 text-sm text-[#475569] md:flex-row md:items-center md:justify-between">
          <p className="font-semibold text-[#0A4D68]">MentorMost Private Limited</p>
          <div className="flex flex-wrap gap-4">
            <Link href="mailto:contact@mentormost.in" className="hover:text-[#0A4D68]">
              Email
            </Link>
            <Link href="#programs" className="hover:text-[#0A4D68]">
              Programs
            </Link>
            <Link href="#verification" className="hover:text-[#0A4D68]">
              Certificate Verification
            </Link>
            <Link href="#" className="hover:text-[#0A4D68]">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[#0A4D68]">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
