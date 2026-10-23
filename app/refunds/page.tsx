import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { rgb, site } from "@/lib/site";

const title = "Refund Policy";
const description = `Refunds for RGBMatrixFX Pro, a one-time ${rgb.priceLabel} purchase from Nitrofire Computing. Payments are processed by Square.`;

export const metadata: Metadata = pageMeta("/refunds", title, description);

export default function RefundsPage() {
  return (
    <LegalPage
      eyebrow="Policies"
      title="Refund Policy"
      lede="RGBMatrixFX is free. RGBMatrixFX Pro is a one-time purchase, and this is how refunds work."
    >
      <section className="space-y-3">
        <h2>The free app</h2>
        <p>
          RGBMatrixFX costs nothing to download and use. There is no payment
          and nothing to refund.
        </p>
      </section>
      <section className="space-y-3">
        <h2>RGBMatrixFX Pro</h2>
        <p>
          RGBMatrixFX Pro is {rgb.priceLabel}, paid once. Nitrofire Computing is
          the seller. Square processes the card payment. We do not store your
          card number.
        </p>
        <p>
          If Pro does not work for you, email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> within 30 days of
          the purchase. Include the email address used at checkout and your
          Square receipt or order number. We will refund the purchase through
          Square to the original payment method.
        </p>
        <p>
          After 30 days, write to the same address if Pro is unusable on your
          system and support cannot get it running. We will look at that
          request and reply.
        </p>
      </section>
      <section className="space-y-3">
        <h2>How a refund is paid</h2>
        <p>
          Approved refunds go back through Square to the card or payment method
          used at checkout. Square moves the money. Timing after that depends
          on the card issuer.
        </p>
      </section>
      <section className="space-y-3">
        <h2>Contact</h2>
        <p>
          Refund questions: <a href={`mailto:${site.email}`}>{site.email}</a>.
          You can also use the <Link href="/support">support page</Link>. The{" "}
          <Link href="/pricing">pricing page</Link> lists what Pro includes.
        </p>
      </section>
    </LegalPage>
  );
}
