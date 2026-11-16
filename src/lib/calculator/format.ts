import type { PropertyAddress } from "./types";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatUsd(amount: number) {
  return usd.format(amount);
}

export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function formatAddress(address: PropertyAddress) {
  const street = [address.street.trim(), address.unit.trim()].filter(Boolean).join(", ");
  return `${street}, ${address.city.trim()}, ${address.state} ${address.zip.trim()}`;
}
