"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site, supportTopics } from "@/lib/site";
import { cn } from "cn";

type Fields = {
  name: string;
  email: string;
  organization: string;
  topic: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = {
  name: "",
  email: "",
  organization: "",
  topic: "",
  message: "",
};

const selectClass =
  "h-9 w-full min-w-0 rounded-lg border border-input bg-card px-2.5 py-1 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20";

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [copied, setCopied] = useState(false);

  const topic =
    supportTopics.find((item) => item.value === fields.topic)?.label ??
    fields.topic;

  const message = useMemo(
    () =>
      [
        `Name: ${fields.name.trim()}`,
        `Email: ${fields.email.trim()}`,
        `Organization: ${fields.organization.trim() || "—"}`,
        `Topic: ${topic || "—"}`,
        "",
        fields.message.trim(),
      ].join("\n"),
    [topic, fields],
  );

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    `Nitrofire Computing — ${topic || "support"}`,
  )}&body=${encodeURIComponent(message)}`;

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    const next: Errors = {};
    if (fields.name.trim().length < 2) {
      next.name = "Name needs at least two characters.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
      next.email = "Enter a valid email so we can reply.";
    }
    if (!fields.topic) {
      next.topic = "Choose a topic.";
    }
    if (fields.message.trim().length < 24) {
      next.message = "Add a few sentences so we know how to help.";
    }
    setErrors(next);
    if (Object.keys(next).length === 0) setStatus("success");
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(`To: ${site.email}\n\n${message}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  if (status === "success") {
    return (
      <div className="space-y-5 rounded-xl border border-primary/30 bg-card p-6 ring-1 ring-foreground/10">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Check className="size-5" />
        </div>
        <div className="space-y-2">
          <h2 className="font-heading text-xl font-semibold">Message ready</h2>
          <p className="text-sm leading-6 text-muted-foreground">
            Copy the message or open your mail client. It is addressed to{" "}
            <span className="text-foreground">{site.email}</span>.
          </p>
        </div>
        <pre className="overflow-x-auto rounded-lg bg-muted/60 p-4 font-mono text-xs leading-6 whitespace-pre-wrap text-muted-foreground">
          {message}
        </pre>
        <div className="flex flex-col gap-2 sm:flex-row">
          <a href={mailto} className={cn(buttonVariants())}>
            <Mail />
            Open email
          </a>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "outline" }))}
            onClick={copyMessage}
          >
            {copied ? <Check /> : <Copy />}
            {copied ? "Copied" : "Copy message"}
          </button>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "ghost" }))}
            onClick={() => {
              setStatus("idle");
              setFields(empty);
              setErrors({});
            }}
          >
            Write another
          </button>
        </div>
      </div>
    );
  }

  const emptyMessage =
    !fields.name &&
    !fields.email &&
    !fields.organization &&
    !fields.topic &&
    !fields.message;
  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <form className="space-y-5" noValidate method="post" action="#" onSubmit={onSubmit}>
      {emptyMessage ? (
        <p className="rounded-lg border border-dashed border-border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
          Tell us who you are and what you need help with.
        </p>
      ) : null}
      {hasErrors ? (
        <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          Fix the highlighted fields before sending.
        </p>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            value={fields.name}
            aria-invalid={!!errors.name}
            onChange={(event) => update("name", event.target.value)}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={fields.email}
            aria-invalid={!!errors.email}
            onChange={(event) => update("email", event.target.value)}
          />
        </Field>
      </div>
      <Field id="organization" label="Organization (optional)">
        <Input
          id="organization"
          name="organization"
          autoComplete="organization"
          value={fields.organization}
          onChange={(event) => update("organization", event.target.value)}
        />
      </Field>
      <Field id="topic" label="Topic" error={errors.topic}>
        <select
          id="topic"
          name="topic"
          aria-invalid={!!errors.topic}
          className={selectClass}
          value={fields.topic}
          onChange={(event) => update("topic", event.target.value)}
        >
          <option value="">Choose a topic</option>
          {supportTopics.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </Field>
      <Field id="message" label="How can we help?" error={errors.message}>
        <Textarea
          id="message"
          name="message"
          rows={7}
          value={fields.message}
          aria-invalid={!!errors.message}
          placeholder="Distro, hardware, and what you expected to happen. For a purchase, include your Square receipt."
          onChange={(event) => update("message", event.target.value)}
        />
      </Field>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
          Send message
        </button>
        <p className="text-xs text-muted-foreground">
          Nothing is stored on this site. You will copy or email the message next.
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
