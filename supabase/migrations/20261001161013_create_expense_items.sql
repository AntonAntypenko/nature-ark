CREATE TABLE IF NOT EXISTS public.expense_items (
                                                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    expense_id UUID NOT NULL REFERENCES public.expenses(id) ON DELETE CASCADE,
    inventory_item_id UUID REFERENCES public.inventory_items(id) ON DELETE SET NULL,
    animal_id UUID REFERENCES public.animals(id) ON DELETE SET NULL,
    enclosure_id UUID REFERENCES public.enclosures(id) ON DELETE SET NULL,
    raw_item_name VARCHAR(200) NOT NULL,
    quantity NUMERIC(10, 3) NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
    total_price NUMERIC(10, 2) NOT NULL CHECK (total_price >= 0),
    category expense_category NOT NULL DEFAULT 'feed',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
    );

CREATE INDEX idx_expense_items_expense_id ON public.expense_items(expense_id);
CREATE INDEX idx_expense_items_inventory_id ON public.expense_items(inventory_item_id);

ALTER TABLE public.expense_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read expense_items" ON public.expense_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow manage expense_items" ON public.expense_items FOR ALL TO authenticated USING (true) WITH CHECK (true);