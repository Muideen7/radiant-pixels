"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

const services = [
  { id: "brand", label: "Brand identity" },
  { id: "website", label: "Website" },
  { id: "product", label: "Digital product" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "campaign", label: "Campaign" },
  { id: "other", label: "Something else" },
];

const budgets = ["< $25k", "$25k — $75k", "$75k — $150k", "$150k+"];
const timelines = ["ASAP", "1–3 months", "3–6 months", "Just exploring"];

const schema = z.object({
  name: z.string().trim().min(1, "Your name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  services: z.array(z.string()).min(1, "Pick at least one service"),
  budget: z.enum(budgets as [string, ...string[]], { message: "Pick a budget range" }),
  timeline: z.enum(timelines as [string, ...string[]], { message: "Pick a timeline" }),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (10+ characters)")
    .max(1000, "Keep it under 1000 characters"),
});

type FormState = {
  name: string;
  email: string;
  company: string;
  services: string[];
  budget: string;
  timeline: string;
  message: string;
};
type Errors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: "",
  email: "",
  company: "",
  services: [],
  budget: "",
  timeline: "",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  // Refs for focus management
  const fieldRefs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    company: useRef<HTMLInputElement>(null),
    services: useRef<HTMLButtonElement>(null),
    budget: useRef<HTMLButtonElement>(null),
    timeline: useRef<HTMLButtonElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const sendAnotherRef = useRef<HTMLButtonElement>(null);

  // Stable IDs for label/control + aria-describedby wiring
  const uid = useId();
  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    company: `${uid}-company`,
    services: `${uid}-services`,
    budget: `${uid}-budget`,
    timeline: `${uid}-timeline`,
    message: `${uid}-message`,
    messageCount: `${uid}-message-count`,
    progress: `${uid}-progress`,
  };
  const errId = (k: keyof FormState) => `${uid}-${k}-error`;

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const toggleService = (id: string) => {
    const next = form.services.includes(id)
      ? form.services.filter((s) => s !== id)
      : [...form.services, id];
    update("services", next);
  };

  // Roving-style keyboard nav for radio-like pill groups (budget/timeline)
  const handleRadioKey = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    options: string[],
    current: string,
    field: "budget" | "timeline",
  ) => {
    const idx = Math.max(0, options.indexOf(current));
    let nextIdx: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") nextIdx = (idx + 1) % options.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft")
      nextIdx = (idx - 1 + options.length) % options.length;
    if (e.key === "Home") nextIdx = 0;
    if (e.key === "End") nextIdx = options.length - 1;
    if (nextIdx !== null) {
      e.preventDefault();
      update(field, options[nextIdx]);
      const group = e.currentTarget.parentElement;
      const buttons = group?.querySelectorAll<HTMLButtonElement>("[role='radio']");
      buttons?.[nextIdx]?.focus();
    }
  };

  const filled = [
    form.name.length > 0,
    form.email.length > 0,
    form.services.length > 0,
    form.budget.length > 0,
    form.timeline.length > 0,
    form.message.length >= 10,
  ].filter(Boolean).length;
  const progress = Math.round((filled / 6) * 100);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormState;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields.");
      // Focus the first invalid field for keyboard / SR users
      const order: (keyof FormState)[] = [
        "name",
        "email",
        "services",
        "budget",
        "timeline",
        "message",
      ];
      const firstInvalid = order.find((k) => fieldErrors[k]);
      if (firstInvalid) {
        requestAnimationFrame(() => fieldRefs[firstInvalid].current?.focus());
      }
      return;
    }
    setPending(true);
    await new Promise((r) => setTimeout(r, 800));
    setPending(false);
    setSubmitted(true);
    setForm(initial);
    toast.success("Brief received — we'll be in touch within 48 hours.");
  };

  // When success panel appears, move focus to its heading for SR users
  useEffect(() => {
    if (submitted) {
      requestAnimationFrame(() => successHeadingRef.current?.focus());
    }
  }, [submitted]);

  return (
    <section
      id="contact-form"
      aria-labelledby={`${uid}-heading`}
      className="relative px-6 md:px-12 py-24 md:py-32 bg-paper-soft grain overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-10 mb-16 md:mb-20">
          <div className="md:col-span-7">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-ink/40" aria-hidden="true" />
              <span>(04) — Start a project</span>
            </div>
            <h2
              id={`${uid}-heading`}
              className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-[-0.035em] leading-[0.95]"
            >
              {["Let's make", "something worth", "remembering."].map((line, i) => (
                <span key={i} className="block overflow-hidden pb-1 -mb-1">
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                    className={`block ${i === 1 ? "font-serif font-light italic" : ""}`}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-6 flex flex-col justify-end">
            <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed mb-6">
              Tell us about the project. Every brief is read by a partner —
              not a form bot. We reply within two business days, always.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="mailto:hello@studio.com" className="hover-link font-medium">
                hello@studio.com
              </a>
              <span className="text-muted-foreground text-xs uppercase tracking-widest">
                Or write us directly
              </span>
            </div>
          </div>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
            role="status"
            aria-live="polite"
            className="border border-ink/15 bg-paper p-12 md:p-20 rounded-sm text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              aria-hidden="true"
              className="text-6xl mb-8 text-ember"
            >
              ✦
            </motion.div>
            <h3
              ref={successHeadingRef}
              tabIndex={-1}
              className="font-display font-semibold text-4xl md:text-5xl mb-5 tracking-tight outline-none"
            >
              Brief received.
            </h3>
            <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto leading-relaxed">
              A senior partner will reach out within two business days. While
              you wait, have a wander through our work.
            </p>
            <button
              ref={sendAnotherRef}
              onClick={() => setSubmitted(false)}
              className="hover-link text-sm font-medium uppercase tracking-widest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              Send another brief →
            </button>
          </motion.div>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            aria-labelledby={`${uid}-heading`}
            className="grid md:grid-cols-12 gap-x-10 gap-y-12 border-t border-ink/15 pt-12"
          >
            {/* Left column — identity */}
            <div className="md:col-span-5 space-y-10">
              <NumberedField
                index="01"
                label="Your name"
                htmlFor={ids.name}
                error={errors.name}
                errorId={errId("name")}
              >
                <input
                  id={ids.name}
                  ref={fieldRefs.name}
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  maxLength={100}
                  placeholder="Camille Vasseur"
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? errId("name") : undefined}
                  className="w-full bg-transparent border-b border-ink/25 focus:border-ink outline-none py-3 text-2xl md:text-3xl font-display tracking-tight placeholder:text-ink/25 transition-colors focus-visible:border-ink"
                />
              </NumberedField>

              <NumberedField
                index="02"
                label="Email"
                htmlFor={ids.email}
                error={errors.email}
                errorId={errId("email")}
              >
                <input
                  id={ids.email}
                  ref={fieldRefs.email}
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  maxLength={255}
                  placeholder="you@studio.com"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? errId("email") : undefined}
                  className="w-full bg-transparent border-b border-ink/25 focus:border-ink outline-none py-3 text-2xl md:text-3xl font-display tracking-tight placeholder:text-ink/25 transition-colors"
                />
              </NumberedField>

              <NumberedField
                index="03"
                label="Company"
                htmlFor={ids.company}
                hint="Optional"
              >
                <input
                  id={ids.company}
                  ref={fieldRefs.company}
                  type="text"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  maxLength={120}
                  placeholder="Acme & Co."
                  autoComplete="organization"
                  className="w-full bg-transparent border-b border-ink/25 focus:border-ink outline-none py-3 text-2xl md:text-3xl font-display tracking-tight placeholder:text-ink/25 transition-colors"
                />
              </NumberedField>
            </div>

            {/* Right column — project shape */}
            <div className="md:col-span-7 space-y-10">
              {/* Services — group of toggleable checkboxes */}
              <NumberedFieldGroup
                index="04"
                label="What do you need?"
                groupId={ids.services}
                hint="Select all that apply"
                error={errors.services}
                errorId={errId("services")}
              >
                <div
                  role="group"
                  aria-labelledby={`${ids.services}-label`}
                  aria-describedby={errors.services ? errId("services") : undefined}
                  className="flex flex-wrap gap-2 pt-3"
                >
                  {services.map((s, i) => {
                    const active = form.services.includes(s.id);
                    return (
                      <button
                        type="button"
                        key={s.id}
                        ref={i === 0 ? fieldRefs.services : undefined}
                        role="checkbox"
                        aria-checked={active}
                        aria-label={s.label}
                        onClick={() => toggleService(s.id)}
                        onKeyDown={(e) => {
                          if (e.key === " " || e.key === "Enter") {
                            e.preventDefault();
                            toggleService(s.id);
                          }
                        }}
                        className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                          active
                            ? "bg-ink text-paper border-ink"
                            : "border-ink/25 hover:border-ink text-ink"
                        }`}
                      >
                        {active && (
                          <span className="mr-1.5" aria-hidden="true">
                            ✓
                          </span>
                        )}
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </NumberedFieldGroup>

              <div className="grid sm:grid-cols-2 gap-10">
                <NumberedFieldGroup
                  index="05"
                  label="Budget"
                  groupId={ids.budget}
                  error={errors.budget}
                  errorId={errId("budget")}
                >
                  <div
                    role="radiogroup"
                    aria-labelledby={`${ids.budget}-label`}
                    aria-describedby={errors.budget ? errId("budget") : undefined}
                    aria-required="true"
                    className="flex flex-col gap-2 pt-3"
                  >
                    {budgets.map((b, i) => {
                      const active = form.budget === b;
                      const isFirst = i === 0;
                      // Tab stop: first item if nothing chosen, otherwise the chosen item
                      const tabIndex =
                        (form.budget === "" && isFirst) || active ? 0 : -1;
                      return (
                        <button
                          type="button"
                          key={b}
                          ref={isFirst ? fieldRefs.budget : undefined}
                          role="radio"
                          aria-checked={active}
                          tabIndex={tabIndex}
                          onClick={() => update("budget", b)}
                          onKeyDown={(e) => handleRadioKey(e, budgets, form.budget, "budget")}
                          className={`text-left px-4 py-2.5 rounded-sm border text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                            active
                              ? "bg-ink text-paper border-ink"
                              : "border-ink/20 hover:border-ink text-ink"
                          }`}
                        >
                          {b}
                        </button>
                      );
                    })}
                  </div>
                </NumberedFieldGroup>

                <NumberedFieldGroup
                  index="06"
                  label="Timeline"
                  groupId={ids.timeline}
                  error={errors.timeline}
                  errorId={errId("timeline")}
                >
                  <div
                    role="radiogroup"
                    aria-labelledby={`${ids.timeline}-label`}
                    aria-describedby={errors.timeline ? errId("timeline") : undefined}
                    aria-required="true"
                    className="flex flex-col gap-2 pt-3"
                  >
                    {timelines.map((t, i) => {
                      const active = form.timeline === t;
                      const isFirst = i === 0;
                      const tabIndex =
                        (form.timeline === "" && isFirst) || active ? 0 : -1;
                      return (
                        <button
                          type="button"
                          key={t}
                          ref={isFirst ? fieldRefs.timeline : undefined}
                          role="radio"
                          aria-checked={active}
                          tabIndex={tabIndex}
                          onClick={() => update("timeline", t)}
                          onKeyDown={(e) =>
                            handleRadioKey(e, timelines, form.timeline, "timeline")
                          }
                          className={`text-left px-4 py-2.5 rounded-sm border text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                            active
                              ? "bg-ink text-paper border-ink"
                              : "border-ink/20 hover:border-ink text-ink"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </NumberedFieldGroup>
              </div>

              <NumberedField
                index="07"
                label="Tell us about the project"
                htmlFor={ids.message}
                error={errors.message}
                errorId={errId("message")}
              >
                <textarea
                  id={ids.message}
                  ref={fieldRefs.message}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  maxLength={1000}
                  rows={5}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={`${ids.messageCount}${
                    errors.message ? ` ${errId("message")}` : ""
                  }`}
                  placeholder="What you're building, who it's for, and what success looks like…"
                  className="w-full bg-transparent border-b border-ink/25 focus:border-ink outline-none py-3 text-lg md:text-xl font-body placeholder:text-ink/30 transition-colors resize-none"
                />
                <div
                  id={ids.messageCount}
                  aria-live="polite"
                  className="text-xs text-muted-foreground text-right mt-1 tabular-nums"
                >
                  <span className="sr-only">Characters used: </span>
                  {form.message.length} / 1000
                </div>
              </NumberedField>
            </div>

            {/* Footer — progress + submit */}
            <div className="md:col-span-12 pt-8 border-t border-ink/15">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1 max-w-sm">
                  <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    <label htmlFor={ids.progress}>Brief completion</label>
                    <span className="tabular-nums font-medium text-ink">{progress}%</span>
                  </div>
                  <div
                    id={ids.progress}
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Brief completion"
                    className="h-px bg-ink/15 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-ember"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      style={{ height: "2px", top: "-0.5px" }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={pending}
                  aria-busy={pending}
                  aria-label={pending ? "Sending brief" : "Send brief"}
                  className="group inline-flex items-center gap-3 bg-ink text-paper pl-8 pr-2 py-2.5 rounded-full font-medium text-sm uppercase tracking-widest transition-all hover:gap-5 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={pending ? "sending" : "send"}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                    >
                      {pending ? "Sending…" : "Send brief"}
                    </motion.span>
                  </AnimatePresence>
                  <span
                    aria-hidden="true"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-ember text-paper transition-transform group-hover:rotate-45"
                  >
                    ↗
                  </span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function NumberedField({
  index,
  label,
  htmlFor,
  hint,
  error,
  errorId,
  children,
}: {
  index: string;
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  errorId?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <label
          htmlFor={htmlFor}
          className="text-xs uppercase tracking-widest text-muted-foreground font-medium flex items-center gap-3"
        >
          <span className="text-ink/40 tabular-nums" aria-hidden="true">
            {index}
          </span>
          <span>{label}</span>
        </label>
        {hint && (
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground italic font-serif">
            {hint}
          </span>
        )}
      </div>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-destructive text-sm mt-2"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function NumberedFieldGroup({
  index,
  label,
  groupId,
  hint,
  error,
  errorId,
  children,
}: {
  index: string;
  label: string;
  groupId: string;
  hint?: string;
  error?: string;
  errorId?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span
          id={`${groupId}-label`}
          className="text-xs uppercase tracking-widest text-muted-foreground font-medium flex items-center gap-3"
        >
          <span className="text-ink/40 tabular-nums" aria-hidden="true">
            {index}
          </span>
          <span>{label}</span>
        </span>
        {hint && (
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground italic font-serif">
            {hint}
          </span>
        )}
      </div>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-destructive text-sm mt-2"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
