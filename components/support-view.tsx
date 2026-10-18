import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export function SupportView() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="space-y-4">
        <p className="font-mono text-xs tracking-[0.22em] text-primary uppercase">
          Support
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Contact Nitrofire Computing.
        </h1>
        <p className="max-w-md text-base leading-7 text-muted-foreground">
          Questions about RGBMatrixFX, Pro, a download, or a purchase. We reply
          from{" "}
          <a href={`mailto:${site.email}`} className="text-brand-blue hover:underline">
            {site.email}
          </a>
          .
        </p>
        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          This form does not store messages. After you send it, you can copy
          the message or open your mail client. For a refund, include the email
          used at checkout and your Square receipt.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
