import { motion } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

const budgets = ["< $25k", "$25k — $75k", "$75k — $150k", "$150k+"];

const schema = z.object({
  name: z.string().trim().min(1, "Your name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  budget: z.enum(budgets as [string, ...string[]], {
    message: "Pick a budget range",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (10+ characters)")
    .max(1000, "Keep it under 1000 characters"),
});

type FormState = { name: string; email: string; budget: string; message: string };
type Errors = Partial<Record<keyof FormState, string>>;

const initial: FormState = { name: "", email: "", budget: "", message: "" };

export function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

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
    await new Promise((r) => setTimeout(r, 700));
    setPending(false);
    setSubmitted(true);
    setForm(initial);
    toast.success("Message received — we'll be in touch within 48 hours.");
  };

  return (
    <section id="contact-form" className="px-6 md:px-12 py-24 md:py-32 bg-paper-soft grain">
      <div className="grid md:grid-cols-12 gap-10 max-w-7xl mx-auto">
        <div className="md:col-span-5">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
            ⟶ Start a project
          </div>
          <h2 className="font-display font-bold text-5xl md:text-7xl tracking-[-0.03em] mb-6">
            Tell us <em className="italic font-light">everything</em>.
          </h2>
          <p className="text-lg text-muted-foreground max-w-md">
            We respond to every brief within 48 hours. The more context you share, the sharper our reply.
          </p>
        </div>

        <div className="md:col-span-7">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="border border-ink/20 bg-paper p-10 md:p-14 rounded-sm"
            >
              <div className="text-5xl mb-6">✦</div>
              <h3 className="font-display font-semibold text-3xl md:text-4xl mb-4 tracking-tight">
                Brief received.
              </h3>
              <p className="text-muted-foreground text-lg mb-8 max-w-md">
                Thank you — a senior partner will reach out within two business days. In the meantime, enjoy the rest of the site.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="hover-link text-sm font-medium uppercase tracking-widest"
              >
                Send another →
              </button>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-8">
              <Field label="Name" error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  maxLength={100}
                  placeholder="Camille Vasseur"
                  className="w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none py-3 text-xl md:text-2xl font-display placeholder:text-ink/30 transition-colors"
                />
              </Field>

              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  maxLength={255}
                  placeholder="you@company.com"
                  className="w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none py-3 text-xl md:text-2xl font-display placeholder:text-ink/30 transition-colors"
                />
              </Field>

              <Field label="Budget" error={errors.budget}>
                <div className="flex flex-wrap gap-2 pt-2">
                  {budgets.map((b) => {
                    const active = form.budget === b;
                    return (
                      <button
                        type="button"
                        key={b}
                        onClick={() => update("budget", b)}
                        className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all ${
                          active
                            ? "bg-ink text-paper border-ink"
                            : "border-ink/30 hover:border-ink text-ink"
                        }`}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </Field>

              <Field label="Project" error={errors.message}>
                <textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  maxLength={1000}
                  rows={4}
                  placeholder="A few words on what you're building, your timeline and what success looks like…"
                  className="w-full bg-transparent border-b border-ink/30 focus:border-ink outline-none py-3 text-lg md:text-xl font-body placeholder:text-ink/30 transition-colors resize-none"
                />
                <div className="text-xs text-muted-foreground text-right mt-1">
                  {form.message.length}/1000
                </div>
              </Field>

              <div className="pt-4 flex items-center justify-between border-t border-ink/15">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  We reply within 48h
                </p>
                <button
                  type="submit"
                  disabled={pending}
                  className="group inline-flex items-center gap-3 bg-ink text-paper px-8 py-4 rounded-full font-medium text-sm uppercase tracking-widest transition-all hover:gap-5 disabled:opacity-60"
                >
                  {pending ? "Sending…" : "Send brief"}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium block mb-1">
        {label}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-destructive text-sm mt-2"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
