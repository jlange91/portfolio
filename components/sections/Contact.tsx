"use client";

import { useState, useRef, useEffect } from "react";
import { track } from "@vercel/analytics";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import { siteConfig } from "@/lib/data/site";
import { CONTACT_LIMITS } from "@/lib/data/contact";

type FormState = "idle" | "loading" | "success" | "error" | "fallback";

type FormData = {
  name: string;
  email: string;
  message: string;
};

function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
  maxLength,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium dark:text-slate-300 text-slate-700 mb-1.5"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-accent">
            *
          </span>
        )}
      </label>
      {type === "textarea" ? (
        <>
          <textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            placeholder={placeholder}
            rows={5}
            maxLength={maxLength}
            className="
              w-full px-4 py-3 rounded-lg text-sm
              dark:bg-slate-800 bg-white
              dark:text-slate-200 text-slate-900
              dark:border-slate-700 border-slate-300
              border
              dark:placeholder-slate-500 placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent
              transition-colors resize-none
            "
          />
          {maxLength !== undefined && (
            <p
              className={`text-xs text-right mt-1 tabular-nums transition-colors ${
                value.length >= maxLength
                  ? "text-red-400"
                  : value.length >= maxLength * 0.9
                  ? "text-amber-400"
                  : "dark:text-slate-500 text-slate-400"
              }`}
            >
              {value.length} / {maxLength}
            </p>
          )}
        </>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          maxLength={maxLength}
          className="
            w-full px-4 py-3 rounded-lg text-sm
            dark:bg-slate-800 bg-white
            dark:text-slate-200 text-slate-900
            dark:border-slate-700 border-slate-300
            border
            dark:placeholder-slate-500 placeholder-slate-400
            focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent
            transition-colors
          "
        />
      )}
    </div>
  );
}

