import type { FC } from "react";

import { Mail, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";

import { FeatureCard, LandingSection } from "@/components/landing";
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
        columns={4}
        renderItem={channel => (
          <FeatureCard
            key={channel.key}
            icon={channel.icon}
            title={t(`${channel.key}.title`)}
            description={t(`${channel.key}.description`)}
          >
            <a
              href={t(`${channel.key}.link`)}
              className="text-primary font-semibold"
            >
              {t(`${channel.key}.linkText`)}
            </a>
          </FeatureCard>
        )}
      />
    </LandingSection>
  );
};
