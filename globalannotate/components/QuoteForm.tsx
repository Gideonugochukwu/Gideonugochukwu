"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { useToast } from "./Toast";
import { services } from "@/lib/site";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid business email"),
  company: z.string().optional(),
  service: z.string().min(1, "Select a service"),
  details: z.string().min(20, "Tell us a little more — at least 20 characters"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const SERVICE_OPTIONS = [
  ...services.map((s) => s.title),
  "Full Package",
];

export default function QuoteForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { service: "" },
  });

  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_QUOTE_ENDPOINT;

  const onSubmit = async (data: FormData) => {
    if (!endpoint) {
      toast(
        "Form endpoint not configured yet. Add NEXT_PUBLIC_FORMSPREE_QUOTE_ENDPOINT to .env.local.",
        "error"
      );
      return;
    }
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New quote request — ${data.service}`,
          ...data,
        }),
      });
      if (!res.ok) throw new Error("Network response not ok");
      toast("Thanks — your request was sent. We'll reply within 1 business day.");
      setSubmitted(true);
      reset();
    } catch {
      toast("Something went wrong. Please try again or email us directly.", "error");
    }
  };

  if (submitted) {
    return (
      <div className="card p-8 md:p-10 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-xl font-semibold">Request received</h3>
        <p className="mt-2 text-ink-600 max-w-md mx-auto">
          A member of our team will reach out within one business day with next
          steps and a tailored proposal.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 btn-secondary"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card p-6 md:p-8 space-y-5"
      noValidate
    >
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Full name" error={errors.fullName?.message}>
          <input
            {...register("fullName")}
            className="input"
            placeholder="Godsportion"
            autoComplete="name"
          />
        </Field>
        <Field label="Business email" error={errors.email?.message}>
          <input
            {...register("email")}
            className="input"
            placeholder="jane@company.com"
            type="email"
            autoComplete="email"
          />
        </Field>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Company (optional)" error={errors.company?.message}>
          <input
            {...register("company")}
            className="input"
            placeholder="Acme Inc."
            autoComplete="organization"
          />
        </Field>
        <Field label="Service" error={errors.service?.message}>
          <select {...register("service")} className="input">
            <option value="" disabled>
              Select a service…
            </option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Project details" error={errors.details?.message}>
        <textarea
          {...register("details")}
          rows={5}
          className="input resize-y"
          placeholder="Tell us about the project — goals, formats, languages, volume, audience…"
        />
      </Field>

      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Budget (optional)" error={errors.budget?.message}>
          <input
            {...register("budget")}
            className="input"
            placeholder="e.g. $2,000 – $5,000"
          />
        </Field>
        <Field label="Timeline (optional)" error={errors.timeline?.message}>
          <input
            {...register("timeline")}
            className="input"
            placeholder="e.g. start in 2 weeks, 30-day delivery"
          />
        </Field>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <p className="text-xs text-ink-500">
          By submitting, you agree to be contacted about your enquiry.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send request <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
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
    <label className="block">
      <span className="block text-sm font-medium text-ink-800 mb-1.5">
        {label}
      </span>
      {children}
      {error && <span className="block mt-1.5 text-xs text-red-600">{error}</span>}
    </label>
  );
}
