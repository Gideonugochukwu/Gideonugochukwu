"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useToast } from "./Toast";
import { services } from "@/lib/site";

type FormData = {
  fullName: string;
  email: string;
  company?: string;
  service: string;
  details: string;
  budget?: string;
  timeline?: string;
};

// Service <option> values submitted to Formspree stay in English (stable
// backend values) regardless of locale; only the visible labels translate.
const SERVICE_VALUES = [...services.map((s) => s.slug), "full-package"] as const;

export default function QuoteForm() {
  const t = useTranslations("contact.form");
  const ts = useTranslations("services");
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
  });

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
      toast(t("errNoEndpoint"), "error");
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

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <p className="text-xs text-ink-500">{t("consent")}</p>
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
