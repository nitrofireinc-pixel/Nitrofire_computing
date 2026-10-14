import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="space-y-4">
        <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">
          Contact
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Send a brief.
        </h1>
        <p className="max-w-md text-base leading-7 text-muted-foreground">
          Tell us who it is for, what has to exist, and when it has to be
          clickable. We reply from{" "}
          <a href={`mailto:${site.email}`} className="text-brand-blue hover:underline">
            {site.email}
          </a>
          . This form does not store messages on the server. After you send the
          brief, you can copy it or open your mail client.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
