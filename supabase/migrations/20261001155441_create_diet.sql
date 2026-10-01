CREATE TABLE IF NOT EXISTS public.diet_norms (
                                                 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    animal_id UUID REFERENCES public.animals(id) ON DELETE CASCADE,
    inventory_item_id UUID REFERENCES public.inventory_items(id) ON DELETE CASCADE,
    daily_norm_quantity NUMERIC(8, 3) NOT NULL CHECK (daily_norm_quantity > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(animal_id, inventory_item_id)
    );

CREATE INDEX idx_diet_norms_animal ON public.diet_norms(animal_id);
CREATE INDEX idx_diet_norms_item ON public.diet_norms(inventory_item_id);

ALTER TABLE public.diet_norms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read diet_norms" ON public.diet_norms FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow manage diet_norms" ON public.diet_norms FOR ALL TO authenticated USING (true) WITH CHECK (true);