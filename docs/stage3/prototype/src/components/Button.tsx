import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'quiet';
  busy?: boolean;
  children: ReactNode;
};

export function Button({ variant = 'primary', busy = false, children, disabled, ...props }: Props) {
  return <button type="button" {...props} disabled={disabled || busy} aria-busy={busy || undefined} className={`button button-${variant}`}>{busy ? 'Memproses…' : children}</button>;
}
