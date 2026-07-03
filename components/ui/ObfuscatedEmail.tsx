"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { siteConfig } from "@/lib/data/site";

const noopSubscribe = () => () => {};

/** `true` uniquement après hydratation côté client. */
function useIsHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

/**
 * Assemble l'adresse email uniquement après hydratation, pour qu'elle ne soit
 * jamais présente dans le HTML rendu côté serveur. Server et premier rendu
 * client renvoient `null` → pas de mismatch d'hydratation.
 */
function useAssembledEmail(): string | null {
  return useIsHydrated() ? `${siteConfig.emailUser}@${siteConfig.emailDomain}` : null;
}

/** Texte de l'adresse, révélé après hydratation (placeholder avant). */
export function EmailAddressText({ placeholder = "…" }: { placeholder?: string }) {
  const email = useAssembledEmail();
  return <>{email ?? placeholder}</>;
}

/**
 * Lien mailto obfusqué. Avant hydratation / sans JS, pointe vers `noJsHref`
 * (le formulaire de contact par défaut) — aucun mailto ni adresse dans le HTML
 * source. Après hydratation, devient un vrai `mailto:` cliquable.
 *
 * `children` par défaut = l'adresse affichée en texte. Passez un libellé
 * (ex. "Email") ou un markup riche pour un autre rendu.
 */
export default function ObfuscatedEmail({
  className,
  ariaLabel,
  subject,
  body,
  children,
  onClick,
  noJsHref = "#contact",
}: {
  className?: string;
  ariaLabel?: string;
  subject?: string;
  body?: string;
  children?: ReactNode;
  onClick?: () => void;
  noJsHref?: string;
}) {
  const email = useAssembledEmail();

  let href = noJsHref;
  if (email) {
    const query = [
      subject && `subject=${encodeURIComponent(subject)}`,
      body && `body=${encodeURIComponent(body)}`,
    ]
      .filter(Boolean)
      .join("&");
    href = `mailto:${email}${query ? `?${query}` : ""}`;
  }

  return (
    <a href={href} aria-label={ariaLabel} className={className} onClick={onClick}>
      {children ?? <EmailAddressText />}
    </a>
  );
}
