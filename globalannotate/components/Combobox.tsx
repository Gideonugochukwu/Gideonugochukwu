"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";

// Lightweight, dependency-free searchable single-select. Used for the
// country, native-language, and language-pair selectors on the freelancer
// form. Behaviour:
//   - Click the field (or type) to open a filterable list of options.
//   - Type to filter (case-insensitive, matches anywhere in the option).
//   - Arrow Up/Down + Enter to navigate and select; Esc to close.
//   - Click outside closes the list without changing the value.
//   - Mobile-friendly: input is full-width and the list scrolls.
//
// Designed to look and behave like the existing `.input` style so it sits
// naturally next to the rest of the form fields.

export default function Combobox({
  value,
  onChange,
  options,
  placeholder = "Select…",
  invalid = false,
  ariaLabel,
}: {
  value: string;
  onChange: (next: string) => void;
  options: string[];
  placeholder?: string;
  invalid?: boolean;
  ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listboxId = useId();

  // When the popup is closed, the input displays the selected value (or is
  // empty). When open, the input becomes the search box.
  const displayValue = open ? query : value;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.toLowerCase().includes(q));
  }, [options, query]);

  useEffect(() => {
    if (!open) return;
    function onDocClick(ev: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(ev.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // Keep the active option visible inside the scroll viewport.
  useEffect(() => {
    if (!open) return;
    const el = document.getElementById(`${listboxId}-opt-${activeIndex}`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open, listboxId]);

  function openList() {
    setOpen(true);
    setQuery("");
    setActiveIndex(Math.max(0, options.indexOf(value)));
    // Defer focus until after the input becomes interactive.
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function selectAt(i: number) {
    const v = filtered[i];
    if (!v) return;
    onChange(v);
    setOpen(false);
    setQuery("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      e.preventDefault();
      openList();
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      selectAt(activeIndex);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      setQuery("");
    }
  }

  return (
    <div ref={wrapRef} className="relative">
      <div
        className={
          "flex items-center gap-2 rounded-[0.625rem] border bg-white pr-2 transition focus-within:border-brand-500 focus-within:shadow-[0_0_0_3px_rgba(16,185,129,0.15)] " +
          (invalid ? "border-red-400" : "border-ink-200")
        }
      >
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-label={ariaLabel}
          value={displayValue}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!open) setOpen(true);
            setActiveIndex(0);
          }}
          onFocus={() => {
            if (!open) openList();
          }}
          onClick={() => {
            if (!open) openList();
          }}
          onKeyDown={onKeyDown}
          placeholder={value ? value : placeholder}
          className="w-full bg-transparent px-3.5 py-2.5 text-[0.9375rem] text-ink-900 outline-none placeholder:text-ink-400"
        />
        {value && !open && (
          <button
            type="button"
            aria-label="Clear selection"
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
            }}
            className="p-1 text-ink-400 hover:text-ink-700 transition"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        <ChevronDown
          aria-hidden
          className={
            "h-4 w-4 text-ink-400 transition-transform " +
            (open ? "rotate-180" : "")
          }
        />
      </div>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-50 mt-1.5 max-h-64 w-full overflow-auto rounded-xl border border-ink-200 bg-white shadow-lg ring-1 ring-black/5"
        >
          {filtered.length === 0 && (
            <li className="px-3.5 py-2.5 text-sm text-ink-500">
              No matches for &ldquo;{query}&rdquo;
            </li>
          )}
          {filtered.map((opt, i) => {
            const selected = opt === value;
            const active = i === activeIndex;
            return (
              <li
                id={`${listboxId}-opt-${i}`}
                key={opt}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseDown={(e) => {
                  // Use mousedown so we beat the input's blur handler.
                  e.preventDefault();
                  selectAt(i);
                }}
                className={
                  "flex cursor-pointer items-center justify-between px-3.5 py-2 text-sm transition " +
                  (active ? "bg-brand-50 text-brand-900" : "text-ink-800")
                }
              >
                <span>{opt}</span>
                {selected && (
                  <Check className="h-4 w-4 text-brand-600" aria-hidden />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
