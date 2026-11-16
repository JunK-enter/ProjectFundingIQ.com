"use client";

import { AlertCircle, Check } from "lucide-react";
import type { ReactNode } from "react";

export function fieldId(key: string) {
  return `calc-${key.replace(/[^a-zA-Z0-9]+/g, "-")}`;
}

const controlBase =
  "min-h-12 w-full rounded-[10px] border bg-white px-4 text-base text-ink transition-colors placeholder:text-muted/60 hover:border-blue/40 focus:border-blue";

const controlTone = (error?: string) =>
  error ? "border-clay bg-clay-soft/30" : "border-line";

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm text-clay">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      {message}
    </p>
  );
}

function describedBy(id: string, hint?: ReactNode, error?: string) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(" ") || undefined;
}

function LabelText({ label, optional }: { label: string; optional?: boolean }) {
  return (
    <span className="text-[15px] font-medium text-ink">
      {label}
      {optional ? <span className="ml-1.5 font-normal text-muted">(optional)</span> : null}
    </span>
  );
}

type BaseFieldProps = {
  name: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  optional?: boolean;
  className?: string;
};

export function TextField({
  name,
  label,
  value,
  onChange,
  error,
  hint,
  optional,
  className = "",
  autoComplete,
  inputMode,
  maxLength,
  placeholder,
}: BaseFieldProps & {
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  inputMode?: "text" | "numeric";
  maxLength?: number;
  placeholder?: string;
}) {
  const id = fieldId(name);
  return (
    <div className={className}>
      <label htmlFor={id} className="block">
        <LabelText label={label} optional={optional} />
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      <input
        id={id}
        name={name}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`mt-2 ${controlBase} ${controlTone(error)}`}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function SelectField({
  name,
  label,
  value,
  onChange,
  options,
  placeholder = "Select…",
  error,
  hint,
  optional,
  className = "",
  autoComplete,
}: BaseFieldProps & {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  autoComplete?: string;
}) {
  const id = fieldId(name);
  return (
    <div className={className}>
      <label htmlFor={id} className="block">
        <LabelText label={label} optional={optional} />
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      <select
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`mt-2 appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2020%2020'%20fill='%235b6473'%3E%3Cpath%20d='M5.3%207.3a1%201%200%20011.4%200L10%2010.6l3.3-3.3a1%201%200%20111.4%201.4l-4%204a1%201%200%2001-1.4%200l-4-4a1%201%200%20010-1.4z'/%3E%3C/svg%3E")] bg-[length:1.1rem] bg-[right_0.85rem_center] bg-no-repeat pr-10 ${controlBase} ${controlTone(error)} ${value ? "" : "text-muted"}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

const groupDigits = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export function parseAmount(raw: string): number | null {
  const digits = raw.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
  return digits ? Number(digits.slice(0, 12)) : null;
}

export function CurrencyField({
  name,
  label,
  value,
  onChange,
  error,
  hint,
  optional,
  className = "",
  size = "md",
}: BaseFieldProps & {
  value: number | null;
  onChange: (value: number | null) => void;
  size?: "md" | "lg";
}) {
  const id = fieldId(name);
  const large = size === "lg";
  return (
    <div className={className}>
      <label htmlFor={id} className="block">
        <LabelText label={label} optional={optional} />
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      <div className="relative mt-2">
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted ${
            large ? "font-serif text-2xl" : "text-base"
          }`}
        >
          $
        </span>
        <input
          id={id}
          name={name}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={value == null ? "" : groupDigits.format(value)}
          onChange={(event) => onChange(parseAmount(event.target.value))}
          placeholder="0"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={`${controlBase} ${controlTone(error)} tabular-nums ${
            large ? "min-h-16 pl-10 font-serif text-3xl" : "pl-8"
          }`}
        />
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function ChoiceGroup<T extends string>({
  name,
  legend,
  value,
  onChange,
  options,
  error,
  hint,
  columns = 2,
  className = "",
}: {
  name: string;
  legend: string;
  value: T | "";
  onChange: (value: T) => void;
  options: { value: T; label: string; hint?: string }[];
  error?: string;
  hint?: ReactNode;
  columns?: 2 | 3;
  className?: string;
}) {
  const id = fieldId(name);
  return (
    <fieldset className={className} aria-describedby={describedBy(id, hint, error)}>
      <legend className="text-[15px] font-medium text-ink">{legend}</legend>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      <div
        className={`mt-3 grid gap-3 ${columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
      >
        {options.map((option, index) => {
          const checked = value === option.value;
          return (
            <label key={option.value} className="relative block cursor-pointer">
              <input
                id={index === 0 ? id : undefined}
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="peer sr-only"
              />
              <span
                className={`flex h-full min-h-14 items-start gap-3 rounded-[12px] border p-4 transition-[border-color,background-color,box-shadow] duration-200 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue ${
                  checked
                    ? "border-blue bg-tint shadow-[0_0_0_1px_var(--blue)]"
                    : error
                      ? "border-clay/60 bg-white hover:border-blue/40"
                      : "border-line bg-white hover:border-blue/40"
                }`}
              >
                <span
                  aria-hidden
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    checked ? "border-blue bg-blue text-white" : "border-line bg-white"
                  }`}
                >
                  {checked ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                </span>
                <span>
                  <span className="block text-[15px] font-medium leading-snug text-ink">
                    {option.label}
                  </span>
                  {option.hint ? (
                    <span className="mt-1 block text-sm leading-snug text-muted">
                      {option.hint}
                    </span>
                  ) : null}
                </span>
              </span>
            </label>
          );
        })}
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </fieldset>
  );
}

export function CheckboxField({
  name,
  checked,
  onChange,
  children,
  error,
}: {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  error?: string;
}) {
  const id = fieldId(name);
  return (
    <div>
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-start gap-3 rounded-[12px] border p-4 transition-colors ${
          checked ? "border-blue bg-tint" : error ? "border-clay/60" : "border-line hover:border-blue/40"
        }`}
      >
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--blue)]"
        />
        <span className="text-[15px] leading-relaxed text-ink">{children}</span>
      </label>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
