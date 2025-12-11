import { FC } from "react";

import { Mail, MessageSquare } from "lucide-react";

import { FeatureCard } from "@/components/landing";

const CONTACT_CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    description:
      "Напишіть нам напряму, якщо маєте пропозиції щодо функціоналу.",
    link: "mailto:your.email@example.com", // TODO: Замінити на реальний email
    linkText: "email@example.com",
  },
  {
    label: "GitHub",
    description: "Повідомте про баги або запропонуйте нову фічу через Issues.",
    link: "https://github.com/AntonAntypenko/nature-ark/issues",
    linkText: "Створити Issue",
  },
  {
    label: "LinkedIn",
    description: "Зв'яжіться з автором проєкту з професійних питань.",
    link: "https://www.linkedin.com/in/yourprofile/", // TODO: Замінити на реальний LinkedIn
    linkText: "Профіль автора",
  },
  {
    icon: MessageSquare,
    label: "Телеграм",
    description: "Найшвидший спосіб отримати відповідь на невеликі запитання.",
    link: "https://t.me/your_telegram_username", // TODO: Замінити на реальний Telegram
    linkText: "Написати в Telegram",
  },
];

export const ContactUsSection: FC = () => {
  return (
    <section id="contact" className="bg-muted w-full px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <h2 className="mb-3 text-4xl font-bold">
            Маєте запитання або пропозиції?
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Ми відкриті до зворотного зв'язку, пропозицій щодо покращення та
            співпраці.
          </p>
        </div>

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
      </div>
    </section>
  );
};
