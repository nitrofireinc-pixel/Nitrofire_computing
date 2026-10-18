import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { rgb, site } from "@/lib/site";

const title = "Terms of Service";
const description =
  "Terms for RGBMatrixFX, RGBMatrixFX Pro, and the Nitrofire Computing website. Nitrofire Computing is the seller. Square processes card payments.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/terms` },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Policies"
      title="Terms of Service"
      lede="These terms cover the software and website published by Nitrofire Computing."
    >
      <section className="space-y-3">
        <h2>The free app</h2>
        <p>
          RGBMatrixFX is free software for Linux. It is licensed under the GNU
          General Public License, version 3 or later, with the RGBMatrixFX
          plugin exception. That license lives in the{" "}
          <a href={rgb.source}>source repository</a> and on the{" "}
          <a href={rgb.license}>GNU site</a>. These terms do not replace it.
        </p>
        <p>
          The app works with Razer and other compatible keyboards and mice via
          the OpenRazer driver. RGBMatrixFX is an independent Nitrofire
          Computing project. It is not affiliated with, working for, endorsed,
          sponsored, or authorized by Razer Inc. Razer is a trademark of Razer
          Inc.
        </p>
      </section>
      <section className="space-y-3">
        <h2>RGBMatrixFX Pro</h2>
        <p>
          RGBMatrixFX Pro is an optional add-on. A purchase is a one-time
          payment of {rgb.priceLabel} for the Pro features described on the{" "}
          <Link href="/pricing">pricing page</Link>: holiday and premium
          effects, and whole-PC RGB sync for motherboard, RAM and fans.
        </p>
        <p>
          Pro is for the person or organization that buys it. You may use it on
          computers you own or control. You may not resell the add-on or
          present a paid copy as the free app.
        </p>
        <p>
          After payment, we use the email on the Square order to provide Pro.
          If it does not arrive, email us with your Square receipt.
        </p>
      </section>
      <section className="space-y-3">
        <h2>Payments</h2>
        <p>
          Nitrofire Computing is the seller of RGBMatrixFX Pro. Square
          processes the payment and handles card data. We do not store your
          card number. We receive the order details Square shares with us, such
          as your name, email, the item purchased, the amount, and a
          transaction reference.
        </p>
        <p>
          The price you pay is the price shown at checkout. Refunds are
          described in the <Link href="/refunds">Refund Policy</Link>.
        </p>
      </section>
      <section className="space-y-3">
        <h2>Support</h2>
        <p>
          Questions about the software, a purchase, or a refund go to{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> or the{" "}
          <Link href="/support">support page</Link>.
        </p>
      </section>
      <section className="space-y-3">
        <h2>The website</h2>
        <p>
          This site describes our software. Download links for the free app go
          to GitHub. We may update the software, the price of a future
          purchase, or these terms. A purchase already made stays on the price
          and the refund terms in effect at checkout.
        </p>
      </section>
      <section className="space-y-3">
        <h2>Warranty and liability</h2>
        <p>
          The software is provided as available. Device support depends on
          drivers, hardware, and your Linux setup. To the extent the law
          allows, we are not liable for lost data, lost lighting settings, or
          other damages from using the software. The GPL license for the free
          app has its own warranty disclaimer, and that disclaimer still
          applies to the free app.
        </p>
        <p>
          Some places do not allow certain limits on warranties or liability.
          In those places, the limits here apply only as far as the law allows.
          Consumer rights that cannot be waived still apply.
        </p>
      </section>
      <section className="space-y-3">
        <h2>Contact</h2>
        <p>
          Nitrofire Computing
          <br />
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <br />
          <a href={site.url}>{site.url.replace("https://", "")}</a>
        </p>
      </section>
    </LegalPage>
  );
}
