import { FC } from "react";

import { Mail, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";

import { FeatureCard, LandingSection } from "@/components/landing";

export const ContactUsSection: FC = () => {
  const t = useTranslations("landingSections.contactUs");

  const CONTACT_CHANNELS = [
    {
      icon: Mail,
      label: t("channels.email.label"),
      description: t("channels.email.description"),
      link: "mailto:your.email@example.com",
      linkText: t("channels.email.linkText"),
    },
    {
      label: t("channels.gitHub.label"),
      description: t("channels.gitHub.description"),
      link: "https://github.com/AntonAntypenko/nature-ark/issues",
      linkText: t("channels.gitHub.linkText"),
    },
    {
      label: t("channels.linkedIn.label"),
      description: t("channels.linkedIn.description"),
      link: "https://www.linkedin.com/in/yourprofile/",
      linkText: t("channels.linkedIn.linkText"),
    },
    {
      icon: MessageSquare,
      label: t("channels.telegram.label"),
      description: t("channels.telegram.description"),
      link: "https://t.me/your_telegram_username",
      linkText: t("channels.telegram.linkText"),
    },
  ];

  return (
    <LandingSection id="contact" title={t("title")} subtitle={t("subtitle")}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {CONTACT_CHANNELS.map(channel => (
          <FeatureCard
            key={channel.label}
            icon={channel.icon}
            title={channel.label}
            description={channel.description}
          >
            <a
              href={channel.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold transition-colors hover:underline"
            >
              {channel.linkText}
            </a>
          </FeatureCard>
        ))}
      </div>
    </LandingSection>
  );
};