export default function Contact() {
  const t = useTranslations("contact");
  const shouldReduce = useReducedMotion();
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const successRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (state === "success") successRef.current?.focus();
  }, [state]);

  useEffect(() => {
    if (!liveRef.current) return;
    if (state === "loading") liveRef.current.textContent = t("form.submitting");
    else liveRef.current.textContent = "";
  }, [state, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = (await res.json()) as { ok?: boolean; fallback?: boolean; error?: string };

      if (data.fallback) {
        setState("fallback");
      } else if (data.ok) {
        track("contact_form_submit");
        setState("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errKey = data.error as keyof typeof errorKeys;
        const errorKeys = {
          rate_limited: t("errors.rate_limited"),
          invalid_body: t("errors.invalid_body"),
          validation: t("errors.validation"),
          send_failed: t("errors.send_failed"),
        } as const;
        setErrorMsg(errorKeys[errKey] ?? t("errors.unknown"));
        setState("error");
      }
    } catch {
      setErrorMsg(t("errors.network"));
      setState("error");
    }
  };

  const mailtoFallback = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    `Message de ${formData.name || "…"}`
  )}&body=${encodeURIComponent(formData.message || "")}`;

  return (
    <Section id="contact" number="05" title={t("sectionTitle")} alternate>
      <p ref={liveRef} aria-live="polite" aria-atomic="true" className="sr-only" />
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: shouldReduce ? 0 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-base dark:text-slate-300 text-slate-700 leading-relaxed mb-8">
            {t("intro")}
          </p>

          <ul role="list" className="space-y-4">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 group"
                aria-label={t("ariaEmail")}
              >
                <div className="w-10 h-10 rounded-lg dark:bg-slate-800 bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-brand/10 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dark:text-slate-400 text-slate-500 group-hover:text-accent transition-colors" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs dark:text-slate-500 text-slate-400 font-mono mb-0.5">Email</p>
                  <p className="text-sm font-medium dark:text-slate-300 text-slate-700 group-hover:text-accent transition-colors">
                    {siteConfig.email}
                  </p>
                </div>
              </a>
            </li>

            <li>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("linkedin_click")}
                className="flex items-center gap-3 group"
                aria-label={t("ariaLinkedin")}
              >
                <div className="w-10 h-10 rounded-lg dark:bg-slate-800 bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-brand/10 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="dark:text-slate-400 text-slate-500 group-hover:text-accent transition-colors" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs dark:text-slate-500 text-slate-400 font-mono mb-0.5">LinkedIn</p>
                  <p className="text-sm font-medium dark:text-slate-300 text-slate-700 group-hover:text-accent transition-colors">
                    /in/julien-lange-870a52112
                  </p>
                </div>
              </a>
            </li>

            <li>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("github_click")}
                className="flex items-center gap-3 group"
                aria-label={t("ariaGithub")}
              >
                <div className="w-10 h-10 rounded-lg dark:bg-slate-800 bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-brand/10 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="dark:text-slate-400 text-slate-500 group-hover:text-accent transition-colors" aria-hidden="true">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs dark:text-slate-500 text-slate-400 font-mono mb-0.5">GitHub</p>
                  <p className="text-sm font-medium dark:text-slate-300 text-slate-700 group-hover:text-accent transition-colors">
                    /jlange91
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: shouldReduce ? 0 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          {state === "success" ? (
            <div
              ref={successRef}
              tabIndex={-1}
              role="status"
              aria-live="polite"
              className="rounded-xl p-8 dark:bg-slate-800/50 bg-white border dark:border-slate-700 border-slate-200 text-center focus:outline-none"
            >
              <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold dark:text-slate-100 text-slate-900 mb-2">
                {t("success.title")}
              </h3>
              <p className="text-sm dark:text-slate-400 text-slate-600">{t("success.body")}</p>
              <button onClick={() => setState("idle")} className="mt-5 text-sm text-accent hover:underline">
                {t("success.again")}
              </button>
            </div>
          ) : state === "fallback" ? (
            <div
              role="status"
              aria-live="polite"
              className="rounded-xl p-8 dark:bg-slate-800/50 bg-white border dark:border-slate-700 border-slate-200 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold dark:text-slate-100 text-slate-900 mb-2">
                {t("fallback.title")}
              </h3>
              <p className="text-sm dark:text-slate-400 text-slate-600 mb-5">{t("fallback.body")}</p>
              <a href={mailtoFallback} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-brand hover:bg-brand/90 text-white transition-colors">
                {t("fallback.cta")}
              </a>
              <button onClick={() => setState("idle")} className="mt-4 block mx-auto text-sm dark:text-slate-500 text-slate-400 hover:text-accent transition-colors">
                {t("fallback.back")}
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label={t("form.ariaLabel")}
              className="rounded-xl p-6 md:p-8 dark:bg-slate-800/40 bg-white border dark:border-slate-700/60 border-slate-200 space-y-5"
            >
              <InputField
                id="contact-name"
                label={t("form.name.label")}
                value={formData.name}
                onChange={(v) => setFormData((p) => ({ ...p, name: v }))}
                required
                placeholder={t("form.name.placeholder")}
                maxLength={CONTACT_LIMITS.name.max}
              />
              <InputField
                id="contact-email"
                label={t("form.email.label")}
                type="email"
                value={formData.email}
                onChange={(v) => setFormData((p) => ({ ...p, email: v }))}
                required
                placeholder={t("form.email.placeholder")}
              />
              <InputField
                id="contact-message"
                label={t("form.message.label")}
                type="textarea"
                value={formData.message}
                onChange={(v) => setFormData((p) => ({ ...p, message: v }))}
                required
                placeholder={t("form.message.placeholder")}
                maxLength={CONTACT_LIMITS.message.max}
              />

              {state === "error" && (
                <p role="alert" className="text-sm text-red-400">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={state === "loading"}
                aria-busy={state === "loading"}
                className="w-full py-3 px-6 rounded-lg text-sm font-semibold bg-brand hover:bg-brand/90 text-white transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {state === "loading" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                    {t("form.submitting")}
                  </>
                ) : (
                  t("form.submit")
                )}
              </button>

              <p className="text-xs dark:text-slate-500 text-slate-400 text-center">
                {t("emailFallback")}{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-accent hover:underline">
                  {t("emailFallbackLink")}
                </a>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </Section>
  );
}
