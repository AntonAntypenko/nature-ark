import { FC, ReactNode } from "react";
import Image from "next/image";

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

type Data = {
  value: string;
  key: string;
};

const FAQ_DATA: Data[] = [
  {
    value: "item1",
    key: "item1",
  },
  {
    value: "item2",
    key: "item2",
  },
  {
    value: "item3",
    key: "item3",
  },
  {
    value: "item4",
    key: "item4",
  },
];

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

  return (
    <LandingSection id="faq" title={t("title")}>
      <div className="grid max-w-5xl grid-cols-1 items-start gap-12 lg:min-h-[400px] lg:grid-cols-2 lg:gap-16">
        <div className="hidden h-full lg:relative lg:block">
          <Image
            src="/panda.jpg"
            alt={t("alt")}
            className="rounded-xl object-cover shadow-lg"
            loading="lazy"
            fill={true}
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
              title={t(`${item.key}.title`)}
              content={t(`${item.key}.content`)}
            />
          ))}
        </Accordion>
      </div>
    </LandingSection>
  );
};
