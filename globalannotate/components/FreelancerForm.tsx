"use client";

import { useState } from "react";
import { Loader2, Send, CheckCircle2, Plus, X } from "lucide-react";
import { useToast } from "./Toast";

// Self-contained freelancer application form. Posts the application as JSON
// to a Google Apps Script web app (NEXT_PUBLIC_FREELANCER_FORM_ENDPOINT),
// which appends a row to the recruiter's roster Google Sheet. No paid form
// service is used.
//
// The request is sent with a text/plain content type on purpose: that keeps
// it a CORS "simple request", so the browser does not fire a preflight
// OPTIONS call that Apps Script can't answer. The body is still JSON and the
// script parses e.postData.contents.

const SERVICES = [
  "Translation",
  "MTPE",
  "Localization",
  "Transcription",
  "AI Data Annotation",
  "Game Localization",
  "Voiceover",
  "Subtitling",
];

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

export default function FreelancerForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  // Plain text fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [catTools, setCatTools] = useState("");
  const [ratePerWord, setRatePerWord] = useState("");
  const [ratePerHour, setRatePerHour] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [cvLink, setCvLink] = useState("");
  const [note, setNote] = useState("");

  // Selects
  const [yearsExperience, setYearsExperience] = useState("");
  const [currency, setCurrency] = useState("");

  // Multi-selects
  const [services, setServices] = useState<string[]>([]);
  const [specializations, setSpecializations] = useState<string[]>([]);

  // Language pairs builder
  const [pairs, setPairs] = useState<string[]>([]);
  const [pairDraft, setPairDraft] = useState("");

  const endpoint = process.env.NEXT_PUBLIC_FREELANCER_FORM_ENDPOINT;

  function toggle(
    value: string,
    list: string[],
    setList: (v: string[]) => void
  ) {
    setList(
      list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value]
    );
  }

  function addPair() {
    const draft = pairDraft.trim();
    if (!draft) return;
    if (!pairs.includes(draft)) setPairs([...pairs, draft]);
    setPairDraft("");
    setErrors((e) => ({ ...e, languagePairs: "" }));
  }

  function removePair(p: string) {
    setPairs(pairs.filter((x) => x !== p));
  }

  function validate(): Errors {
    const e: Errors = {};
    if (fullName.trim().length < 2) e.fullName = "Please enter your full name";
    if (!EMAIL_RE.test(email)) e.email = "Enter a valid email address";
    if (nativeLanguage.trim().length < 2)
      e.nativeLanguage = "Please enter your native language";
    if (pairs.length === 0)
      e.languagePairs = "Add at least one language pair";
    if (!yearsExperience) e.yearsExperience = "Select your experience";
    if (!consent) e.consent = "Please agree before submitting";
    return e;
  }

  const [consent, setConsent] = useState(false);

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Focus the first error for keyboard / screen-reader users.
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
      fullName: fullName.trim(),
      email: email.trim(),
      country: country.trim(),
      timeZone: timeZone.trim(),
      nativeLanguage: nativeLanguage.trim(),
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
        // text/plain keeps this a CORS "simple request" (no preflight),
        // which Apps Script web apps handle cleanly.
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
    <form onSubmit={onSubmit} className="card p-6 md:p-8 space-y-6" noValidate>
      {/* Identity */}
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
        <Field label="Country" error={errors.country}>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="input"
            placeholder="Nigeria"
            autoComplete="country-name"
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

      <Field label="Native language" required error={errors.nativeLanguage}>
        <input
          value={nativeLanguage}
          onChange={(e) => setNativeLanguage(e.target.value)}
          className="input"
          placeholder="e.g. Yoruba"
        />
      </Field>

      {/* Language pairs builder */}
      <Field
        label="Language pairs"
        required
        error={errors.languagePairs}
        hint="Add each pair you work in. Format: source > target."
      >
        <div className="flex gap-2">
          <input
            value={pairDraft}
            onChange={(e) => setPairDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addPair();
              }
            }}
            className="input"
            placeholder="English > French"
            aria-label="Add a language pair"
          />
          <button
            type="button"
            onClick={addPair}
            className="btn-secondary shrink-0"
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

      {/* Services */}
      <CheckboxGroup
        label="Services"
        options={SERVICES}
        selected={services}
        onToggle={(v) => toggle(v, services, setServices)}
      />

      {/* Specializations */}
      <CheckboxGroup
        label="Specializations"
        options={SPECIALIZATIONS}
        selected={specializations}
        onToggle={(v) => toggle(v, specializations, setSpecializations)}
      />

      {/* Experience + rates */}
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

      {/* Links */}
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="LinkedIn or website" error={errors.linkedin}>
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

      {/* Consent */}
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
      {error && <span className="block mt-1.5 text-xs text-red-600">{error}</span>}
    </label>
  );
}

function CheckboxGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="block text-sm font-medium text-ink-800 mb-2.5">
        {label}
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
    </fieldset>
  );
}
