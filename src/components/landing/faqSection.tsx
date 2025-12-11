import { FC } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";

export const FAQSection: FC = () => {
  return (
    <section id="faq" className="bg-muted w-full px-6 py-24">
      <div className="mx-auto max-w-5xl space-y-12">
        <h2 className="text-center text-4xl font-bold">Відповіді на питання</h2>

        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full max-w-4xl"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-primary cursor-pointer text-2xl font-semibold">
              Чи можна використовувати NatureArk безкоштовно?
            </AccordionTrigger>
            <AccordionContent className="text-lg text-balance">
              <p>
                Так, проєкт відкритий. Ви можете запускати його локально або на
                своєму сервері.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-primary cursor-pointer text-2xl font-semibold">
              Чи є інтеграція з іншими системами?
            </AccordionTrigger>
            <AccordionContent className="text-lg text-balance">
              <p>
                Так, можна експортувати дані та використовувати API Supabase.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-primary cursor-pointer text-2xl font-semibold">
              Чи безпечно зберігати дані?
            </AccordionTrigger>
            <AccordionContent className="text-lg text-balance">
              <p>
                Так, дані зберігаються з використанням Supabase та ролей
                доступу.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};
