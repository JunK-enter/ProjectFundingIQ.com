"use client";

import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import type { AddressProvider, AddressSuggestion } from "@/lib/calculator/integrations";
import { usStates } from "@/lib/calculator/options";
import { SelectField, TextField } from "../fields";
import type { StepProps } from "./shared";

function AddressSuggestions({
  query,
  suggest,
  onPick,
}: {
  query: string;
  suggest: NonNullable<AddressProvider["suggest"]>;
  onPick: (suggestion: AddressSuggestion) => void;
}) {
  const [results, setResults] = useState<AddressSuggestion[]>([]);

  useEffect(() => {
    if (query.trim().length < 4) return;
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      suggest(query, controller.signal)
        .then(setResults)
        .catch(() => setResults([]));
    }, 250);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query, suggest]);

  const visible = query.trim().length >= 4 ? results : [];
  if (!visible.length) return null;

  return (
    <ul className="mt-2 overflow-hidden rounded-[10px] border border-line bg-white" aria-label="Address suggestions">
      {visible.map((suggestion) => (
        <li key={suggestion.id}>
          <button
            type="button"
            onClick={() => {
              onPick(suggestion);
              setResults([]);
            }}
            className="flex min-h-11 w-full items-center gap-2 px-4 text-left text-sm text-ink hover:bg-tint"
          >
            <MapPin className="h-4 w-4 shrink-0 text-blue" aria-hidden />
            {suggestion.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

export function AddressStep({
  data,
  errors,
  dispatch,
  addressProvider,
}: StepProps & { addressProvider: AddressProvider }) {
  const { address } = data;
  const update = (patch: Partial<typeof address>) => dispatch({ type: "address", patch });

  return (
    <div className="grid gap-5 sm:grid-cols-6">
      <div className="sm:col-span-4">
        <TextField
          name="address.street"
          label="Street address"
          value={address.street}
          onChange={(street) => update({ street })}
          error={errors["address.street"]}
          autoComplete="address-line1"
          maxLength={120}
        />
        {addressProvider.suggest ? (
          <AddressSuggestions
            query={address.street}
            suggest={addressProvider.suggest}
            onPick={(suggestion) => update(suggestion.address)}
          />
        ) : null}
      </div>
      <TextField
        name="address.unit"
        label="Apt, unit"
        optional
        value={address.unit}
        onChange={(unit) => update({ unit })}
        autoComplete="address-line2"
        maxLength={30}
        className="sm:col-span-2"
      />
      <TextField
        name="address.city"
        label="City"
        value={address.city}
        onChange={(city) => update({ city })}
        error={errors["address.city"]}
        autoComplete="address-level2"
        maxLength={80}
        className="sm:col-span-6"
      />
      <SelectField
        name="address.state"
        label="State"
        value={address.state}
        onChange={(state) => update({ state })}
        options={usStates}
        placeholder="Choose a state"
        error={errors["address.state"]}
        autoComplete="address-level1"
        className="sm:col-span-3"
      />
      <TextField
        name="address.zip"
        label="ZIP code"
        value={address.zip}
        onChange={(zip) => update({ zip: zip.replace(/[^\d-]/g, "") })}
        error={errors["address.zip"]}
        autoComplete="postal-code"
        inputMode="numeric"
        maxLength={10}
        className="sm:col-span-3"
      />
    </div>
  );
}
