"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";

export default function Home() {
  return (
    <div className="bg-background text-primary flex min-h-screen w-full flex-col items-center">
      <section className="w-full px-6 py-24">
        <div className="mx-auto max-w-6xl space-y-6 text-center">
          <h1 className="text-4xl leading-tight font-bold md:text-6xl">
            NatureArk — система обліку та
            <br />
            управління витратами для зоопарків
          </h1>

          <p className="text-muted-foreground mx-auto max-w-xl text-lg">
            NatureArk допомагає автоматизувати процес обліку, керування
            бюджетом, створенням документів та звітів для тварин. Простий
            інтерфейс, прозорість витрат та повний контроль.
          </p>

          <div className="mx-auto space-x-6">
            <a href="/dashboard">
              <Button size="lg" className="cursor-pointer">
                Розпочати
              </Button>
            </a>
            <a href="https://github.com/AntonAntypenko/nature-ark">
              <Button size="lg" variant="outline" className="cursor-pointer">
                Відкрити GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-muted w-full px-6 py-24">
        <div className="mx-auto max-w-5xl space-y-12">
          <h2 className="text-center text-4xl font-bold">Чому NatureArk?</h2>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-2xl font-semibold">Проблеми</h3>
              <ul className="text-muted-foreground ml-6 list-disc space-y-3">
                <li>Неточний або ручний облік витрат.</li>
                <li>Труднощі у веденні карток тварин.</li>
                <li>Повільна підготовка звітів та документів.</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-2xl font-semibold">Рішення</h3>
              <ul className="text-muted-foreground ml-6 list-disc space-y-3">
                <li>Автоматизований облік та контроль бюджету.</li>
                <li>Зручні профілі для кожної тварини.</li>
                <li>Швидка генерація документів та звітів.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-24">
        <div className="mx-auto max-w-6xl space-y-12 px-6">
          <h2 className="text-center text-4xl font-bold">
            Можливості платформи
          </h2>

          <div className="grid gap-12 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Облік витрат</CardTitle>
                <CardDescription className="text-muted-foreground mt-3 text-lg">
                  Створюйте та організовуйте природні зони, додавайте
                  характеристики, опис та дані.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Профілі тварин</CardTitle>
                <CardDescription className="text-muted-foreground mt-3 text-lg">
                  Повна інформація, фото, витрати, здоров'я — все в одному
                  місці.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Генерація звітів</CardTitle>
                <CardDescription className="text-muted-foreground mt-3 text-lg">
                  Автоматична підготовка pdf/Excel документів для звітності.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">AI-документи</CardTitle>
                <CardDescription className="text-muted-foreground mt-3 text-lg">
                  Створення пояснень, листів та описів за допомогою AI.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Ролі та доступи</CardTitle>
                <CardDescription className="text-muted-foreground mt-3 text-lg">
                  Налаштування дозволів для співробітників.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Імпорт / Експорт</CardTitle>
                <CardDescription className="text-muted-foreground mt-3 text-lg">
                  Швидке перенесення даних або інтеграція з іншими системами.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-muted w-full px-6 py-24">
        <div className="mx-auto max-w-5xl space-y-12">
          <h2 className="text-center text-4xl font-bold">
            Відповіді на питання
          </h2>

          <Accordion
            type="single"
            collapsible
            className="mx-auto w-full max-w-4xl"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-primary text-2xl font-semibold">
                Чи можна використовувати NatureArk безкоштовно?
              </AccordionTrigger>
              <AccordionContent className="text-lg text-balance">
                <p>
                  Так, проєкт відкритий. Ви можете запускати його локально або
                  на своєму сервері.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-primary text-2xl font-semibold">
                Чи є інтеграція з іншими системами?
              </AccordionTrigger>
              <AccordionContent className="text-lg text-balance">
                <p>
                  Так, можна експортувати дані та використовувати API Supabase.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-primary text-2xl font-semibold">
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

      <footer className="text-muted-foreground w-full py-12 text-center">
        <p>© 2025 NatureArk. Усі права захищено.</p>
        <p className="mt-3 text-sm">GitHub · Контакти · Мова</p>
      </footer>
    </div>
  );
}
