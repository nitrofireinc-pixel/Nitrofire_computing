import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

const title = "Privacy Policy";
const description =
  "How Nitrofire Computing handles support email and RGBMatrixFX Pro purchases. Square processes card payments. We do not store card numbers.";

export const metadata: Metadata = pageMeta("/privacy", title, description);

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Policies"
      title="Privacy Policy"
      lede="This policy says what Nitrofire Computing collects on this website and when you buy RGBMatrixFX Pro."
    >
      <section className="space-y-3">
        <h2>This website</h2>
        <p>
          The pages are static. They do not ask you to create an account. The
          site does not run advertising or analytics trackers.
        </p>
        <p>
          The <Link href="/support">support form</Link> runs in your browser. It
          does not send the message to a server we operate. If you copy the
          message or open your email app, that app handles it from there. If
          you email <a href={`mailto:${site.email}`}>{site.email}</a>, we
          receive the address you send from and whatever you include in the
          message. We use that to reply and to keep a record of the
          conversation.
        </p>
      </section>
      <section className="space-y-3">
        <h2>Purchases</h2>
        <p>
          RGBMatrixFX Pro is sold by Nitrofire Computing. You pay on Square.
          Square processes the payment and handles your card data. We do not
          receive or store your card number.
        </p>
        <p>
          We receive order details from Square, such as your name, email
          address, the product purchased, the amount, and a transaction
          reference. We use that to provide Pro, handle refunds, and answer
          purchase questions. Square&apos;s own privacy policy covers what
          Square collects on its checkout page.
        </p>
      </section>
      <section className="space-y-3">
        <h2>Downloads</h2>
        <p>
          The free app is downloaded from GitHub. A visit to GitHub is covered
          by GitHub&apos;s privacy policy. RGBMatrixFX itself is desktop
          software and is separate from this website.
        </p>
      </section>
      <section className="space-y-3">
        <h2>What we do with personal information</h2>
        <p>
          We use contact and order details to provide the software, reply to
          you, issue refunds, and keep records we need for accounting. We do
          not sell personal information.
        </p>
      </section>
      <section className="space-y-3">
        <h2>How long we keep it</h2>
        <p>
          We keep support emails and purchase records for as long as we need
          them to support the software, meet accounting duties, and handle a
          dispute. You can ask us to delete a support conversation by emailing{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>. We may keep a
          purchase record where we need it for accounting or to show that a
          refund was paid.
        </p>
      </section>
      <section className="space-y-3">
        <h2>Contact</h2>
        <p>
          Privacy questions: <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
