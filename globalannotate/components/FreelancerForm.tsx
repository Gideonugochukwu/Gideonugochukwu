"use client";

import { useMemo, useState } from "react";
import { Loader2, Send, CheckCircle2, Plus, X } from "lucide-react";
import { useToast } from "./Toast";
import Combobox from "./Combobox";
import { COUNTRIES } from "@/lib/countries";
import { LANGUAGES } from "@/lib/languages";

// Self-contained freelancer application form. Posts the application as JSON
// to a Google Apps Script web app (NEXT_PUBLIC_FREELANCER_FORM_ENDPOINT),
// which appends a row to the recruiter's roster Google Sheet. No paid form
// service is used.
//
// The request is sent with a text/plain content type on purpose: that keeps
// it a CORS "simple request", so the browser does not fire a preflight
// OPTIONS call that Apps Script can't answer. The body is still JSON and the
// script parses e.postData.contents.

const ROLES = [
  "Translator",
  "Localization Specialist",
  "Transcriptionist",
  "Subtitler",
  "Voiceover Artist",
  "AI Data Annotator",
  "Social Media Manager",
  "Digital Marketer",
  "SEO Specialist",
  "Content Writer/Copywriter",
  "Graphic Designer",
  "Video Editor",
  "Project Manager",
  "Other",
];

// Roles that intrinsically work in language pairs.
const LANGUAGE_ROLES = new Set([
  "Translator",
  "Localization Specialist",
  "Transcriptionist",
  "Subtitler",
  "Voiceover Artist",
  "AI Data Annotator",
]);

const SERVICES = [
  "Translation",
  "MTPE",
  "Localization",
  "Transcription",
  "Subtitling",
  "Voiceover",
  "AI Data Annotation",
  "Game Localization",
  "Social Media Management",
  "Digital Marketing / Ads",
  "SEO",
  "Content Writing",
  "Graphic Design",
  "Video Editing",
  "Other",
];

// Services that are about working between two languages. If any of these is
// selected (or the chosen role is language-driven), Language Pairs becomes
// required.
const LANGUAGE_SERVICES = new Set([
  "Translation",
  "MTPE",
  "Localization",
  "Transcription",
  "Subtitling",
  "Voiceover",
  "AI Data Annotation",
  "Game Localization",
]);

const SPECIALIZATIONS = [
  "Legal",
  "Medical",
  "Technical",
  "Financial",
  "Marketing",
  "Gaming",
  "IT/Software",
  "Patents",
  "General",
];

const EXPERIENCE = ["0–1", "1–3", "3–5", "5–10", "10+"];
const CURRENCIES = ["USD", "EUR", "GBP", "NGN", "Other"];

type Errors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/[^\s]+$/i;

