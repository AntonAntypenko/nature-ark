import { FC } from "react";

import { Mail, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";

import { LandingSection } from "@/components/landing";
import { SmartGrid } from "@/components/blocks";

const CONTACT_CHANNELS = [
  { icon: Mail, key: "channels.email" },
  { key: "channels.gitHub" },
  { key: "channels.linkedIn" },
  { icon: MessageSquare, key: "channels.telegram" },
];

export const ContactUsSection: FC = () => {
  const t = useTranslations("landingSections.contactUs");

  return (
    <LandingSection id="contact" title={t("title")} subtitle={t("subtitle")}>
      <SmartGrid
        items={CONTACT_CHANNELS}
        t={t}
        columns={4}
        content={channel => (
          <a
            href={t(`${channel.key}.link`)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold transition-colors hover:underline"
          >
            {t(`${channel.key}.linkText`)}
          </a>
        )}
      />
    </LandingSection>
  );
};
