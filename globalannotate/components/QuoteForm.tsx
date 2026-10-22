"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useToast } from "./Toast";
import { services } from "@/lib/site";
import { submitForm } from "@/lib/form-submit";

type FormData = {
  fullName: string;
  email: string;
  company?: string;
  service: string;
  details: string;
  budget?: string;
  timeline?: string;
  consent: boolean;
};

// Service <option> values submitted to Formspree stay in English (stable
// backend values) regardless of locale; only the visible labels translate.
const SERVICE_VALUES = [...services.map((s) => s.slug), "full-package"] as const;

// Maps the stable slug value back to its readable English name, so the
// enquiry email always reads "Translation & Localization" — never a raw slug
// — no matter which locale the visitor submitted from.
const SERVICE_EN_LABEL: Record<string, string> = {
  ...Object.fromEntries(services.map((s) => [s.slug, s.title])),
  "full-package": "Full Package",
};

export default function QuoteForm() {
  const t = useTranslations("contact.form");
  const ts = useTranslations("services");
  const locale = useLocale();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const schema = z.object({
    fullName: z.string().min(2, t("errFullName")),
    email: z.string().email(t("errEmail")),
    company: z.string().optional(),
    service: z.string().min(1, t("errService")),
    details: z.string().min(20, t("errDetails")),
    budget: z.string().optional(),
    timeline: z.string().optional(),
    consent: z.boolean().refine((v) => v === true, { message: t("errConsent") }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { service: "", consent: false },
  });

  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_QUOTE_ENDPOINT;

  const onSubmit = async (data: FormData) => {
    if (!endpoint) {
      toast(t("errNoEndpoint"), "error");
      return;
    }
    try {
      // Submit the readable English service name (not the slug the <select>
      // carries) so the enquiry email stays consistent across all locales.
      const serviceName = SERVICE_EN_LABEL[data.service] ?? data.service;
      const res = await submitForm(
        "quote",
        endpoint,
        {
          _subject: `New quote request — ${serviceName}`,
          ...data,
          service: serviceName,
        },
        locale
      );
      if (!res.ok) throw new Error("Network response not ok");
      toast(t("toastSuccess"));
      setSubmitted(true);
      reset();
    } catch {
      toast(t("toastError"), "error");
    }
  };

  // Translated label for a service <option> by its stable English value.
  const optionLabel = (value: string) =>
    value === "full-package" ? t("fullPackage") : ts(`${value}.title`);

  if (submitted) {
    return (
      <div className="card p-8 md:p-10 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-xl font-semibold">{t("successHeading")}</h3>
        <p className="mt-2 text-ink-600 max-w-md mx-auto">{t("successBody")}</p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 btn-secondary"
        >
          {t("sendAnother")}
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
        <Field label={t("fullName")} error={errors.fullName?.message}>
          <input
            {...register("fullName")}
            className="input"
            placeholder={t("fullNamePlaceholder")}
            autoComplete="name"
          />
        </Field>
        <Field label={t("businessEmail")} error={errors.email?.message}>
          <input
            {...register("email")}
            className="input"
            placeholder={t("businessEmailPlaceholder")}
            type="email"
            autoComplete="email"
          />
        </Field>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Field label={t("company")} error={errors.company?.message}>
          <input
            {...register("company")}
            className="input"
            placeholder={t("companyPlaceholder")}
            autoComplete="organization"
          />
        </Field>
        <Field label={t("service")} error={errors.service?.message}>
          <select {...register("service")} className="input">
            <option value="" disabled>
              {t("selectService")}
            </option>
            {SERVICE_VALUES.map((value) => (
              <option key={value} value={value}>
                {optionLabel(value)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={t("projectDetails")} error={errors.details?.message}>
        <textarea
          {...register("details")}
          rows={5}
          className="input resize-y"
          placeholder={t("projectPlaceholder")}
        />
      </Field>

      <div className="grid md:grid-cols-2 gap-5">
        <Field label={t("budget")} error={errors.budget?.message}>
          <input
            {...register("budget")}
            className="input"
            placeholder={t("budgetPlaceholder")}
          />
        </Field>
        <Field label={t("timeline")} error={errors.timeline?.message}>
          <input
            {...register("timeline")}
            className="input"
            placeholder={t("timelinePlaceholder")}
          />
        </Field>
      </div>

      <div className="pt-2">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            {...register("consent")}
            className="mt-1 h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
          />
          <span className="text-sm text-ink-600 leading-relaxed">
            {t.rich("consentAgree", {
              link: (chunks) => (
                <Link
                  href="/privacy"
                  className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
                >
                  {chunks}
                </Link>
              ),
            })}
          </span>
        </label>
        {errors.consent && (
          <span className="block mt-1.5 text-xs text-red-600">
            {errors.consent.message}
          </span>
        )}
        <p className="mt-3 text-xs text-ink-500">{t("confidential")}</p>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> {t("sending")}
            </>
          ) : (
            <>
              {t("send")} <Send className="h-4 w-4" />
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