export default function FreelancerForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  // Plain text fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [catTools, setCatTools] = useState("");
  const [ratePerWord, setRatePerWord] = useState("");
  const [ratePerHour, setRatePerHour] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [cvLink, setCvLink] = useState("");
  const [note, setNote] = useState("");

  // Selects
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [currency, setCurrency] = useState("");

  // Multi-selects
  const [services, setServices] = useState<string[]>([]);
  const [specializations, setSpecializations] = useState<string[]>([]);

  // Language pairs builder
  const [pairs, setPairs] = useState<string[]>([]);
  const [pairSource, setPairSource] = useState("");
  const [pairTarget, setPairTarget] = useState("");

  // Consent
  const [consent, setConsent] = useState(false);

  const endpoint = process.env.NEXT_PUBLIC_FREELANCER_FORM_ENDPOINT;

  // Language pairs are required whenever the applicant's role OR any of
  // their selected services involves working between two languages.
  const pairsRequired = useMemo(() => {
    if (role && LANGUAGE_ROLES.has(role)) return true;
    return services.some((s) => LANGUAGE_SERVICES.has(s));
  }, [role, services]);

  function toggle(
    value: string,
    list: string[],
    setList: (v: string[]) => void
  ) {
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );
  }

  function addPair() {
    if (!pairSource || !pairTarget) {
      setErrors((e) => ({
        ...e,
        languagePairs: "Pick both a source and a target language",
      }));
      return;
    }
    if (pairSource === pairTarget) {
      setErrors((e) => ({
        ...e,
        languagePairs: "Source and target must be different",
      }));
      return;
    }
    const next = `${pairSource} > ${pairTarget}`;
    if (!pairs.includes(next)) setPairs([...pairs, next]);
    setPairSource("");
    setPairTarget("");
    setErrors((e) => ({ ...e, languagePairs: "" }));
  }

  function removePair(p: string) {
    setPairs(pairs.filter((x) => x !== p));
  }

  function validate(): Errors {
    const e: Errors = {};
    if (!role) e.role = "Select your primary role";
    if (fullName.trim().length < 2) e.fullName = "Please enter your full name";
    if (!EMAIL_RE.test(email)) e.email = "Enter a valid email address";
    if (!country) e.country = "Select your country";
    if (!nativeLanguage) e.nativeLanguage = "Select your native language";
    if (pairsRequired && pairs.length === 0)
      e.languagePairs =
        "Add at least one language pair for the role / services you selected";
    if (services.length === 0)
      e.services = "Pick at least one service you offer";
    if (!yearsExperience) e.yearsExperience = "Select your experience";
    if (!URL_RE.test(linkedin))
      e.linkedin = "Enter a valid URL (must start with https://)";
    if (!URL_RE.test(cvLink))
      e.cvLink = "Paste a shareable link (must start with https://)";
    if (!consent) e.consent = "Please agree before submitting";
    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = document.querySelector<HTMLElement>("[data-error='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (!endpoint) {
      toast(
        "Form endpoint not configured yet. Add NEXT_PUBLIC_FREELANCER_FORM_ENDPOINT.",
        "error"
      );
      return;
    }

    const payload = {
      role,
      fullName: fullName.trim(),
      email: email.trim(),
      country,
      timeZone: timeZone.trim(),
      nativeLanguage,
      languagePairs: pairs.join("; "),
      services: services.join(", "),
      specializations: specializations.join(", "),
      yearsExperience,
      catTools: catTools.trim(),
      ratePerWord: ratePerWord.trim(),
      ratePerHour: ratePerHour.trim(),
      currency,
      linkedin: linkedin.trim(),
      cvLink: cvLink.trim(),
      note: note.trim(),
    };

    setSending(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        redirect: "follow",
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data || data.result !== "success") {
        throw new Error("Submission failed");
      }
      setSubmitted(true);
      toast(
        "Thank you — your application is in. We'll be in touch when a project matches your languages."
      );
    } catch {
      toast(
        "Something went wrong sending your application. Please try again, or email us directly.",
        "error"
      );
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="card p-8 md:p-10 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-xl font-semibold">Application received</h3>
        <p className="mt-2 text-ink-600 max-w-md mx-auto">
          Thank you — your application is in. We&apos;ll be in touch when a
          project matches your languages.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 md:p-8 space-y-10" noValidate>
      {/* ── Section: About you ───────────────────────────────────────── */}
      <FormSection
        eyebrow="01"
        title="About you"
        description="The basics — who you are and where you work from."
      >
        <Field label="Primary role / profession" required error={errors.role}>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input"
          >
            <option value="" disabled>
              Select…
            </option>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Full name" required error={errors.fullName}>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input"
              placeholder="Jane Doe"
              autoComplete="name"
            />
          </Field>
          <Field label="Email" required error={errors.email}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              type="email"
              placeholder="jane@example.com"
              autoComplete="email"
            />
          </Field>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Country" required error={errors.country}>
            <Combobox
              value={country}
              onChange={(v) => {
                setCountry(v);
                if (v) setErrors((er) => ({ ...er, country: "" }));
              }}
              options={COUNTRIES}
              placeholder="Select…"
              invalid={Boolean(errors.country)}
              ariaLabel="Country"
            />
          </Field>
          <Field label="Time zone" error={errors.timeZone}>
            <input
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
              className="input"
              placeholder="e.g. WAT (UTC+1)"
            />
          </Field>
        </div>
      </FormSection>

      {/* ── Section: Languages ───────────────────────────────────────── */}
      <FormSection
        eyebrow="02"
        title="Languages"
        description="Your native language, plus any pairs you work in. Language pairs are required for translation-style roles and services."
      >
        <Field
          label="Native language"
          required
          error={errors.nativeLanguage}
        >
          <Combobox
            value={nativeLanguage}
            onChange={(v) => {
              setNativeLanguage(v);
              if (v) setErrors((er) => ({ ...er, nativeLanguage: "" }));
            }}
            options={LANGUAGES}
            placeholder="Select…"
            invalid={Boolean(errors.nativeLanguage)}
            ariaLabel="Native language"
          />
        </Field>

        <Field
          label="Language pairs"
          required={pairsRequired}
          error={errors.languagePairs}
          hint={
            pairsRequired
              ? "Add each pair you work in. Pick the source, then the target."
              : "Optional for non-language roles — add pairs if relevant."
          }
        >
          <div className="grid sm:grid-cols-[1fr_auto_1fr_auto] items-stretch gap-2">
            <Combobox
              value={pairSource}
              onChange={setPairSource}
              options={LANGUAGES}
              placeholder="Source language"
              ariaLabel="Source language"
            />
            <div className="hidden sm:flex items-center justify-center text-ink-400 text-sm font-medium">
              ›
            </div>
            <Combobox
              value={pairTarget}
              onChange={setPairTarget}
              options={LANGUAGES}
              placeholder="Target language"
              ariaLabel="Target language"
            />
            <button
              type="button"
              onClick={addPair}
              className="btn-secondary shrink-0 sm:w-auto w-full justify-center"
            >
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>
          {pairs.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {pairs.map((p) => (
                <li
                  key={p}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700"
                >
                  {p}
                  <button
                    type="button"
                    onClick={() => removePair(p)}
                    aria-label={`Remove ${p}`}
                    className="text-brand-500 hover:text-brand-800 transition"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Field>
      </FormSection>

      {/* ── Section: Services & expertise ───────────────────────────── */}
      <FormSection
        eyebrow="03"
        title="Services & expertise"
        description="Pick everything you do — applies to all freelancer types, not only translators."
      >
        <CheckboxGroup
          label="Services"
          required
          options={SERVICES}
          selected={services}
          onToggle={(v) => {
            toggle(v, services, setServices);
            if (errors.services)
              setErrors((er) => ({ ...er, services: "" }));
          }}
          error={errors.services}
        />

        <CheckboxGroup
          label="Specializations"
          options={SPECIALIZATIONS}
          selected={specializations}
          onToggle={(v) => toggle(v, specializations, setSpecializations)}
        />

        <div className="grid md:grid-cols-2 gap-5">
          <Field
            label="Years of experience"
            required
            error={errors.yearsExperience}
          >
            <select
              value={yearsExperience}
              onChange={(e) => setYearsExperience(e.target.value)}
              className="input"
            >
              <option value="" disabled>
                Select…
              </option>
              {EXPERIENCE.map((x) => (
                <option key={x} value={x}>
                  {x} years
                </option>
              ))}
            </select>
          </Field>
          <Field label="CAT tools" error={errors.catTools}>
            <input
              value={catTools}
              onChange={(e) => setCatTools(e.target.value)}
              className="input"
              placeholder="e.g. Trados, memoQ, Phrase"
            />
          </Field>
        </div>
      </FormSection>

      {/* ── Section: Rates & links ───────────────────────────────────── */}
      <FormSection
        eyebrow="04"
        title="Rates & links"
        description="What you charge and where we can see your work. Rates are optional — share what you're comfortable with."
      >
        <div className="grid md:grid-cols-3 gap-5">
          <Field label="Rate per word" error={errors.ratePerWord}>
            <input
              value={ratePerWord}
              onChange={(e) => setRatePerWord(e.target.value)}
              className="input"
              placeholder="e.g. 0.06"
            />
          </Field>
          <Field label="Rate per hour" error={errors.ratePerHour}>
            <input
              value={ratePerHour}
              onChange={(e) => setRatePerHour(e.target.value)}
              className="input"
              placeholder="e.g. 25"
            />
          </Field>
          <Field label="Currency" error={errors.currency}>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="input"
            >
              <option value="" disabled>
                Select…
              </option>
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <Field
            label="LinkedIn or website"
            required
            error={errors.linkedin}
          >
            <input
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="input"
              type="url"
              placeholder="https://linkedin.com/in/you"
            />
          </Field>
          <Field
            label="CV / portfolio link"
            required
            error={errors.cvLink}
            hint="Paste a shareable link (Google Drive, Dropbox, etc.)."
          >
            <input
              value={cvLink}
              onChange={(e) => setCvLink(e.target.value)}
              className="input"
              type="url"
              placeholder="https://drive.google.com/…"
            />
          </Field>
        </div>

        <Field label="Short note" error={errors.note}>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            className="input resize-y"
            placeholder="Anything else we should know — availability, specialisms, sample work…"
          />
        </Field>
      </FormSection>

      {/* ── Section: Consent ─────────────────────────────────────────── */}
      <FormSection eyebrow="05" title="Consent">
        <div data-error={errors.consent ? "true" : undefined}>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                if (e.target.checked)
                  setErrors((er) => ({ ...er, consent: "" }));
              }}
              className="mt-1 h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
            />
            <span className="text-sm text-ink-600 leading-relaxed">
              I agree to be contacted by GlobalAnnotate about freelance
              opportunities and to GlobalAnnotate storing the information
              I&apos;ve provided. <span className="text-red-600">*</span>
            </span>
          </label>
          {errors.consent && (
            <span className="block mt-1.5 text-xs text-red-600">
              {errors.consent}
            </span>
          )}
        </div>
      </FormSection>

      <div className="flex items-center justify-end pt-2">
        <button
          type="submit"
          disabled={sending}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {sending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Submit application <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function FormSection({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-5">
      <header className="border-b border-ink-100 pb-4">
        <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
          {eyebrow} · {title}
        </p>
        {description && (
          <p className="mt-2 text-sm text-ink-600 leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </header>
      {children}
    </section>
  );
}

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block" data-error={error ? "true" : undefined}>
      <span className="block text-sm font-medium text-ink-800 mb-1.5">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </span>
      {children}
      {hint && !error && (
        <span className="block mt-1.5 text-xs text-ink-500">{hint}</span>
      )}
      {error && (
        <span className="block mt-1.5 text-xs text-red-600">{error}</span>
      )}
    </label>
  );
}

function CheckboxGroup({
  label,
  required,
  options,
  selected,
  onToggle,
  error,
}: {
  label: string;
  required?: boolean;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  error?: string;
}) {
  return (
    <fieldset data-error={error ? "true" : undefined}>
      <legend className="block text-sm font-medium text-ink-800 mb-2.5">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </legend>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <label
              key={opt}
              className={
                "flex items-center gap-2.5 rounded-lg border px-3 py-2 text-sm cursor-pointer transition " +
                (active
                  ? "border-brand-400 bg-brand-50 text-brand-800"
                  : "border-ink-200 bg-white text-ink-700 hover:border-brand-300")
              }
            >
              <input
                type="checkbox"
                checked={active}
                onChange={() => onToggle(opt)}
                className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
              />
              {opt}
            </label>
          );
        })}
      </div>
      {error && (
        <span className="block mt-2 text-xs text-red-600">{error}</span>
      )}
    </fieldset>
  );
}
