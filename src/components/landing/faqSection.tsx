import { FC, ReactNode } from "react";

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

export const FAQ_DATA: FAQItemProps[] = [
  {
    value: "item-1",
    title: "Чи можна використовувати NatureArk безкоштовно?",
    content:
      "Так, проєкт відкритий. Ви можете запускати його локально або на своєму сервері.",
  },
  {
    value: "item-2",
    title: "Чи є інтеграція з іншими системами?",
    content: "Так, можна експортувати дані та використовувати API Supabase.",
  },
  {
    value: "item-3",
    title: "Чи безпечно зберігати дані?",
    content:
      "Так, дані зберігаються з використанням Supabase та ролей доступу.",
  },
  {
    value: "item-4",
    title: "Які мінімальні технічні вимоги?",
    content:
      "Для локального запуску вам знадобиться Node.js та Docker. Усі інструкції є на GitHub.",
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
  return (
    <LandingSection id="faq" title="Відповіді на питання">
      <div className="grid max-w-5xl grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="hidden h-full lg:block">
          <img
            src="/panda.jpg "
            alt="Ілюстрація питання та відповіді"
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
