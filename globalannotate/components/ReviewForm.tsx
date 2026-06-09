"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, CheckCircle2, Star } from "lucide-react";
import { useToast } from "./Toast";
import { cn } from "@/lib/utils";

const DISPLAY_MODE_OPTIONS = [
  { value: "named", label: "Full name + company" },
  { value: "initial", label: "First name + last initial + role" },
  { value: "role", label: "Role only — no name" },
  { value: "verified", label: "Anonymous (Verified client)" },
] as const;

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  role: z.string().optional(),
  company: z.string().optional(),
  rating: z.number().min(1, "Please choose a rating").max(5),
  comment: z.string().min(15, "Please share at least a sentence about your experience"),
  displayMode: z.enum(["named", "initial", "role", "verified"]),
});

type FormData = z.infer<typeof schema>;

export default function ReviewForm() {
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
      toast(
        "Form endpoint not configured yet. Add NEXT_PUBLIC_FORMSPREE_REVIEW_ENDPOINT to .env.local.",
        "error"
      );
      return;
    }
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New review submission — ${data.rating}★`,
          ...data,
        }),
      });
      if (!res.ok) throw new Error("Network response not ok");
      toast("Thank you — your review has been received for moderation.");
      setSubmitted(true);
      reset({ rating: 0 });
    } catch {
      toast("Something went wrong. Please try again.", "error");
    }
  };

  if (submitted) {
    return (
      <div className="card p-8 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-xl font-semibold">Thank you!</h3>
        <p className="mt-2 text-ink-600 max-w-md mx-auto">
          Your review will appear on this page after our team approves it.
          We&apos;re grateful for the feedback.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 btn-secondary"
        >
          Submit another review
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
          <span className="block text-sm font-medium text-ink-800 mb-1.5">Your name</span>
          <input {...register("name")} className="input" placeholder="Jane Doe" />
          {errors.name && (
            <span className="block mt-1.5 text-xs text-red-600">{errors.name.message}</span>
          )}
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-ink-800 mb-1.5">Role (optional)</span>
          <input {...register("role")} className="input" placeholder="Head of Localization" />
        </label>
      </div>

      <label className="block">
        <span className="block text-sm font-medium text-ink-800 mb-1.5">Company (optional)</span>
        <input {...register("company")} className="input" placeholder="Acme Inc." />
      </label>

      <div>
        <span className="block text-sm font-medium text-ink-800 mb-2">
          How should we credit you?
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
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
        <p className="mt-2 text-xs text-ink-500">
          You stay in control. Pick the option that feels right — we&apos;ll display the review
          that way once it&apos;s moderated.
        </p>
      </div>

      <div>
        <span className="block text-sm font-medium text-ink-800 mb-2">Rating</span>
        <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
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
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
              >
                <Star
                  className={cn(
                    "h-7 w-7 transition-all",
                    active
                      ? "fill-amber-400 text-amber-400"
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
        <span className="block text-sm font-medium text-ink-800 mb-1.5">Your review</span>
        <textarea
          {...register("comment")}
          rows={5}
          className="input resize-y"
          placeholder="Share what working with GlobalAnnotate was like…"
        />
        {errors.comment && (
          <span className="block mt-1.5 text-xs text-red-600">{errors.comment.message}</span>
        )}
      </label>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <p className="text-xs text-ink-500">
          Reviews are moderated before being published.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
            </>
          ) : (
            <>
              Submit review <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
