CREATE TYPE expense_status AS ENUM ('draft', 'ai_parsed', 'verified', 'stocked');
CREATE TYPE expense_category AS ENUM ('feed', 'veterinary', 'utilities', 'logistics', 'maintenance');

CREATE TABLE IF NOT EXISTS public.expenses (
                                               id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number VARCHAR(100),
    vendor VARCHAR(150) NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
    category expense_category NOT NULL DEFAULT 'feed',
    spent_at DATE NOT NULL DEFAULT CURRENT_DATE,
    status expense_status NOT NULL DEFAULT 'draft',
    receipt_url TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
    );

CREATE INDEX idx_expenses_spent_at ON public.expenses(spent_at);
CREATE INDEX idx_expenses_category ON public.expenses(category);
CREATE INDEX idx_expenses_status ON public.expenses(status);

ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read expenses" ON public.expenses FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow manage expenses" ON public.expenses FOR ALL TO authenticated USING (true) WITH CHECK (true);