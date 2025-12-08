"use client";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start text-gray-900">
      {/* HERO SECTION (Головний екран з цінністю продукту) */}
      <section className="w-full max-w-5xl px-6 py-24 text-center">
        <h1 className="mb-6 text-5xl font-bold">
          NatureArk — система обліку та управління витратами для зоопарків
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          (Hero description) NatureArk допомагає автоматизувати процес обліку,
          керування бюджетом, створенням документів та звітів для тварин.
          Простий інтерфейс, прозорість витрат та повний контроль.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button className="rounded-lg bg-black px-6 py-3 text-lg font-semibold text-white">
            (CTA primary) Спробувати демо
          </button>
          <button className="rounded-lg border border-gray-300 px-6 py-3 text-lg font-medium">
            (CTA secondary) Відкрити GitHub
          </button>
        </div>
      </section>

      {/* PROBLEM → SOLUTION SECTION (Опис проблем та як NatureArk їх вирішує) */}
      <section className="w-full max-w-5xl px-6 py-20">
        <h2 className="mb-8 text-center text-3xl font-bold">
          (Problem → Solution) Чому NatureArk?
        </h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-2xl font-semibold">Проблеми</h3>
            <ul className="ml-6 list-disc space-y-3 text-gray-700">
              <li>Неточний або ручний облік витрат.</li>
              <li>Труднощі у веденні карток тварин.</li>
              <li>Повільна підготовка звітів та документів.</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-2xl font-semibold">Рішення</h3>
            <ul className="ml-6 list-disc space-y-3 text-gray-700">
              <li>Автоматизований облік та контроль бюджету.</li>
              <li>Зручні профілі для кожної тварини.</li>
              <li>Швидка генерація документів та звітів.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION (Ключові можливості системи) */}
      <section className="w-full max-w-5xl px-6 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">
          (Features) Основні можливості
        </h2>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold">Облік витрат</h3>
            <p className="text-gray-700">
              Зручне додавання та перегляд витрат, категоризація та аналітика.
            </p>
          </div>

          <div className="rounded-xl border p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold">Профілі тварин</h3>
            <p className="text-gray-700">
              Повна інформація, фото, витрати, здоров'я — все в одному місці.
            </p>
          </div>

          <div className="rounded-xl border p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold">Генерація звітів</h3>
            <p className="text-gray-700">
              Автоматична підготовка pdf/Excel документів для звітності.
            </p>
          </div>

          <div className="rounded-xl border p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold">AI-документи</h3>
            <p className="text-gray-700">
              Створення пояснень, листів та описів за допомогою AI.
            </p>
          </div>

          <div className="rounded-xl border p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold">Ролі та доступи</h3>
            <p className="text-gray-700">
              Налаштування дозволів для співробітників.
            </p>
          </div>

          <div className="rounded-xl border p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold">Імпорт / Експорт</h3>
            <p className="text-gray-700">
              Швидке перенесення даних або інтеграція з іншими системами.
            </p>
          </div>
        </div>
      </section>

      {/* SCREENSHOTS / DEMO SECTION (Макети інтерфейсу / превʼю) */}
      <section className="w-full max-w-5xl px-6 py-20 text-center">
        <h2 className="mb-8 text-3xl font-bold">
          (Demo / Screenshots) Як виглядає NatureArk?
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-gray-700">
          Тут можна побачити основні екрани системи: дашборд, профіль тварини та
          облік витрат.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="h-64 w-full rounded-lg bg-gray-200" />
          <div className="h-64 w-full rounded-lg bg-gray-200" />
          <div className="h-64 w-full rounded-lg bg-gray-200" />
        </div>

        <p className="mt-4 text-sm text-gray-500">
          (Placeholder images для макетів)
        </p>
      </section>

      {/* STEPS SECTION (Як працює система) */}
      <section className="w-full max-w-5xl px-6 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">
          (How it works) Як працює NatureArk?
        </h2>

        <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-2xl font-semibold">1. Додайте тварину</h3>
            <p className="text-gray-700">
              Створіть профіль, додайте фото, опис, стан здоров'я та базові
              дані.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-2xl font-semibold">2. Ведіть витрати</h3>
            <p className="text-gray-700">
              Додавайте всі важливі витрати — корм, ліки, інвентар, транспорт
              тощо.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-2xl font-semibold">3. Генеруйте звіти</h3>
            <p className="text-gray-700">
              Отримуйте готові документи у два кліки — для керівництва або
              бухгалтерії.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION (Питання та відповіді) */}
      <section className="w-full max-w-5xl px-6 py-20">
        <h2 className="mb-10 text-center text-3xl font-bold">
          (FAQ) Часті питання
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold">
              Чи можна використовувати NatureArk безкоштовно?
            </h3>
            <p className="text-gray-700">
              Так, проєкт відкритий. Ви можете запускати його локально або на
              своєму сервері.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Чи є інтеграція з іншими системами?
            </h3>
            <p className="text-gray-700">
              Так, можна експортувати дані та використовувати API Supabase.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Чи безпечно зберігати дані?
            </h3>
            <p className="text-gray-700">
              Так, дані зберігаються з використанням Supabase та ролей доступу.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER (Підвал сайту) */}
      <footer className="w-full border-t py-10 text-center text-gray-500">
        <p>© 2025 NatureArk. Усі права захищені.</p>
        <p className="mt-2 text-sm">(Footer) GitHub · Контакти · Мова</p>
      </footer>
    </main>
  );
}
