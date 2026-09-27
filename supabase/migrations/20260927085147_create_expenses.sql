-- 1. Create ENUM for expense categories
CREATE TYPE expense_category AS ENUM (
    'feed',         -- Корми та спеціальне харчування
    'veterinary',   -- Медикаменти, вакцини, огляди
    'utilities',    -- Обігрів, освітлення, водопостачання вольєрів
    'logistics',    -- Доставка, транспортування
    'maintenance'   -- Ремонт обладнання та вольєрів
);

-- 2. Create the 'expenses' table
CREATE TABLE IF NOT EXISTS public.expenses (
                                               id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),

    -- Financial attributes
    title VARCHAR(150) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
    category expense_category NOT NULL,
    spent_at DATE NOT NULL DEFAULT CURRENT_DATE,

    -- Relations and origin
    animal_id UUID REFERENCES public.animals(id) ON DELETE SET NULL, -- Nullable if general expense
    vendor VARCHAR(150),
    receipt_url TEXT, -- Link to uploaded scan/photo for future AI OCR

-- Metadata
    notes TEXT
    );

-- 3. Indexes for query performance
CREATE INDEX IF NOT EXISTS idx_expenses_spent_at ON public.expenses(spent_at);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON public.expenses(category);
CREATE INDEX IF NOT EXISTS idx_expenses_animal_id ON public.expenses(animal_id);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read expenses"
ON public.expenses
FOR SELECT
               TO authenticated
               USING (true);

CREATE POLICY "Authenticated users can manage expenses"
ON public.expenses
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. Seed initial mock expense records linked to our test animals
INSERT INTO public.expenses (title, amount, category, spent_at, vendor, notes)
VALUES
    ('Свіжа яловичина (партія 100 кг)', 18500.00, 'feed', CURRENT_DATE - INTERVAL '2 days', 'М''ясокомбінат №1', 'Для сектора хижаків'),
    ('Морська риба шокової заморозки', 6400.00, 'feed', CURRENT_DATE - INTERVAL '1 day', 'Ocean Supply Ltd', 'Для пінгвінів та ведмідя'),
    ('Сезонна оплата електроенергії (підігрів басейну)', 12300.00, 'utilities', CURRENT_DATE - INTERVAL '5 days', 'Міськенерго', 'Сектор водно-болотних тварин'),
    ('Планова вакцинація та вітамінний комплекс', 4200.00, 'veterinary', CURRENT_DATE - INTERVAL '7 days', 'VetPharma', 'Профілактичні заходи');