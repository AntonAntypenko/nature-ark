import { FC } from "react";

import { LucideIcon, Mail, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";

import { FeatureCard, LandingSection } from "@/components/landing";

type Channel = {
  icon?: LucideIcon;
  key: string;
};

const CONTACT_CHANNELS: Channel[] = [
  {
    icon: Mail,
    key: "channels.email",
  },
  {
    key: "channels.gitHub",
  },
  {
    key: "channels.linkedIn",
  },
  {
    key: "channels.telegram",
    icon: MessageSquare,
  },
];

export const ContactUsSection: FC = () => {
  const t = useTranslations("landingSections.contactUs");

  return (
    <LandingSection id="contact" title={t("title")} subtitle={t("subtitle")}>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {CONTACT_CHANNELS.map(channel => (
          <FeatureCard
            key={t(`${channel.key}.label`)}
            icon={channel.icon}
            title={t(`${channel.key}.label`)}
            description={t(`${channel.key}.description`)}
          >
            <a
              href={t(`${channel.key}.link`)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold transition-colors hover:underline"
            >
              {t(`${channel.key}.linkText`)}
            </a>
          </FeatureCard>
        ))}
      </div>
    </LandingSection>
  );
};
