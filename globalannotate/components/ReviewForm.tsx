"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, CheckCircle2, Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useToast } from "./Toast";
import { cn } from "@/lib/utils";
import { submitForm } from "@/lib/form-submit";

// Labels come from the `reviewForm` messages (keyed by mode).
const DISPLAY_MODE_OPTIONS = [
  { value: "named", labelKey: "modeNamed" },
  { value: "initial", labelKey: "modeInitial" },
  { value: "role", labelKey: "modeRole" },
  { value: "verified", labelKey: "modeVerified" },
] as const;

type FormData = {
  name: string;
  role?: string;
  company?: string;
  rating: number;
  comment: string;
  displayMode: "named" | "initial" | "role" | "verified";
};

export default function ReviewForm() {
  const t = useTranslations("reviewForm");
  const locale = useLocale();
  const schema = z.object({
    name: z.string().min(2, t("errName")),
    role: z.string().optional(),
    company: z.string().optional(),
    rating: z.number().min(1, t("errRating")).max(5),
    comment: z.string().min(15, t("errComment")),
    displayMode: z.enum(["named", "initial", "role", "verified"]),
  });
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [hover, setHover] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { rating: 0, displayMode: "named" },
  });

  const rating = watch("rating");
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_REVIEW_ENDPOINT;

  const onSubmit = async (data: FormData) => {
    if (!endpoint) {
      toast(t("errNoEndpoint"), "error");
      return;
    }
    try {
      const res = await submitForm(
        "review",
        endpoint,
        {
          _subject: `New review submission — ${data.rating}★`,
          ...data,
        },
        locale
      );
      if (!res.ok) throw new Error("Network response not ok");
      toast(t("toastSuccess"));
      setSubmitted(true);
      reset({ rating: 0 });
    } catch {
      toast(t("toastError"), "error");
    }
  };

  if (submitted) {
    return (
      <div className="card p-8 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-xl font-semibold">{t("thanksHeading")}</h3>
        <p className="mt-2 text-ink-600 max-w-md mx-auto">{t("thanksBody")}</p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 btn-secondary"
        >
          {t("submitAnother")}
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
        <label className="block">
          <span className="block text-sm font-medium text-ink-800 mb-1.5">{t("name")}</span>
          <input {...register("name")} className="input" placeholder={t("namePlaceholder")} />
          {errors.name && (
            <span className="block mt-1.5 text-xs text-red-600">{errors.name.message}</span>
          )}
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-ink-800 mb-1.5">{t("role")}</span>
          <input {...register("role")} className="input" placeholder={t("rolePlaceholder")} />
        </label>
      </div>

      <label className="block">
        <span className="block text-sm font-medium text-ink-800 mb-1.5">{t("company")}</span>
        <input {...register("company")} className="input" placeholder={t("companyPlaceholder")} />
      </label>

      <div>
        <span className="block text-sm font-medium text-ink-800 mb-2">
          {t("creditHeading")}
        </span>
        <div className="grid sm:grid-cols-2 gap-2">
          {DISPLAY_MODE_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2.5 rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-800 hover:border-brand-300 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50 cursor-pointer transition"
            >
              <input
                type="radio"
                value={opt.value}
                {...register("displayMode")}
                className="accent-brand-600"
              />
              <span>{t(opt.labelKey)}</span>
            </label>
          ))}
        </div>
        <p className="mt-2 text-xs text-ink-500">
          {t("creditHelp")}
        </p>
      </div>

      <div>
        <span className="block text-sm font-medium text-ink-800 mb-2">{t("rating")}</span>
        <div className="flex items-center gap-1" role="radiogroup" aria-label={t("rating")}>
          {[1, 2, 3, 4, 5].map((n) => {
            const active = (hover ?? rating) >= n;
            return (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={rating === n}
                onClick={() => setValue("rating", n, { shouldValidate: true })}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(null)}
                className="p-1 -m-1 rounded-md"
                aria-label={t(n > 1 ? "starsLabel" : "starLabel", { n: String(n) })}
              >
                <Star
                  className={cn(
                    "h-7 w-7 transition-all",
                    active
                      ? "fill-brand-500 text-brand-500"
                      : "fill-transparent text-ink-300"
                  )}
                />
              </button>
            );
          })}
        </div>
        {errors.rating && (
          <span className="block mt-1.5 text-xs text-red-600">{errors.rating.message}</span>
        )}
      </div>

      <label className="block">
        <span className="block text-sm font-medium text-ink-800 mb-1.5">{t("review")}</span>
        <textarea
          {...register("comment")}
          rows={5}
          className="input resize-y"
          placeholder={t("reviewPlaceholder")}
        />
        {errors.comment && (
          <span className="block mt-1.5 text-xs text-red-600">{errors.comment.message}</span>
        )}
      </label>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <p className="text-xs text-ink-500">
          {t("moderated")}
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> {t("submitting")}
            </>
          ) : (
            <>
              {t("submit")} <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
