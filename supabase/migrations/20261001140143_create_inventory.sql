CREATE TYPE inventory_category AS ENUM ('feed', 'veterinary', 'utilities', 'logistics', 'maintenance');
CREATE TYPE inventory_unit AS ENUM ('kg', 'liter', 'dose', 'piece', 'kwh');

CREATE TABLE IF NOT EXISTS public.inventory_items (
                                                      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL UNIQUE,
    category inventory_category NOT NULL DEFAULT 'feed',
    unit inventory_unit NOT NULL DEFAULT 'kg',
    target_stock NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    current_stock NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
    );

CREATE INDEX idx_inventory_category ON public.inventory_items(category);

ALTER TABLE public.inventory_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read inventory" ON public.inventory_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow manage inventory" ON public.inventory_items FOR ALL TO authenticated USING (true) WITH CHECK (true);