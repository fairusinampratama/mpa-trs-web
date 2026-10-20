import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "quiet";
const tones: Record<ButtonVariant, string> = {
  primary:
    "border-primary bg-primary text-surface enabled:hover:border-primary-hover enabled:hover:bg-primary-hover enabled:active:border-primary-active enabled:active:bg-primary-active",
  secondary:
    "border-control-border bg-page text-primary enabled:hover:border-forest enabled:hover:bg-surface-muted enabled:active:border-primary",
  quiet:
    "border-transparent bg-transparent text-primary enabled:hover:bg-surface-muted",
};
// Shared by buttons and navigation links. Complete utility strings stay visible
// to Tailwind's scanner; no runtime-generated class names or custom CSS.
export function buttonClasses(
  variant: ButtonVariant = "primary",
  link = false,
) {
  const tone = link
    ? {
        primary:
          "border-primary bg-primary text-surface hover:border-primary-hover hover:bg-primary-hover active:border-primary-active active:bg-primary-active",
        secondary:
          "border-control-border bg-page text-primary hover:border-forest hover:bg-surface-muted active:border-primary",
        quiet:
          "border-transparent bg-transparent text-primary hover:bg-surface-muted",
      }[variant]
    : tones[variant];
  return `inline-flex min-h-11.5 items-center justify-start gap-2 rounded-control border px-4 py-2.5 text-[17px]/6 font-semibold transition-colors duration-[140ms] disabled:cursor-not-allowed disabled:border-disabled-bg disabled:bg-disabled-bg disabled:text-disabled-ink disabled:opacity-100 ${tone}`;
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  busy?: boolean;
  children: ReactNode;
};
export function Button({
  variant = "primary",
  busy = false,
  children,
  disabled,
  className = "",
  ...props
}: Props) {
  return (
    <button
      type="button"
      {...props}
      disabled={disabled || busy}
      aria-busy={busy || undefined}
      className={`${buttonClasses(variant)} ${className}`}
      data-ui="button"
    >
      {busy ? "Memproses…" : children}
    </button>
  );
}
