import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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
      return;
    }
    setPending(true);
    await new Promise((r) => setTimeout(r, 800));
    setPending(false);
    setSubmitted(true);
    setForm(initial);
    toast.success("Brief received — we'll be in touch within 48 hours.");
  };

  return (
    <section
      id="contact-form"
      className="relative px-6 md:px-12 py-24 md:py-32 bg-paper-soft grain overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-10 mb-16 md:mb-20">
          <div className="md:col-span-7">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-ink/40" />
              <span>(04) — Start a project</span>
            </div>
            <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-[-0.035em] leading-[0.95]">
              Let's make
              <br />
              <em className="font-serif font-light italic">something worth</em>
              <br />
              remembering.
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
            className="border border-ink/15 bg-paper p-12 md:p-20 rounded-sm text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              className="text-6xl mb-8 text-ember"
            >
              ✦
            </motion.div>
            <h3 className="font-display font-semibold text-4xl md:text-5xl mb-5 tracking-tight">
              Brief received.
            </h3>
            <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto leading-relaxed">
              A senior partner will reach out within two business days. While
              you wait, have a wander through our work.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="hover-link text-sm font-medium uppercase tracking-widest"
            >
              Send another brief →
            </button>
          </motion.div>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="grid md:grid-cols-12 gap-x-10 gap-y-12 border-t border-ink/15 pt-12"
          >
            {/* Left column — identity */}
            <div className="md:col-span-5 space-y-10">
              <NumberedField
                index="01"
                label="Your name"
                error={errors.name}
              >
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  maxLength={100}
                  placeholder="Camille Vasseur"
                  className="w-full bg-transparent border-b border-ink/25 focus:border-ink outline-none py-3 text-2xl md:text-3xl font-display tracking-tight placeholder:text-ink/25 transition-colors"
                />
              </NumberedField>

              <NumberedField
                index="02"
                label="Email"
                error={errors.email}
              >
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  maxLength={255}
                  placeholder="you@studio.com"
                  className="w-full bg-transparent border-b border-ink/25 focus:border-ink outline-none py-3 text-2xl md:text-3xl font-display tracking-tight placeholder:text-ink/25 transition-colors"
                />
              </NumberedField>

              <NumberedField
                index="03"
                label="Company"
                hint="Optional"
              >
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  maxLength={120}
                  placeholder="Acme & Co."
                  className="w-full bg-transparent border-b border-ink/25 focus:border-ink outline-none py-3 text-2xl md:text-3xl font-display tracking-tight placeholder:text-ink/25 transition-colors"
                />
              </NumberedField>
            </div>

            {/* Right column — project shape */}
            <div className="md:col-span-7 space-y-10">
              <NumberedField
                index="04"
                label="What do you need?"
                hint="Select all that apply"
                error={errors.services}
              >
                <div className="flex flex-wrap gap-2 pt-3">
                  {services.map((s) => {
                    const active = form.services.includes(s.id);
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => toggleService(s.id)}
                        className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all ${
                          active
                            ? "bg-ink text-paper border-ink"
                            : "border-ink/25 hover:border-ink text-ink"
                        }`}
                      >
                        {active && <span className="mr-1.5">✓</span>}
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </NumberedField>

              <div className="grid sm:grid-cols-2 gap-10">
                <NumberedField index="05" label="Budget" error={errors.budget}>
                  <div className="flex flex-col gap-2 pt-3">
                    {budgets.map((b) => {
                      const active = form.budget === b;
                      return (
                        <button
                          type="button"
                          key={b}
                          onClick={() => update("budget", b)}
                          className={`text-left px-4 py-2.5 rounded-sm border text-sm font-medium transition-all ${
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
                </NumberedField>

                <NumberedField index="06" label="Timeline" error={errors.timeline}>
                  <div className="flex flex-col gap-2 pt-3">
                    {timelines.map((t) => {
                      const active = form.timeline === t;
                      return (
                        <button
                          type="button"
                          key={t}
                          onClick={() => update("timeline", t)}
                          className={`text-left px-4 py-2.5 rounded-sm border text-sm font-medium transition-all ${
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
                </NumberedField>
              </div>

              <NumberedField
                index="07"
                label="Tell us about the project"
                error={errors.message}
              >
                <textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  maxLength={1000}
                  rows={5}
                  placeholder="What you're building, who it's for, and what success looks like…"
                  className="w-full bg-transparent border-b border-ink/25 focus:border-ink outline-none py-3 text-lg md:text-xl font-body placeholder:text-ink/30 transition-colors resize-none"
                />
                <div className="text-xs text-muted-foreground text-right mt-1 tabular-nums">
                  {form.message.length} / 1000
                </div>
              </NumberedField>
            </div>

            {/* Footer — progress + submit */}
            <div className="md:col-span-12 pt-8 border-t border-ink/15">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1 max-w-sm">
                  <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    <span>Brief completion</span>
                    <span className="tabular-nums font-medium text-ink">
                      {progress}%
                    </span>
                  </div>
                  <div className="h-px bg-ink/15 relative overflow-hidden">
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
                  className="group inline-flex items-center gap-3 bg-ink text-paper pl-8 pr-2 py-2.5 rounded-full font-medium text-sm uppercase tracking-widest transition-all hover:gap-5 disabled:opacity-60"
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
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-ember text-paper transition-transform group-hover:rotate-45">
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
  hint,
  error,
  children,
}: {
  index: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium flex items-center gap-3">
          <span className="text-ink/40 tabular-nums">{index}</span>
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
