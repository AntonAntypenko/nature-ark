import { FC, ReactNode } from "react";

import { useTranslations } from "next-intl";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import { LandingSection } from "@/components/landing";

type FAQItemProps = {
  value: string;
  title: string;
  content: string | ReactNode;
};

const FAQItem: FC<FAQItemProps> = ({ value, title, content }) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="text-primary cursor-pointer text-xl font-semibold lg:text-2xl">
        {title}
      </AccordionTrigger>

      <AccordionContent className="text-lg text-balance">
        {typeof content === "string" ? <p>{content}</p> : content}
      </AccordionContent>
    </AccordionItem>
  );
};

export const FAQSection: FC = () => {
  const t = useTranslations("landingSections.faq");

  const FAQ_DATA: FAQItemProps[] = [
    {
      value: "item1",
      title: t("item1.title"),
      content: t("item1.content"),
    },
    {
      value: "item2",
      title: t("item2.title"),
      content: t("item2.content"),
    },
    {
      value: "item3",
      title: t("item3.title"),
      content: t("item3.content"),
    },
    {
      value: "item4",
      title: t("item4.title"),
      content: t("item4.content"),
    },
  ];

  return (
    <LandingSection id="faq" title={t("title")}>
      <div className="grid max-w-5xl grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="hidden h-full lg:block">
          <img
            src="/panda.jpg "
            alt={t("alt")}
            className="h-full w-full rounded-xl object-cover shadow-lg"
            loading="lazy"
          />
        </div>

        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full max-w-4xl"
          defaultValue="item-1"
        >
          {FAQ_DATA.map(item => (
            <FAQItem
              key={item.value}
              value={item.value}
              title={item.title}
              content={item.content}
            />
          ))}
        </Accordion>
      </div>
    </LandingSection>
  );
};
